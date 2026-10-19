import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Copy,
  Check,
  Printer,
  Sparkles,
  FlaskConical,
  Droplets,
  AlertCircle,
  FileCheck,
  Calendar,
  Layers,
  Leaf
} from 'lucide-react';
import { UnifiedAgriReport } from '../utils/historyStorage';
import { TRANSLATIONS, Language } from '../utils/translations';

interface UnifiedReportCardProps {
  report: UnifiedAgriReport;
  lang?: Language;
  onClose?: () => void;
  onLoadIntoForm?: (report: UnifiedAgriReport) => void;
  isHistorical?: boolean;
}

export const UnifiedReportCard: React.FC<UnifiedReportCardProps> = ({
  report,
  lang = 'hi',
  onClose,
  onLoadIntoForm,
  isHistorical = false
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = TRANSLATIONS[lang];

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = lang === 'hi'
        ? `फसल: ${report.cropName}. रोग: ${report.diseaseName}. दवा और खुराक: ${report.treatmentDosage}. सावधानियां: ${report.precautions}`
        : `Crop: ${report.cropName}. Disease: ${report.diseaseName}. Treatment and Dosage: ${report.treatmentDosage}. Precautions: ${report.precautions}`;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const copyToClipboard = () => {
    const text = report.rawFormattedOutput || (lang === 'hi'
      ? `पौधा: ${report.cropName}\nबीमारी: ${report.diseaseName}\nदवा व खुराक: ${report.treatmentDosage}\nसावधानियां: ${report.precautions}`
      : `Plant: ${report.cropName}\nDisease: ${report.diseaseName}\nTreatment & Dosage: ${report.treatmentDosage}\nPrecautions: ${report.precautions}`);
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printReport = () => {
    window.print();
  };

  const soil = report.soilData;

  return (
    <div className="bg-slate-900 border-2 border-emerald-600/70 rounded-2xl overflow-hidden shadow-2xl printable-slip text-slate-100">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-800/60 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-wide text-white">
                {t.unifiedReportTitle}
              </h3>
              <span className="text-[10px] bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded font-mono">
                {t.slipBadge}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                {report.dateStr}
              </span>
              <span>•</span>
              <span className="font-mono text-slate-400">ID: {report.id.slice(-8)}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 no-print">
          <button
            onClick={toggleSpeech}
            title={isSpeaking ? t.stopSpeech : t.listenSpeech}
            className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
              isSpeaking
                ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSpeaking ? t.stopSpeech : t.listenSpeech}</span>
          </button>

          <button
            onClick={copyToClipboard}
            title={t.copyReport}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? t.copiedReport : t.copyReport}</span>
          </button>

          <button
            onClick={printReport}
            title={t.printReport}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.printReport}</span>
          </button>

          {isHistorical && onLoadIntoForm && (
            <button
              onClick={() => onLoadIntoForm(report)}
              className="px-2.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 border border-blue-500/50 text-blue-300 hover:text-white text-xs font-semibold transition-colors"
            >
              {t.loadIntoFormBtn}
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs"
            >
              {t.closeReport}
            </button>
          )}
        </div>
      </div>

      {/* Main Report Body */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* 1. Crop, Disease & Field Overview Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Crop & Leaf Info */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>{t.cropPlantTitle}</span>
            </div>
            <div className="text-base font-bold text-white">
              {report.cropName || (lang === 'hi' ? 'पौधा पहचान' : 'Crop Identification')}
            </div>
            {report.imageThumbnail && (
              <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-slate-800">
                <img src={report.imageThumbnail} alt="Scanned Leaf" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Disease / Pathology Info */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t.diagnosedDiseaseTitle}</span>
            </div>
            <div className="text-base font-bold text-amber-300">
              {report.diseaseName || (lang === 'hi' ? 'सामान्य स्वास्थ्य जांच' : 'Standard Health Assessment')}
            </div>
            <div className="text-[11px] text-slate-400">
              {lang === 'hi' ? 'सत्यापित वैज्ञानिक निदान व मानक उपचार' : 'Verified ICAR Pathology & Dosage'}
            </div>
          </div>

          {/* Field Area & Water Spray Info */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Droplets className="w-3.5 h-3.5" />
              <span>{t.fieldAndSprayTitle}</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">
              {t.fieldAreaWord} <span className="text-white font-bold">{soil?.fieldArea || '1'} {soil?.areaUnit || (lang === 'hi' ? 'एकड़' : 'Acre')}</span>
            </div>
            {report.sprayWaterLitres && (
              <div className="text-xs text-blue-300 font-mono">
                {t.sprayWaterWord} {report.sprayWaterLitres}L ({report.sprayTanks || 1} {t.sprayTanksWord})
              </div>
            )}
          </div>
        </div>

        {/* 2. Soil Health Parameters (If provided) */}
        {soil && (soil.ph || soil.n || soil.p || soil.k || soil.oc || soil.ec || soil.zinc || soil.iron || soil.sulphur || soil.boron) && (
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>{t.soilHealthCardTitle}</span>
              </div>
              {soil.filledVia && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {t.soilSource} {soil.filledVia === 'pdf_upload' ? t.soilSourcePdf : t.soilSourceManual}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
              {soil.ph && (
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                  <div className="text-[10px] text-slate-400">{t.phLabel}</div>
                  <div className="font-bold text-emerald-300 text-sm">{soil.ph}</div>
                </div>
              )}
              {soil.n && (
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                  <div className="text-[10px] text-slate-400">{t.nLabel}</div>
                  <div className="font-bold text-white text-sm">{soil.n} <span className="text-[10px] text-slate-400 font-normal">kg/ha</span></div>
                </div>
              )}
              {soil.p && (
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                  <div className="text-[10px] text-slate-400">{t.pLabel}</div>
                  <div className="font-bold text-white text-sm">{soil.p} <span className="text-[10px] text-slate-400 font-normal">kg/ha</span></div>
                </div>
              )}
              {soil.k && (
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                  <div className="text-[10px] text-slate-400">{t.kLabel}</div>
                  <div className="font-bold text-white text-sm">{soil.k} <span className="text-[10px] text-slate-400 font-normal">kg/ha</span></div>
                </div>
              )}
              {soil.oc && (
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                  <div className="text-[10px] text-slate-400">{t.ocLabel}</div>
                  <div className="font-bold text-white text-sm">{soil.oc}%</div>
                </div>
              )}
              {soil.ec && (
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                  <div className="text-[10px] text-slate-400">{t.ecLabel}</div>
                  <div className="font-bold text-white text-sm">{soil.ec} <span className="text-[10px] text-slate-400 font-normal">dS/m</span></div>
                </div>
              )}
            </div>

            {/* Micronutrients summary */}
            {(soil.zinc || soil.iron || soil.sulphur || soil.boron || soil.copper || soil.manganese) && (
              <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 flex flex-wrap gap-x-4 gap-y-1">
                <span className="font-semibold text-slate-400">{lang === 'hi' ? 'सूक्ष्म पोषक:' : 'Micronutrients:'}</span>
                {soil.zinc && <span>{lang === 'hi' ? 'जिंक (Zn)' : 'Zinc (Zn)'}: <strong>{soil.zinc} ppm</strong></span>}
                {soil.iron && <span>{lang === 'hi' ? 'लोहा (Fe)' : 'Iron (Fe)'}: <strong>{soil.iron} ppm</strong></span>}
                {soil.sulphur && <span>{lang === 'hi' ? 'सल्फर (S)' : 'Sulphur (S)'}: <strong>{soil.sulphur} ppm</strong></span>}
                {soil.boron && <span>{lang === 'hi' ? 'बोरॉन (B)' : 'Boron (B)'}: <strong>{soil.boron} ppm</strong></span>}
                {soil.copper && <span>{lang === 'hi' ? 'तांबा (Cu)' : 'Copper (Cu)'}: <strong>{soil.copper} ppm</strong></span>}
                {soil.manganese && <span>{lang === 'hi' ? 'मैंगनीज (Mn)' : 'Manganese (Mn)'}: <strong>{soil.manganese} ppm</strong></span>}
              </div>
            )}
          </div>
        )}

        {/* 3. Prescribed Treatment & Medication */}
        <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.prescriptionTitle}</span>
          </div>
          <div className="text-sm text-slate-100 leading-relaxed font-sans">
            {report.treatmentDosage}
          </div>
        </div>

        {/* 4. Precautions & Soil Amendment */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.soilAmendmentsTitle}</span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            {report.precautions}
          </div>
        </div>

        {/* Direct Text Output Box (if raw format is available) */}
        {report.rawFormattedOutput && (
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
            {report.rawFormattedOutput}
          </div>
        )}
      </div>

      {/* Footer Stamp */}
      <div className="bg-slate-950 px-4 sm:px-6 py-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>{t.slipFooterGov}</span>
        <span>{t.savedToHistoryBadge}</span>
      </div>
    </div>
  );
};
