import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Printer,
  ShieldCheck,
  Leaf,
  Layers,
  X,
  ArrowRight,
  FlaskConical,
  Sprout,
  Activity,
  Sparkles,
  SlidersHorizontal,
  Database,
  ChevronDown,
  ChevronUp,
  Info,
  History,
  FileText,
  Languages
} from 'lucide-react';
import {
  VERIFIED_AGRI_DATABASE,
  searchVerifiedAgriRecords,
  formatAgriOutput,
  NOT_FOUND_TEXT,
  STRICT_DATA_NOT_FOUND,
  VerifiedAgriRecord
} from './data/verifiedAgriData';
import {
  UnifiedAgriReport,
  getStoredReports,
  saveUnifiedReport
} from './utils/historyStorage';
import { UnifiedReportCard } from './components/UnifiedReportCard';
import { HistoryView } from './components/HistoryView';
import { SoilPdfUpload } from './components/SoilPdfUpload';
import { TRANSLATIONS, Language } from './utils/translations';

export default function App() {
  // Language Switcher: 'hi' (Hindi) or 'en' (English)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kisan_app_lang');
      return (saved === 'en' || saved === 'hi') ? saved : 'hi';
    } catch {
      return 'hi';
    }
  });

  const t = TRANSLATIONS[lang];

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('kisan_app_lang', newLang);
    } catch (e) {
      console.error('Failed to save language preference', e);
    }
  };

  // Navigation Tabs: 'upload' (Leaf Scan), 'dosage' (Dosage & Soil), 'lookup' (Registry), 'history' (History)
  const [activeTab, setActiveTab] = useState<'upload' | 'dosage' | 'lookup' | 'history'>('upload');

  // History & Stored Reports
  const [historyReports, setHistoryReports] = useState<UnifiedAgriReport[]>([]);
  const [latestGeneratedReport, setLatestGeneratedReport] = useState<UnifiedAgriReport | null>(null);

  // Leaf Photo State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');

  // Auto-filled info from leaf scan
  const [scannedPlant, setScannedPlant] = useState<string>('');
  const [scannedDisease, setScannedDisease] = useState<string>('');
  const [scannedDosage, setScannedDosage] = useState<string>('');
  const [scannedPrecautions, setScannedPrecautions] = useState<string>('');

  // Dosage & Soil Calculator Inputs
  const [dosageCropQuery, setDosageCropQuery] = useState('');
  const [fieldArea, setFieldArea] = useState('');
  const [areaUnit, setAreaUnit] = useState<string>('Acre');
  const [soilQuality, setSoilQuality] = useState<string>('Loam');

  // Soil Input Method: 'manual' or 'pdf'
  const [soilInputMethod, setSoilInputMethod] = useState<'manual' | 'pdf'>('manual');

  // Soil Test Materials (Manual or Extracted from PDF)
  const [soilPhValue, setSoilPhValue] = useState('');
  const [nitrogenKg, setNitrogenKg] = useState('');
  const [phosphorusKg, setPhosphorusKg] = useState('');
  const [potashKg, setPotashKg] = useState('');
  const [ocPercent, setOcPercent] = useState('');
  const [ecValue, setEcValue] = useState('');
  const [zincPpm, setZincPpm] = useState('');
  const [ironPpm, setIronPpm] = useState('');
  const [sulphurPpm, setSulphurPpm] = useState('');
  const [boronPpm, setBoronPpm] = useState('');
  const [copperPpm, setCopperPpm] = useState('');
  const [manganesePpm, setManganesePpm] = useState('');

  // Registry Manual Inputs
  const [registryCropInput, setRegistryCropInput] = useState('');
  const [registryDiseaseInput, setRegistryDiseaseInput] = useState('');
  const [registrySymptomsInput, setRegistrySymptomsInput] = useState('');
  const [registryMedicineInput, setRegistryMedicineInput] = useState('');
  const [showRegistryDirectory, setShowRegistryDirectory] = useState(false);
  const [registrySearchFilter, setRegistrySearchFilter] = useState('');

  // Processing & Output
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultOutput, setResultOutput] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [soilErrorMsg, setSoilErrorMsg] = useState('');

  // Camera handling
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setHistoryReports(getStoredReports());
    return () => {
      stopCamera();
    };
  }, []);

  const refreshHistory = () => {
    setHistoryReports(getStoredReports());
  };

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setIsCameraActive(false);
      alert(lang === 'hi' ? 'कैमरा चालू नहीं हो सका। कृपया अनुमति दें या फ़ाइल अपलोड विकल्प का उपयोग करें।' : 'Could not activate camera. Please grant permission or choose file upload.');
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setSelectedImage(dataUrl);
        setImageMimeType('image/jpeg');
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(lang === 'hi' ? 'कृपया केवल पौधे/पत्ती की फोटो अपलोड करें।' : 'Please upload an image file of the leaf.');
      return;
    }

    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setScannedPlant('');
    setScannedDisease('');
    setScannedDosage('');
    setScannedPrecautions('');
    setDosageCropQuery('');
    setFieldArea('');
    setSoilPhValue('');
    setNitrogenKg('');
    setPhosphorusKg('');
    setPotashKg('');
    setOcPercent('');
    setEcValue('');
    setZincPpm('');
    setIronPpm('');
    setSulphurPpm('');
    setBoronPpm('');
    setCopperPpm('');
    setManganesePpm('');
    setRegistryCropInput('');
    setRegistryDiseaseInput('');
    setRegistrySymptomsInput('');
    setRegistryMedicineInput('');
    setResultOutput(null);
    setLatestGeneratedReport(null);
    setIsNotFound(false);
    setSoilErrorMsg('');
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Switch to Dosage tab without generating dosage paragraph prematurely
  const goToDosageWithScannedData = () => {
    setActiveTab('dosage');
    setResultOutput(null);
    setLatestGeneratedReport(null);
    setIsNotFound(false);
    setSoilErrorMsg('');
    if (scannedPlant && scannedDisease) {
      setDosageCropQuery(`${scannedPlant} - ${scannedDisease}`);
    }
  };

  const handlePdfExtractedData = (data: any, fileName: string) => {
    if (data.ph != null) setSoilPhValue(String(data.ph));
    if (data.nitrogen != null) setNitrogenKg(String(data.nitrogen));
    if (data.phosphorus != null) setPhosphorusKg(String(data.phosphorus));
    if (data.potassium != null) setPotashKg(String(data.potassium));
    if (data.organicCarbon != null) setOcPercent(String(data.organicCarbon));
    if (data.electricalConductivity != null) setEcValue(String(data.electricalConductivity));
    if (data.zinc != null) setZincPpm(String(data.zinc));
    if (data.iron != null) setIronPpm(String(data.iron));
    if (data.sulphur != null) setSulphurPpm(String(data.sulphur));
    if (data.boron != null) setBoronPpm(String(data.boron));
    if (data.copper != null) setCopperPpm(String(data.copper));
    if (data.manganese != null) setManganesePpm(String(data.manganese));
    if (data.soilTexture) {
      const lower = data.soilTexture.toLowerCase();
      if (lower.includes('sand') || lower.includes('रेत')) setSoilQuality('Sandy');
      else if (lower.includes('clay') || lower.includes('काली')) setSoilQuality('Clay');
      else if (lower.includes('alkal') || lower.includes('ऊसर')) setSoilQuality('Alkaline');
      else setSoilQuality('Loam');
    }
    setSoilErrorMsg('');
  };

  const handleLoadReportIntoForm = (rep: UnifiedAgriReport) => {
    setActiveTab('dosage');
    setDosageCropQuery(rep.diseaseName ? `${rep.cropName} - ${rep.diseaseName}` : rep.cropName);
    if (rep.soilData) {
      if (rep.soilData.fieldArea) setFieldArea(rep.soilData.fieldArea);
      if (rep.soilData.areaUnit) setAreaUnit(rep.soilData.areaUnit);
      if (rep.soilData.soilQuality) setSoilQuality(rep.soilData.soilQuality);
      if (rep.soilData.ph) setSoilPhValue(rep.soilData.ph);
      if (rep.soilData.n) setNitrogenKg(rep.soilData.n);
      if (rep.soilData.p) setPhosphorusKg(rep.soilData.p);
      if (rep.soilData.k) setPotashKg(rep.soilData.k);
      if (rep.soilData.oc) setOcPercent(rep.soilData.oc);
      if (rep.soilData.ec) setEcValue(rep.soilData.ec);
      if (rep.soilData.zinc) setZincPpm(rep.soilData.zinc);
      if (rep.soilData.iron) setIronPpm(rep.soilData.iron);
      if (rep.soilData.sulphur) setSulphurPpm(rep.soilData.sulphur);
      if (rep.soilData.boron) setBoronPpm(rep.soilData.boron);
    }
    setResultOutput(null);
    setLatestGeneratedReport(null);
    setSoilErrorMsg('');
  };

  // Helper to calculate exact area, soil texture, pH and all soil test materials into a Single Unified Report
  const calculateComprehensiveSoilAndAreaDosage = (
    basePlant: string,
    baseDisease: string,
    baseDosage: string,
    basePrecautions: string
  ): {
    formattedParagraph: string;
    sprayWaterLitres: number;
    sprayTanks: number;
    soilDetails: any;
    npkAdvice: string;
    amendments: string;
  } => {
    const numArea = parseFloat(fieldArea) || 1;
    let factor = numArea;
    const unitLower = areaUnit.toLowerCase();
    if (unitLower.includes('bigha') || unitLower.includes('बीघा')) factor = numArea * 0.4;
    else if (unitLower.includes('hectare') || unitLower.includes('हेक्टेयर')) factor = numArea * 2.47;
    else if (unitLower.includes('guntha') || unitLower.includes('गुंठा')) factor = numArea * 0.025;

    const baseWaterLitres = 200;
    const totalWater = Math.max(16, Math.round(baseWaterLitres * factor));
    const totalTanks = Math.max(1, Math.round(totalWater / 16));

    // Soil test materials analysis
    const phVal = parseFloat(soilPhValue);
    const nVal = parseFloat(nitrogenKg);
    const pVal = parseFloat(phosphorusKg);
    const kVal = parseFloat(potashKg);
    const ocVal = parseFloat(ocPercent);
    const ecVal = parseFloat(ecValue);
    const znVal = parseFloat(zincPpm);
    const feVal = parseFloat(ironPpm);
    const sVal = parseFloat(sulphurPpm);
    const bVal = parseFloat(boronPpm);

    const soilBulletList: string[] = [];
    const fertilizerList: string[] = [];
    const precautionsList: string[] = [];

    // pH Analysis & Soil Conditioners
    if (!isNaN(phVal)) {
      if (phVal < 6.5) {
        if (lang === 'hi') {
          soilBulletList.push(`• मिट्टी अम्लीय (pH ${phVal}) है: पोषक तत्व ग्रहण क्षमता कम होती है।`);
          fertilizerList.push(`- चूना (Agricultural Lime) @ ${Math.round(200 * factor)} kg प्रति एकड़ खेत की जुताई में मिलाएं।`);
          precautionsList.push(`अम्लीय मिट्टी में फॉस्फोरस फिक्स हो जाता है, इसलिए रॉक फॉस्फेट या डीएपी के साथ जैविक खाद (FYM) अवश्य दें।`);
        } else {
          soilBulletList.push(`• Soil is Acidic (pH ${phVal}): Reduces macro-nutrient availability.`);
          fertilizerList.push(`- Apply Agricultural Lime @ ${Math.round(200 * factor)} kg per acre during field preparation.`);
          precautionsList.push(`Phosphorus gets fixed in acidic soil; always combine DAP/SSP with well-rotted Farm Yard Manure.`);
        }
      } else if (phVal > 7.8) {
        if (lang === 'hi') {
          soilBulletList.push(`• मिट्टी क्षारीय / ऊसर (pH ${phVal}) है: जिंक व लोहे की उपलब्धता घट जाती है।`);
          fertilizerList.push(`- जिप्सम (Gypsum 70-80% purity) @ ${Math.round(250 * factor)} kg प्रति एकड़ बखेरें व हल्की सिंचाई करें।`);
          precautionsList.push(`क्षारीय भूमि में यूरिया की लीचिंग व वाष्पीकरण अधिक होता है, अतः नीम लेपित यूरिया 3-4 बार में थोड़ा-थोड़ा दें।`);
        } else {
          soilBulletList.push(`• Soil is Alkaline / Saline (pH ${phVal}): Micronutrient fixation (Zn, Fe) occurs.`);
          fertilizerList.push(`- Apply Agricultural Gypsum @ ${Math.round(250 * factor)} kg per acre before sowing, followed by light irrigation.`);
          precautionsList.push(`Alkaline soils have high ammonia volatilization; apply neem-coated urea in 3-4 split doses.`);
        }
      } else {
        if (lang === 'hi') {
          soilBulletList.push(`• मिट्टी का pH ${phVal} आदर्श (संतुलित) है।`);
        } else {
          soilBulletList.push(`• Soil pH ${phVal} is Optimal and well-balanced.`);
        }
      }
    }

    // NPK Analysis
    if (!isNaN(nVal)) {
      if (nVal < 280) {
        fertilizerList.push(lang === 'hi'
          ? `- नाइट्रोजन कम (${nVal} kg/ha): यूरिया @ ${Math.round(45 * factor)} kg प्रति एकड़ 2-3 बराबर भागों में टॉप-ड्रेसिंग करें।`
          : `- Available Nitrogen Low (${nVal} kg/ha): Top-dress Urea @ ${Math.round(45 * factor)} kg per acre in split doses.`);
      } else if (nVal > 560) {
        fertilizerList.push(lang === 'hi'
          ? `- नाइट्रोजन अत्यधिक उच्च (${nVal} kg/ha): यूरिया की मात्रा 25% कम करें, अन्यथा कीड़े व फफूंद का प्रकोप बढ़ेगा।`
          : `- Nitrogen High (${nVal} kg/ha): Reduce Urea application by 25% to prevent insect and fungal infestation.`);
      }
    }

    if (!isNaN(pVal)) {
      if (pVal < 10) {
        fertilizerList.push(lang === 'hi'
          ? `- फॉस्फोरस कम (${pVal} kg/ha): सिंगल सुपर फॉस्फेट (SSP) @ ${Math.round(75 * factor)} kg या DAP @ ${Math.round(35 * factor)} kg बुवाई के समय कतारों में दें।`
          : `- Available Phosphorus Low (${pVal} kg/ha): Apply Single Super Phosphate (SSP) @ ${Math.round(75 * factor)} kg or DAP @ ${Math.round(35 * factor)} kg at sowing.`);
      }
    }

    if (!isNaN(kVal)) {
      if (kVal < 110) {
        fertilizerList.push(lang === 'hi'
          ? `- पोटाश कम (${kVal} kg/ha): म्यूरेट ऑफ पोटाश (MOP 60% K2O) @ ${Math.round(20 * factor)} kg प्रति एकड़ दें (रोग प्रतिरोधक क्षमता बढ़ाने हेतु)।`
          : `- Potassium Low (${kVal} kg/ha): Apply Muriate of Potash (MOP) @ ${Math.round(20 * factor)} kg per acre to boost disease resilience.`);
      }
    }

    // Micronutrients (Zn, Fe, S, B)
    if (!isNaN(znVal) && znVal < 0.6) {
      fertilizerList.push(lang === 'hi'
        ? `- जिंक की भारी कमी (${znVal} ppm): जिंक सल्फेट 21% @ ${Math.round(10 * factor)} kg प्रति एकड़ मिट्टी में दें अथवा चेलेटेड जिंक 12% @ 1 ग्राम/लीटर स्प्रे करें।`
        : `- Zinc Deficiency (${znVal} ppm): Apply Zinc Sulphate 21% @ ${Math.round(10 * factor)} kg per acre, or spray Chelated Zinc 12% @ 1 g/L.`);
    }

    if (!isNaN(feVal) && feVal < 4.5) {
      fertilizerList.push(lang === 'hi'
        ? `- लोहे की कमी (${feVal} ppm): फेरस सल्फेट (FeSO4) @ 0.5% (5 ग्राम प्रति लीटर पानी) का छिड़काव करें।`
        : `- Iron Deficiency (${feVal} ppm): Foliar spray of Ferrous Sulphate (FeSO4) @ 0.5% (5 g per litre water).`);
    }

    if (!isNaN(sVal) && sVal < 10) {
      fertilizerList.push(lang === 'hi'
        ? `- सल्फर की कमी (${sVal} ppm): सल्फर 80% WDG @ ${Math.round(3 * factor)} kg प्रति एकड़ सिंचाई के साथ दें (यह फफूंदनाशक का भी कार्य करता है)।`
        : `- Sulphur Deficiency (${sVal} ppm): Apply Sulphur 80% WDG @ ${Math.round(3 * factor)} kg per acre with irrigation.`);
    }

    if (!isNaN(bVal) && bVal < 0.5) {
      fertilizerList.push(lang === 'hi'
        ? `- बोरॉन की कमी (${bVal} ppm): बोरैक्स 20% @ 1 ग्राम प्रति लीटर पानी का छिड़काव फूल आने से पूर्व करें।`
        : `- Boron Deficiency (${bVal} ppm): Foliar spray of Borax 20% @ 1 g/L water before flowering.`);
    }

    // Soil texture adjustment
    const soilTextureName = soilQuality.includes('Sandy') ? (lang === 'hi' ? 'बलुई / रेतीली मिट्टी' : 'Sandy Soil')
      : soilQuality.includes('Clay') ? (lang === 'hi' ? 'काली / चिकनी भारी मिट्टी' : 'Clay Heavy Soil')
      : soilQuality.includes('Alkaline') ? (lang === 'hi' ? 'क्षारीय मिट्टी' : 'Alkaline Soil')
      : (lang === 'hi' ? 'दोमट मिट्टी' : 'Loam Soil');

    // Tailored chemical dosage calculation for the exact area
    let dosageCalculatedText = '';
    const matchMlAcre = baseDosage.match(/(\d+(?:\.\d+)?)\s*(?:-|–|to)?\s*(\d+(?:\.\d+)?)?\s*(ml|ग्राम|gm|g)\s*(?:प्रति|per)\s*(?:एकड़|acre)/i);
    const matchPerLitre = baseDosage.match(/(\d+(?:\.\d+)?)\s*(?:-|–|to)?\s*(\d+(?:\.\d+)?)?\s*(ml|ग्राम|gm|g)\s*(?:प्रति|per)\s*(?:लीटर|litre)/i);

    if (matchMlAcre) {
      const baseNum = parseFloat(matchMlAcre[1]);
      const totalChem = Math.round(baseNum * factor);
      const unit = matchMlAcre[3];
      dosageCalculatedText = lang === 'hi'
        ? `${baseDosage}\n\n[कुल गणना (${numArea} ${areaUnit} खेत हेतु)]: ${totalChem} ${unit} दवा को ${totalWater} लीटर पानी में घोलकर (लगभग ${totalTanks} स्प्रे टंकी) समान रूप से छिड़कें।`
        : `${baseDosage}\n\n[Exact Requirement for ${numArea} ${areaUnit}]: Mix ${totalChem} ${unit} chemical into ${totalWater} Litres of water (approx ${totalTanks} spray tanks) and spray uniformly.`;
    } else if (matchPerLitre) {
      const perLit = parseFloat(matchPerLitre[1]);
      const totalChem = Math.round(perLit * totalWater);
      const unit = matchPerLitre[3];
      dosageCalculatedText = lang === 'hi'
        ? `${baseDosage}\n\n[कुल गणना (${numArea} ${areaUnit} खेत हेतु)]: कुल ${totalWater} लीटर पानी में ${totalChem} ${unit} दवा मिलाएं (प्रति 16 लीटर स्प्रे टंकी में लगभग ${Math.round(perLit * 16)} ${unit})।`
        : `${baseDosage}\n\n[Exact Requirement for ${numArea} ${areaUnit}]: Mix ${totalChem} ${unit} total chemical in ${totalWater} Litres water (approx ${Math.round(perLit * 16)} ${unit} per 16L tank).`;
    } else {
      dosageCalculatedText = lang === 'hi'
        ? `${baseDosage}\n\n[कुल गणना (${numArea} ${areaUnit} खेत हेतु)]: कुल ${totalWater} लीटर पानी (लगभग ${totalTanks} स्प्रे टंकी) के साथ सुझाई गई दर से छिड़काव करें।`
        : `${baseDosage}\n\n[Exact Requirement for ${numArea} ${areaUnit}]: Apply with ${totalWater} Litres of water (approx ${totalTanks} spray tanks) following approved concentration.`;
    }

    const npkParagraph = fertilizerList.length > 0
      ? (lang === 'hi' ? `\n\nखाद व पोषक तत्व मात्रा (Soil Nutrient & NPK Recommendation):\n${fertilizerList.join('\n')}` : `\n\nSoil Nutrient & Fertilizer Recommendation:\n${fertilizerList.join('\n')}`)
      : '';

    const soilParagraph = soilBulletList.length > 0
      ? (lang === 'hi' ? `\nमिट्टी जांच रिपोर्ट स्थिति: ${soilBulletList.join(' ')}` : `\nSoil Health Analysis: ${soilBulletList.join(' ')}`)
      : '';

    const combinedPrecautions = [
      basePrecautions,
      ...precautionsList,
      lang === 'hi'
        ? `स्प्रे हमेशा सुबह 10 बजे से पहले अथवा शाम 4 बजे के बाद हवा की दिशा में करें। पत्तियों के नीचे भी स्प्रे पहुंचना चाहिए।`
        : `Spray in the morning before 10 AM or after 4 PM with wind direction. Ensure under-leaf coverage.`
    ].filter(Boolean).join(' ');

    const formattedParagraph = lang === 'hi'
      ? `- Paudha (Plant): ${basePlant}
- Bimari (Disease): ${baseDisease}
- Ilaaj aur Dawai (Treatment & Dosage): ${dosageCalculatedText}${soilParagraph}${npkParagraph}
- Savdhani (Precautions): ${combinedPrecautions} [मिट्टी: ${soilTextureName}, रकबा: ${numArea} ${areaUnit}]`
      : `- Paudha (Plant): ${basePlant}
- Bimari (Disease): ${baseDisease}
- Ilaaj aur Dawai (Treatment & Dosage): ${dosageCalculatedText}${soilParagraph}${npkParagraph}
- Savdhani (Precautions): ${combinedPrecautions} [Soil: ${soilTextureName}, Acreage: ${numArea} ${areaUnit}]`;

    return {
      formattedParagraph,
      sprayWaterLitres: totalWater,
      sprayTanks: totalTanks,
      soilDetails: {
        fieldArea: String(numArea),
        areaUnit,
        soilQuality: soilTextureName,
        ph: soilPhValue.trim() || undefined,
        n: nitrogenKg.trim() || undefined,
        p: phosphorusKg.trim() || undefined,
        k: potashKg.trim() || undefined,
        oc: ocPercent.trim() || undefined,
        ec: ecValue.trim() || undefined,
        zinc: zincPpm.trim() || undefined,
        iron: ironPpm.trim() || undefined,
        sulphur: sulphurPpm.trim() || undefined,
        boron: boronPpm.trim() || undefined,
        copper: copperPpm.trim() || undefined,
        manganese: manganesePpm.trim() || undefined,
        filledVia: soilInputMethod === 'pdf' ? 'pdf_upload' : 'manual'
      },
      npkAdvice: fertilizerList.join('; '),
      amendments: combinedPrecautions
    };
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setResultOutput(null);
    setLatestGeneratedReport(null);
    setIsNotFound(false);

    try {
      // 1. Leaf Photo Scan Mode
      if (activeTab === 'upload') {
        if (!selectedImage) {
          setResultOutput(NOT_FOUND_TEXT);
          setIsNotFound(true);
          setIsAnalyzing(false);
          return;
        }

        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: selectedImage,
            mimeType: imageMimeType
          })
        });

        if (res.ok) {
          const data = await res.json();
          const out = data.formatted?.trim();
          if (data.success && out && !out.includes(NOT_FOUND_TEXT) && out.includes('Paudha')) {
            setResultOutput(out);

            const plantMatch = out.match(/-\s*Paudha\s*\([^)]*\)\s*:\s*([^\n\r]+)/i);
            const diseaseMatch = out.match(/-\s*Bimari\s*\([^)]*\)\s*:\s*([^\n\r]+)/i);
            const dosageMatch = out.match(/-\s*Ilaaj[^\n\r:]*:\s*([^\n\r]+)/i);
            const precMatch = out.match(/-\s*Savdhani\s*\([^)]*\)\s*:\s*([^\n\r]+)/i);

            const detectedP = plantMatch ? plantMatch[1].trim() : (data.detectedCrop || 'पौधा');
            const detectedD = diseaseMatch ? diseaseMatch[1].trim() : (data.detectedDisease || 'रोग');
            const detectedDosage = dosageMatch ? dosageMatch[1].trim() : '';
            const detectedPrec = precMatch ? precMatch[1].trim() : '';

            setScannedPlant(detectedP);
            setScannedDisease(detectedD);
            setScannedDosage(detectedDosage);
            setScannedPrecautions(detectedPrec);

            // Save leaf scan to unified history
            saveUnifiedReport({
              reportType: 'leaf_scan',
              cropName: detectedP,
              diseaseName: detectedD,
              imageThumbnail: selectedImage,
              treatmentDosage: detectedDosage,
              precautions: detectedPrec,
              rawFormattedOutput: out
            });
            // Note: latestGeneratedReport will be generated when user enters soil details on Tab 2
            setLatestGeneratedReport(null);
            refreshHistory();
          } else {
            setResultOutput(NOT_FOUND_TEXT);
            setIsNotFound(true);
          }
        } else {
          setResultOutput(NOT_FOUND_TEXT);
          setIsNotFound(true);
        }
      }

      // 2. Dosage & Soil Calculator Mode
      else if (activeTab === 'dosage') {
        const queryToUse = dosageCropQuery.trim() || (scannedPlant ? `${scannedPlant} - ${scannedDisease}` : '');
        if (!queryToUse) {
          setResultOutput(NOT_FOUND_TEXT);
          setIsNotFound(true);
          setIsAnalyzing(false);
          return;
        }

        // Check if user provided soil details or field area
        const hasSoilDetails = Boolean(
          fieldArea.trim() ||
          soilPhValue.trim() ||
          nitrogenKg.trim() ||
          phosphorusKg.trim() ||
          potashKg.trim() ||
          ocPercent.trim() ||
          ecValue.trim() ||
          zincPpm.trim() ||
          ironPpm.trim() ||
          sulphurPpm.trim() ||
          boronPpm.trim()
        );

        if (!hasSoilDetails) {
          setSoilErrorMsg(t.soilErrorNotice);
          setIsAnalyzing(false);
          return;
        }

        setSoilErrorMsg('');

        // Find baseline plant and disease
        let baseRecord: VerifiedAgriRecord | null = null;
        const matches = searchVerifiedAgriRecords(queryToUse);
        if (matches.length > 0) {
          baseRecord = matches[0];
        }

        const plantName = baseRecord ? `${baseRecord.cropHindi} [${baseRecord.cropEnglish}]` : (scannedPlant || queryToUse.split('-')[0].trim());
        const diseaseName = baseRecord ? baseRecord.diseaseHindi : (scannedDisease || queryToUse.split('-')[1]?.trim() || 'पादप रोग');
        const treatmentDosage = baseRecord ? baseRecord.treatmentDosage : (scannedDosage || 'मानक अनुमोदित कीटनाशक / फफूंदनाशक का 2 ml प्रति लीटर पानी की दर से छिड़काव करें।');
        const precautions = baseRecord ? baseRecord.precautions : (scannedPrecautions || 'मास्क पहनें व सुरक्षा नियमों का पालन करें।');

        const comprehensive = calculateComprehensiveSoilAndAreaDosage(
          plantName,
          diseaseName,
          treatmentDosage,
          precautions
        );

        setResultOutput(comprehensive.formattedParagraph);

        // Save into single unified history
        const unifiedReport = saveUnifiedReport({
          reportType: 'soil_dosage',
          cropName: plantName,
          diseaseName: diseaseName,
          imageThumbnail: selectedImage || undefined,
          soilData: comprehensive.soilDetails,
          sprayWaterLitres: comprehensive.sprayWaterLitres,
          sprayTanks: comprehensive.sprayTanks,
          treatmentDosage: comprehensive.formattedParagraph.split('Ilaaj aur Dawai (Treatment & Dosage):')[1]?.split('- Savdhani')[0]?.trim() || treatmentDosage,
          fertilizerNPK: comprehensive.npkAdvice,
          precautions: comprehensive.amendments,
          rawFormattedOutput: comprehensive.formattedParagraph
        });

        setLatestGeneratedReport(unifiedReport);
        refreshHistory();
      }

      // 3. Manual Registry Lookup
      else if (activeTab === 'lookup') {
        const combinedQuery = [registryCropInput, registryDiseaseInput, registrySymptomsInput, registryMedicineInput]
          .filter(Boolean)
          .join(' ')
          .trim();

        if (!combinedQuery) {
          setResultOutput(NOT_FOUND_TEXT);
          setIsNotFound(true);
          setIsAnalyzing(false);
          return;
        }

        const matches = searchVerifiedAgriRecords(combinedQuery);
        if (matches.length > 0) {
          const rec = matches[0];
          const out = formatAgriOutput(rec);
          setResultOutput(out);

          const regReport = saveUnifiedReport({
            reportType: 'registry',
            cropName: `${rec.cropHindi} [${rec.cropEnglish}]`,
            diseaseName: rec.diseaseHindi,
            treatmentDosage: rec.treatmentDosage,
            precautions: rec.precautions,
            rawFormattedOutput: out
          });

          setLatestGeneratedReport(regReport);
          refreshHistory();
        } else {
          setResultOutput(STRICT_DATA_NOT_FOUND);
          setIsNotFound(true);
        }
      }
    } catch (err) {
      console.error('Error in runAnalysis:', err);
      setResultOutput(NOT_FOUND_TEXT);
      setIsNotFound(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-emerald-900/60 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {t.appTitle}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-950 border border-emerald-700/60 text-emerald-300 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {t.strictModeBadge}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Right Controls: Language Switcher & Badge */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector Pill */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-lg p-0.5 shadow-inner">
              <button
                type="button"
                onClick={() => handleLanguageChange('hi')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  lang === 'hi'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                English
              </button>
            </div>

            {/* Clear All Button */}
            <button
              onClick={handleClear}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              {t.clearAll}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 sm:space-x-2 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>{t.tabLeafScan}</span>
          </button>

          <button
            onClick={() => setActiveTab('dosage')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'dosage'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.tabDosage}</span>
            {scannedPlant && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('lookup')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'lookup'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{t.tabRegistry}</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{t.tabHistory}</span>
            {historyReports.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-900 border border-emerald-700 text-[10px] text-emerald-300 font-mono font-bold">
                {historyReports.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* ================= TAB 1: LEAF SCAN ================= */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    {t.leafScanHeading}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {t.leafScanSubheading}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md self-start sm:self-auto font-mono">
                  {t.verifiedGovBadge}
                </span>
              </div>

              {/* Camera Preview */}
              {isCameraActive && (
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-h-96 flex items-center justify-center border-2 border-emerald-500 shadow-xl">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                    <button
                      onClick={capturePhoto}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                      {t.capturePhoto}
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                    >
                      {t.cancelCamera}
                    </button>
                  </div>
                </div>
              )}

              {/* Photo Upload & Live Buttons */}
              {!isCameraActive && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={startCamera}
                    className="p-4 rounded-xl border border-dashed border-emerald-600/70 hover:border-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-900/60 group-hover:bg-emerald-800 flex items-center justify-center text-emerald-300">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold">{t.takePhoto}</span>
                    <span className="text-[10px] text-slate-400">
                      {lang === 'hi' ? 'फोन के कैमरे से पत्ती का सीधा फोटो लें' : 'Use phone/webcam camera'}
                    </span>
                  </button>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500/80 bg-slate-950/60 hover:bg-slate-900 text-slate-300 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center text-emerald-400">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold">{t.uploadPhoto}</span>
                    <span className="text-[10px] text-slate-400">
                      {lang === 'hi' ? 'JPG, PNG, WEBP (अधिकतम 15MB)' : 'JPG, PNG, WEBP (Up to 15MB)'}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              )}

              {/* Selected Photo Preview */}
              {selectedImage && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedImage}
                      alt="Selected Leaf"
                      className="w-14 h-14 rounded-lg object-cover border border-emerald-600/60"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {lang === 'hi' ? 'पत्ती की फोटो लोड हो गई है' : 'Leaf photo loaded'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lang === 'hi' ? 'नीचे बटन दबाकर रोग व कीट की पहचान करें' : 'Click the button below to diagnose'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-950/40 transition-colors"
                    title={t.removePhoto}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Scan Action Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={runAnalysis}
                  disabled={isAnalyzing || !selectedImage}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isAnalyzing || !selectedImage
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>{t.analyzingLeaf}</span>
                    </>
                  ) : (
                    <>
                      <Sprout className="w-4 h-4" />
                      <span>{t.startLeafScan}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Leaf Diagnosis Result Card in Tab 1 */}
            {scannedPlant && (
              <div className="p-5 bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 border-2 border-emerald-600/70 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {lang === 'hi' ? 'पत्ती रोग पहचान परिणाम' : 'Leaf Pathology Diagnosis'}
                      </h3>
                      <span className="text-[10px] text-emerald-300 font-mono">
                        {lang === 'hi' ? 'पहचान सफल • ICAR मानक' : 'Diagnosis Successful • ICAR Standards'}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
                    ✓ {lang === 'hi' ? 'पहचान पूर्ण' : 'Diagnosed'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {lang === 'hi' ? 'पहचाना गया पौधा' : 'Plant / Tree Identified'}
                    </span>
                    <div className="text-base font-bold text-white flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-400" />
                      {scannedPlant}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {lang === 'hi' ? 'पहचाना गया रोग / लक्षण' : 'Diagnosed Disease / Condition'}
                    </span>
                    <div className="text-base font-bold text-amber-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      {scannedDisease}
                    </div>
                  </div>
                </div>

                {/* Transition Card to Tab 2 to enter soil details */}
                <div className="p-4 bg-emerald-950/60 border border-emerald-600/70 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>{lang === 'hi' ? 'दवाई व खाद की सही मात्रा निकालें' : 'Proceed to Calculate Exact Dosage & Soil Nutrients'}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 max-w-lg">
                      {lang === 'hi'
                        ? `${scannedPlant} के लिए आगे पेज पर खेत का रकबा व मिट्टी की जांच (pH, NPK) दर्ज करें, तभी दवा व खाद की सटीक मात्रा का विवरण बनेगा।`
                        : `Enter field area and soil test parameters (pH, NPK) on the next page to calculate the exact prescription and fertilizer amendments for ${scannedPlant}.`}
                    </p>
                  </div>
                  <button
                    onClick={goToDosageWithScannedData}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all self-end sm:self-auto shrink-0"
                  >
                    <span>{t.proceedToDosage}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: DOSAGE & SOIL CALCULATOR ================= */}
        {activeTab === 'dosage' && (
          <div className="space-y-5">
            <div className="p-4 sm:p-5 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-md space-y-4">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  {t.dosageHeading}
                </h2>
                <p className="text-xs text-slate-400">
                  {t.dosageSubheading}
                </p>
              </div>

              {/* Scanned Plant Banner */}
              {scannedPlant && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {t.scannedPlantBadge}: <strong>{scannedPlant}</strong> • {scannedDisease}
                  </span>
                  <button
                    onClick={() => {
                      setScannedPlant('');
                      setScannedDisease('');
                      setDosageCropQuery('');
                    }}
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    {lang === 'hi' ? 'हटाएं' : 'Clear'}
                  </button>
                </div>
              )}

              {/* Crop & Disease Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {t.cropDiseaseLabel}
                </label>
                <input
                  type="text"
                  value={dosageCropQuery}
                  onChange={e => {
                    setDosageCropQuery(e.target.value);
                    setSoilErrorMsg('');
                  }}
                  placeholder={t.cropDiseasePlaceholder}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {/* Field Area & Soil Texture */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    {t.fieldAreaLabel} *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={fieldArea}
                    onChange={e => {
                      setFieldArea(e.target.value);
                      setSoilErrorMsg('');
                    }}
                    placeholder={t.fieldAreaPlaceholder}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    {t.areaUnitLabel}
                  </label>
                  <select
                    value={areaUnit}
                    onChange={e => setAreaUnit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Acre">{lang === 'hi' ? 'एकड़ (Acre)' : 'Acre'}</option>
                    <option value="Bigha">{lang === 'hi' ? 'बीघा (Bigha)' : 'Bigha'}</option>
                    <option value="Hectare">{lang === 'hi' ? 'हेक्टेयर (Hectare)' : 'Hectare'}</option>
                    <option value="Guntha">{lang === 'hi' ? 'गुंठा (Guntha)' : 'Guntha'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    {t.soilTextureLabel}
                  </label>
                  <select
                    value={soilQuality}
                    onChange={e => setSoilQuality(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Loam">{t.loam}</option>
                    <option value="Sandy">{t.sandy}</option>
                    <option value="Clay">{t.clay}</option>
                    <option value="Alkaline">{t.alkaline}</option>
                    <option value="Acidic">{t.acidic}</option>
                  </select>
                </div>
              </div>

              {/* Method of entering soil details: Manual vs PDF */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.soilFillMethodLabel}</span>
                  </label>
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg p-0.5 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setSoilInputMethod('manual')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        soilInputMethod === 'manual'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.fillViaManual}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSoilInputMethod('pdf')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        soilInputMethod === 'pdf'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.fillViaPdf}
                    </button>
                  </div>
                </div>

                {/* PDF Upload Mode */}
                {soilInputMethod === 'pdf' && (
                  <SoilPdfUpload
                    lang={lang}
                    onExtracted={handlePdfExtractedData}
                  />
                )}

                {/* 12 Soil Test Parameters (All User-Controlled, Populated by PDF or Manual) */}
                <div className="p-3.5 bg-slate-950/80 border border-slate-800/90 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-bold text-emerald-400">
                      {t.soilMaterialsHeading}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {t.soilMaterialsSub}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {/* pH */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.phLabel}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={soilPhValue}
                        onChange={e => {
                          setSoilPhValue(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.phPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Nitrogen */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.nLabel} ({t.nUnit})</label>
                      <input
                        type="number"
                        value={nitrogenKg}
                        onChange={e => {
                          setNitrogenKg(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.nPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Phosphorus */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.pLabel} ({t.pUnit})</label>
                      <input
                        type="number"
                        value={phosphorusKg}
                        onChange={e => {
                          setPhosphorusKg(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.pPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Potassium */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.kLabel} ({t.kUnit})</label>
                      <input
                        type="number"
                        value={potashKg}
                        onChange={e => {
                          setPotashKg(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.kPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Organic Carbon */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.ocLabel} ({t.ocUnit})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={ocPercent}
                        onChange={e => {
                          setOcPercent(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.ocPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* EC */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.ecLabel} ({t.ecUnit})</label>
                      <input
                        type="number"
                        step="0.1"
                        value={ecValue}
                        onChange={e => {
                          setEcValue(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.ecPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Zinc */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.zincLabel} ({t.zincUnit})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={zincPpm}
                        onChange={e => {
                          setZincPpm(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.zincPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Iron */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.ironLabel} ({t.ironUnit})</label>
                      <input
                        type="number"
                        step="0.1"
                        value={ironPpm}
                        onChange={e => {
                          setIronPpm(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.ironPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Sulphur */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.sulphurLabel} ({t.sulphurUnit})</label>
                      <input
                        type="number"
                        step="0.1"
                        value={sulphurPpm}
                        onChange={e => {
                          setSulphurPpm(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.sulphurPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Boron */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.boronLabel} ({t.boronUnit})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={boronPpm}
                        onChange={e => {
                          setBoronPpm(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.boronPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Copper */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.copperLabel} ({t.copperUnit})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={copperPpm}
                        onChange={e => {
                          setCopperPpm(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.copperPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Manganese */}
                    <div className="space-y-0.5">
                      <label className="text-[11px] text-slate-300 font-medium">{t.manganeseLabel} ({t.manganeseUnit})</label>
                      <input
                        type="number"
                        step="0.1"
                        value={manganesePpm}
                        onChange={e => {
                          setManganesePpm(e.target.value);
                          setSoilErrorMsg('');
                        }}
                        placeholder={t.manganesePlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Soil Error / Prompt Notice */}
              {soilErrorMsg && (
                <div className="p-3 bg-amber-950/60 border border-amber-500/70 rounded-xl text-xs text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{soilErrorMsg}</span>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950 flex items-center gap-2 transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.calculating}</span>
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" />
                      <span>{t.calculateDosageBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DISEASE REGISTRY ================= */}
        {activeTab === 'lookup' && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-md space-y-4">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  {t.registryHeading}
                </h2>
                <p className="text-xs text-slate-400">
                  {t.registrySubheading}
                </p>
              </div>

              {/* User Explicit Manual Inputs */}
              <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-bold text-emerald-400">
                  {t.registryManualInputsTitle}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-300">
                      {t.registryCropInputLabel}
                    </label>
                    <input
                      type="text"
                      value={registryCropInput}
                      onChange={e => setRegistryCropInput(e.target.value)}
                      placeholder={lang === 'hi' ? 'उदा. गेहूं, धान, आलू, टमाटर...' : 'e.g. Wheat, Rice, Potato, Tomato...'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-300">
                      {t.registryDiseaseInputLabel}
                    </label>
                    <input
                      type="text"
                      value={registryDiseaseInput}
                      onChange={e => setRegistryDiseaseInput(e.target.value)}
                      placeholder={lang === 'hi' ? 'उदा. पीला रतुआ, झुलसा, लीफ कर्ल...' : 'e.g. Yellow Rust, Late Blight, Leaf Curl...'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-300">
                      {t.registrySymptomsInputLabel}
                    </label>
                    <input
                      type="text"
                      value={registrySymptomsInput}
                      onChange={e => setRegistrySymptomsInput(e.target.value)}
                      placeholder={lang === 'hi' ? 'उदा. पीली धारियां, काले धब्बे, पत्तियां मुड़ना...' : 'e.g. Yellow stripes, black spots, curled leaves...'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-300">
                      {t.registryMedicineInputLabel}
                    </label>
                    <input
                      type="text"
                      value={registryMedicineInput}
                      onChange={e => setRegistryMedicineInput(e.target.value)}
                      placeholder={lang === 'hi' ? 'उदा. Tilt, Mancozeb, Imidacloprid...' : 'e.g. Tilt, Mancozeb, Imidacloprid...'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow"
                  >
                    {t.verifyRegistryBtn}
                  </button>
                </div>
              </div>

              {/* Directory Viewer Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegistryDirectory(!showRegistryDirectory)}
                  className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  {showRegistryDirectory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  <span>{showRegistryDirectory ? t.hideCatalog : t.browseFullCatalog}</span>
                </button>

                {showRegistryDirectory && (
                  <div className="mt-3 p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <input
                      type="text"
                      value={registrySearchFilter}
                      onChange={e => setRegistrySearchFilter(e.target.value)}
                      placeholder={t.searchRegistryPlaceholder}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
                    />

                    <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                      {VERIFIED_AGRI_DATABASE.filter(item => {
                        if (!registrySearchFilter.trim()) return true;
                        const q = registrySearchFilter.toLowerCase();
                        return (
                          item.cropHindi.toLowerCase().includes(q) ||
                          item.cropEnglish.toLowerCase().includes(q) ||
                          item.diseaseHindi.toLowerCase().includes(q) ||
                          item.diseaseEnglish.toLowerCase().includes(q) ||
                          item.keywords.some(k => k.includes(q))
                        );
                      }).map(item => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setDosageCropQuery(`${item.cropHindi} - ${item.diseaseHindi}`);
                            setActiveTab('dosage');
                          }}
                          className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg cursor-pointer transition-colors text-xs flex justify-between items-center group"
                        >
                          <div>
                            <span className="font-bold text-white group-hover:text-emerald-300">
                              {lang === 'hi' ? item.cropHindi : item.cropEnglish}
                            </span>
                            <span className="text-amber-400 font-medium ml-2">
                              • {lang === 'hi' ? item.diseaseHindi : item.diseaseEnglish}
                            </span>
                            <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {item.treatmentDosage}
                            </div>
                          </div>
                          <span className="text-[10px] text-emerald-400 shrink-0 font-mono">
                            {lang === 'hi' ? 'कैलकुलेटर में खोलें →' : 'Open in Calc →'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: REPORT HISTORY ================= */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-md space-y-4">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  {t.historyHeading}
                </h2>
                <p className="text-xs text-slate-400">
                  {t.historySubheading}
                </p>
              </div>

              <HistoryView
                reports={historyReports}
                lang={lang}
                onRefreshReports={refreshHistory}
                onLoadIntoForm={handleLoadReportIntoForm}
              />
            </div>
          </div>
        )}

        {/* ================= SINGLE UNIFIED REPORT OUTPUT DISPLAY ================= */}
        {activeTab !== 'history' && activeTab !== 'upload' && (resultOutput || latestGeneratedReport) && (
          <section className="space-y-4 pt-2">
            {isNotFound ? (
              <div className="p-5 bg-amber-950/40 border-2 border-amber-500/70 rounded-2xl text-amber-200 font-mono text-xs flex items-start gap-3 shadow-xl">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-300 text-sm mb-1">
                    {lang === 'hi' ? 'सत्यापित रिकॉर्ड में डेटा उपलब्ध नहीं है' : 'Data not found in verified records.'}
                  </div>
                  <div>
                    {resultOutput || STRICT_DATA_NOT_FOUND}
                  </div>
                </div>
              </div>
            ) : latestGeneratedReport ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {lang === 'hi' ? 'एकल एकीकृत कृषि रिपोर्ट' : 'Single Unified Agricultural Report'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t.savedToHistoryBadge}
                  </span>
                </div>
                <UnifiedReportCard
                  report={latestGeneratedReport}
                  lang={lang}
                  onClose={() => {
                    setResultOutput(null);
                    setLatestGeneratedReport(null);
                  }}
                  onLoadIntoForm={handleLoadReportIntoForm}
                />
              </div>
            ) : (
              resultOutput && (
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono text-xs whitespace-pre-wrap">
                  {resultOutput}
                </div>
              )
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-3 text-center text-[11px] text-slate-600 font-mono no-print">
        {lang === 'hi'
          ? 'किसान रोग व मृदा निदान इंजन • ICAR एवं CIBRC मानक आधारित सख्त डेटा सत्यापन'
          : 'Kisan Crop Disease & Soil Health Engine • Strict Verified Agri Data per ICAR / CIBRC Standards'}
      </footer>
    </div>
  );
}
