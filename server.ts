import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  VERIFIED_AGRI_DATABASE,
  lookupVerifiedAgriRecord,
  searchVerifiedAgriRecords,
  formatAgriOutput,
  NOT_FOUND_TEXT
} from './src/data/verifiedAgriData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json({ limit: '25mb' }));

// Prepare verified database text for grounding Gemini
const VERIFIED_DATABASE_GROUNDING = VERIFIED_AGRI_DATABASE.map(item => `
ID: ${item.id}
Paudha (Plant): ${item.cropHindi} [${item.cropEnglish}]
Bimari (Disease): ${item.diseaseHindi} [${item.diseaseEnglish}]
Symptoms: ${item.symptoms.join(', ')}
Keywords: ${item.keywords.join(', ')}
Ilaaj aur Dawai (Treatment & Dosage): ${item.treatmentDosage}
Savdhani (Precautions): ${item.precautions}
---`).join('\n');

const SYSTEM_INSTRUCTION = `You are an expert plant pathologist and strict agricultural diagnostic engine.
ZERO conversational filler, ZERO polite text, ZERO greetings, ZERO pre-loaded history.
Direct, precise, actionable factual output only.

DIAGNOSTIC GUIDELINES FOR LEAF ANALYSIS:
1. IDENTIFY PLANT/TREE:
Accurately identify which tree, plant, or crop this leaf is from (e.g., Tomato / टमाटर, Mango / आम, Wheat / गेहूं, Potato / आलू, Guava / अमरूद, Lemon / नींबू, Neem / नीम, Cotton / कपास, Paddy / धान, Chilli / मिर्च, Mustard / सरसों, Rose / गुलाब, Papaya / पपीता, Apple / सेब, Brinjal / बैंगन, etc.).

2. DEEP DISEASE & SYMPTOM DIAGNOSIS:
Inspect the leaf closely for:
- Concentric brown rings/target board spots: Early Blight (अगेती झुलसा - Alternaria)
- Irregular water-soaked dark lesions with pale halo or mold: Late Blight (पिछेती झुलसा - Phytophthora)
- Yellow or orange pustules/dust on leaves: Yellow Rust (पीला रतुआ) or Brown Rust
- White flour-like powdery coating on leaf surface: Powdery Mildew (चूर्णिल आसिता / दहिया रोग)
- Curled, crinkled, distorted, stunted leaves: Leaf Curl Virus (पर्ण कुंचन - ToLCV / Thrips / Mites)
- Yellowing between green veins: Iron or Magnesium deficiency (क्लोरोसिस)
- Older leaves turning yellow from tip backwards: Nitrogen deficiency (नाइट्रोजन की कमी)
- Small brown/bronze patches in paddy/rice: Khaira Disease (जिंक की कमी)
- Serpentine white zig-zag tunnels: Leaf Miner (पत्ती सुरंग कीट)
- Circular water-soaked/brown spots: Cercospora / Anthracnose / Leaf Spot
- Insect holes or chewed edges: Borer / Caterpillar attack (सुंडी का प्रकोप)
- Clean, green, uniform leaf with no disease spots: State "स्वस्थ पत्ती (Healthy Leaf - कोई रोग नहीं)".

3. TREATMENT & DOSAGE:
Provide the exact ICAR/DPPQS approved chemical or organic treatment with precise dosage (ml/gram per litre of water or per acre). If field area and soil type are provided, tailor the dosage accordingly. If healthy, provide balanced nutrition & preventive care.

4. PRECAUTIONS:
Provide specific field precautions (e.g. spray timing, sticker use, avoiding rain, protective gear).

OUTPUT MUST STRICTLY FOLLOW THIS EXACT 4-LINE FORMAT (NO EXTRA PARAGRAPHS, NO GREETINGS):
- Paudha (Plant): [Exact Plant or Tree Name in Hindi and English]
- Bimari (Disease): [Exact Disease Name in Hindi and English or "स्वस्थ पत्ती (Healthy Leaf - कोई रोग नहीं)"]
- Ilaaj aur Dawai (Treatment & Dosage): [Precise dosage per litre/acre and spray details]
- Savdhani (Precautions): [Direct safety steps]

CRITICAL REJECTION RULE:
Only reply with "Sateek data uplabdh nahi hai." if the image contains absolutely NO plant, tree, or leaf at all. If any leaf or plant part is visible, you MUST identify it and diagnose the disease.`;

