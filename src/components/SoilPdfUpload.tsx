import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  X
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../utils/translations';

interface ExtractedSoilData {
  ph?: number | null;
  nitrogen?: number | null;
  phosphorus?: number | null;
  potassium?: number | null;
  organicCarbon?: number | null;
  electricalConductivity?: number | null;
  zinc?: number | null;
  iron?: number | null;
  sulphur?: number | null;
  boron?: number | null;
  copper?: number | null;
  manganese?: number | null;
  soilTexture?: string | null;
}

interface SoilPdfUploadProps {
  onExtracted: (data: ExtractedSoilData, fileName: string) => void;
  lang?: Language;
  disabled?: boolean;
}

export const SoilPdfUpload: React.FC<SoilPdfUploadProps> = ({
  onExtracted,
  lang = 'hi',
  disabled = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const t = TRANSLATIONS[lang];

  const processFile = async (file: File) => {
    setUploadError('');
    setSuccessInfo('');
    setIsProcessing(true);
    setUploadedFileName(file.name);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileBase64 = reader.result as string;
        const mimeType = file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

        try {
          const res = await fetch('/api/parse-soil-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileBase64,
              mimeType
            })
          });

          if (!res.ok) {
            throw new Error(lang === 'hi'
              ? 'सर्वर से मृदा रिपोर्ट का विश्लेषण नहीं हो सका'
              : 'Failed to parse soil report on the server');
          }

          const json = await res.json();
          if (json.success && json.data) {
            const data: ExtractedSoilData = json.data;
            let fieldCount = 0;
            if (data.ph != null) fieldCount++;
            if (data.nitrogen != null) fieldCount++;
            if (data.phosphorus != null) fieldCount++;
            if (data.potassium != null) fieldCount++;
            if (data.organicCarbon != null) fieldCount++;
            if (data.electricalConductivity != null) fieldCount++;
            if (data.zinc != null) fieldCount++;
            if (data.iron != null) fieldCount++;
            if (data.sulphur != null) fieldCount++;
            if (data.boron != null) fieldCount++;
            if (data.copper != null) fieldCount++;
            if (data.manganese != null) fieldCount++;

            onExtracted(data, file.name);
            setSuccessInfo(lang === 'hi'
              ? `सफलतापूर्वक ${fieldCount} पैरामीटर PDF रिपोर्ट से प्राप्त कर लिए गए और फॉर्म में भर दिए गए हैं!`
              : `Successfully extracted ${fieldCount} parameters from the PDF report and filled into the form!`);
          } else {
            setUploadError(json.error || (lang === 'hi'
              ? 'दस्तावेज में से मिट्टी के आंकड़े नहीं पढ़े जा सके। कृपया स्पष्ट रिपोर्ट PDF या फोटो अपलोड करें अथवा नीचे मैन्युअल दर्ज करें।'
              : 'Could not extract soil numbers from document. Please upload a clear PDF report or enter values manually below.'));
          }
        } catch (err: any) {
          setUploadError(err.message || (lang === 'hi' ? 'विश्लेषण में त्रुटि हुई।' : 'Error analyzing report.'));
        } finally {
          setIsProcessing(false);
        }
      };

      reader.onerror = () => {
        setUploadError(lang === 'hi' ? 'फ़ाइल पढ़ने में त्रुटि हुई।' : 'Error reading file.');
        setIsProcessing(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || (lang === 'hi' ? 'फ़ाइल लोड करने में त्रुटि।' : 'Failed to load file.'));
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled || isProcessing) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = () => {
    setUploadedFileName('');
    setUploadError('');
    setSuccessInfo('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {/* Upload Drop Zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !disabled && !isProcessing && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
          isProcessing
            ? 'border-emerald-500 bg-emerald-950/20'
            : uploadError
            ? 'border-red-500/60 bg-red-950/20'
            : successInfo
            ? 'border-emerald-500/80 bg-emerald-950/30'
            : 'border-slate-700 hover:border-emerald-500/70 bg-slate-950/60 hover:bg-slate-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled || isProcessing}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {isProcessing ? (
            <>
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
              <div className="text-sm font-semibold text-emerald-300">
                {lang === 'hi' ? 'PDF से मिट्टी के आंकड़े पढ़े जा रहे हैं...' : 'Extracting soil parameters from PDF...'}
              </div>
              <div className="text-xs text-slate-400">
                {uploadedFileName}
              </div>
            </>
          ) : successInfo ? (
            <>
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <div className="text-sm font-semibold text-emerald-300">
                {uploadedFileName}
              </div>
              <div className="text-xs text-emerald-200">
                {successInfo}
              </div>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="mt-2 text-[11px] text-slate-400 hover:text-white underline"
              >
                {lang === 'hi' ? 'दूसरी PDF अपलोड करें' : 'Upload another PDF'}
              </button>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-slate-200">
                {lang === 'hi' ? 'मृदा स्वास्थ्य कार्ड / लैब रिपोर्ट (PDF या फोटो) यहां छोड़ें या क्लिक करें' : 'Drop Soil Health Card / Lab Report (PDF or image) here, or browse'}
              </div>
              <div className="text-xs text-slate-400 max-w-sm">
                {t.pdfUploadHint}
              </div>
              <div className="text-[10px] text-emerald-400/90 font-mono mt-1">
                {lang === 'hi' ? 'समर्थित प्रारूप: PDF, JPG, PNG (ऑटो-एक्सट्रैक्शन)' : 'Supported: PDF, JPG, PNG (Auto-Extraction)'}
              </div>
            </>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="p-3 bg-red-950/70 border border-red-700/60 rounded-xl flex items-start gap-2.5 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">{uploadError}</div>
          <button
            type="button"
            onClick={handleClear}
            className="text-red-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
