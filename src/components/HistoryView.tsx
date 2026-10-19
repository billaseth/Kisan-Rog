import React, { useState } from 'react';
import {
  History,
  Trash2,
  Calendar,
  Leaf,
  FlaskConical,
  Eye,
  ArrowRight,
  Search,
  Download,
  AlertCircle
} from 'lucide-react';
import { UnifiedAgriReport, deleteReportById, clearAllStoredReports } from '../utils/historyStorage';
import { UnifiedReportCard } from './UnifiedReportCard';
import { TRANSLATIONS, Language } from '../utils/translations';

interface HistoryViewProps {
  reports: UnifiedAgriReport[];
  lang?: Language;
  onRefreshReports: () => void;
  onLoadIntoForm: (report: UnifiedAgriReport) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  reports,
  lang = 'hi',
  onRefreshReports,
  onLoadIntoForm
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState<UnifiedAgriReport | null>(null);
  const t = TRANSLATIONS[lang];

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteReportById(id);
    onRefreshReports();
    if (selectedReport?.id === id) {
      setSelectedReport(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm(t.confirmClearHistory)) {
      clearAllStoredReports();
      onRefreshReports();
      setSelectedReport(null);
    }
  };

  const filtered = reports.filter(r => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      r.cropName.toLowerCase().includes(q) ||
      r.diseaseName.toLowerCase().includes(q) ||
      r.dateStr.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder={t.searchHistoryPlaceholder}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
          <span className="text-slate-400">
            {t.totalReports} <strong className="text-emerald-400">{reports.length}</strong>
          </span>
          {reports.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-2.5 py-1.5 bg-red-950/60 hover:bg-red-900/80 border border-red-700/60 text-red-300 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearHistory}</span>
            </button>
          )}
        </div>
      </div>

      {/* Selected Report Modal / Expanded View */}
      {selectedReport && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {t.selectedReportTitle}
            </span>
            <button
              onClick={() => setSelectedReport(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              {t.backToList}
            </button>
          </div>
          <UnifiedReportCard
            report={selectedReport}
            lang={lang}
            isHistorical={true}
            onLoadIntoForm={onLoadIntoForm}
            onClose={() => setSelectedReport(null)}
          />
        </div>
      )}

      {/* List of Reports */}
      {!selectedReport && (
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
              <History className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">
                {t.noHistoryYet}
              </div>
              <div className="text-xs text-slate-500 max-w-md mx-auto">
                {t.noHistoryDesc}
              </div>
            </div>
          ) : (
            filtered.map(rep => (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className="p-3.5 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-600/60 rounded-xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  {rep.imageThumbnail ? (
                    <img
                      src={rep.imageThumbnail}
                      alt="Thumbnail"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <Leaf className="w-6 h-6" />
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {rep.cropName}
                      </span>
                      <span className="text-xs text-amber-400 font-medium">
                        • {rep.diseaseName}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {rep.dateStr}
                      </span>
                      {rep.soilData?.fieldArea && (
                        <span className="text-[11px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                          {rep.soilData.fieldArea} {rep.soilData.areaUnit || (lang === 'hi' ? 'एकड़' : 'Acre')}
                        </span>
                      )}
                      {rep.soilData?.ph && (
                        <span className="text-[11px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.5 rounded font-mono">
                          pH: {rep.soilData.ph}
                        </span>
                      )}
                      {rep.soilData?.filledVia && (
                        <span className="text-[10px] text-slate-500">
                          ({rep.soilData.filledVia === 'pdf_upload' ? 'PDF' : 'Manual'})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto no-print">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      onLoadIntoForm(rep);
                    }}
                    className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-blue-900/60 border border-slate-700 hover:border-blue-600 text-slate-300 hover:text-blue-200 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>{t.loadIntoFormBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedReport(rep)}
                    className="px-2.5 py-1 text-xs bg-emerald-950/70 hover:bg-emerald-800/80 border border-emerald-700/60 text-emerald-300 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.viewReportBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={e => handleDelete(rep.id, e)}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/50 rounded-lg transition-colors"
                    title={t.deleteReportBtn}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