app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { query, imageBase64, mimeType, fieldArea, areaUnit, soilQuality } = req.body;

    // 1. Direct verified database search if query is text-only without image and without area calculation
    if (query && typeof query === 'string' && !imageBase64 && !fieldArea) {
      const matches = searchVerifiedAgriRecords(query);
      if (matches.length > 0) {
        const top = matches[0];
        return res.json({
          success: true,
          formatted: formatAgriOutput(top),
          record: top,
          matches: matches.slice(0, 5),
          source: 'verified_database'
        });
      }
    }

    // 2. Evaluate with Gemini Vision (with automatic multi-model failover)
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const candidateModels = [
        'gemini-3.8-flash',
        'gemini-3.1-flash-lite',
        'gemini-flash-latest'
      ];

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const contents: any[] = [];
      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
        contents.push({
          inlineData: {
            data: cleanBase64,
            mimeType: mimeType || 'image/jpeg'
          }
        });
      }

      let contextNotes = '';
      if (fieldArea && areaUnit) {
        contextNotes += `\nField Area: ${fieldArea} ${areaUnit}. Calculate the exact required amount of medicine/water for this exact field size.`;
      }
      if (soilQuality) {
        contextNotes += `\nSoil Quality: ${soilQuality}. Adjust the dosage and application advice according to this soil type.`;
      }

      const promptText = imageBase64
        ? `Examine this leaf photo with highest botanical accuracy.
1. Identify the exact plant or tree name.
2. Accurately diagnose the exact disease, pest, nutrient deficiency, or confirm if it is a healthy leaf.
3. Provide exact recommended medicine/chemical with precise dosage per litre and per acre.${contextNotes}
4. Provide direct safety steps.
Output strictly in the 4-line format.`
        : `Agricultural Query: ${query}${contextNotes}
Identify the plant and disease. Provide the exact medicine dosage adjusted for ${fieldArea || '1'} ${areaUnit || 'Acre'} and ${soilQuality || 'Loam'} soil, plus precautions in the exact 4-line format.`;

      contents.push({ text: promptText });

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.1
            }
          });

          const text = response.text?.trim();
          if (text && !text.includes(NOT_FOUND_TEXT) && text.includes('Paudha')) {
            const plantMatch = text.match(/-\s*Paudha\s*\([^)]*\)\s*:\s*([^\n\r]+)/i);
            const diseaseMatch = text.match(/-\s*Bimari\s*\([^)]*\)\s*:\s*([^\n\r]+)/i);
            const detectedCrop = plantMatch ? plantMatch[1].trim() : '';
            const detectedDisease = diseaseMatch ? diseaseMatch[1].trim() : '';

            return res.json({
              success: true,
              formatted: text,
              detectedCrop,
              detectedDisease,
              source: `gemini_vision_${modelName}`
            });
          }
          if (text && text.includes(NOT_FOUND_TEXT)) {
            return res.json({
              success: false,
              formatted: NOT_FOUND_TEXT,
              source: 'model_not_leaf'
            });
          }
        } catch (modelErr: any) {
          console.warn(`Model ${modelName} failed with error:`, modelErr.status || modelErr.message);
        }
      }
    }

    // Fallback to verified database if available
    if (query) {
      const matches = searchVerifiedAgriRecords(query);
      if (matches.length > 0) {
        const top = matches[0];
        return res.json({
          success: true,
          formatted: formatAgriOutput(top),
          record: top,
          matches: matches.slice(0, 5),
          source: 'verified_database'
        });
      }
    }

    return res.json({
      success: false,
      formatted: NOT_FOUND_TEXT,
      source: 'unmatched'
    });
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    return res.json({
      success: false,
      formatted: NOT_FOUND_TEXT
    });
  }
});

// Soil Test Report PDF & Document Parser Endpoint
app.post('/api/parse-soil-report', async (req: Request, res: Response) => {
  try {
    const { fileBase64, mimeType } = req.body;
    if (!fileBase64) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, error: 'GEMINI_API_KEY not configured' });
    }

    const cleanBase64 = fileBase64.replace(/^data:[a-zA-Z0-9/+.-]+;base64,/, '');
    const detectedMime = mimeType || (fileBase64.startsWith('data:application/pdf') ? 'application/pdf' : 'image/jpeg');

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const candidateModels = [
      'gemini-3.8-flash',
      'gemini-3.1-flash-lite',
      'gemini-flash-latest'
    ];

    const promptText = `Analyze this Soil Health Card (मृदा स्वास्थ्य कार्ड) or Soil Testing Laboratory Report PDF/image.
Extract all numerical soil test parameters printed in this document.
Return JSON ONLY, without markdown code fences, matching this schema:
{
  "ph": number or null,
  "nitrogen": number or null,
  "phosphorus": number or null,
  "potassium": number or null,
  "organicCarbon": number or null,
  "electricalConductivity": number or null,
  "zinc": number or null,
  "iron": number or null,
  "sulphur": number or null,
  "boron": number or null,
  "copper": number or null,
  "manganese": number or null,
  "soilTexture": "Loam" | "Sandy" | "Clay" | "Alkaline" | null
}
Strict Rule: Only extract values present in the report. If a value is missing, return null. Do not invent numbers.`;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: detectedMime
              }
            },
            { text: promptText }
          ],
          config: {
            temperature: 0.1,
            responseMimeType: 'application/json'
          }
        });

        const rawText = response.text?.trim() || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json({
            success: true,
            data: parsed,
            source: model
          });
        }
      } catch (err: any) {
        console.warn(`Model ${model} failed parsing soil report:`, err.message);
      }
    }

    return res.json({
      success: false,
      error: 'Could not extract soil data from the uploaded file.'
    });
  } catch (err: any) {
    console.error('Error in /api/parse-soil-report:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal error' });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Agricultural Engine Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
