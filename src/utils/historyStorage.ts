export interface SoilReportDetails {
  fieldArea?: string;
  areaUnit?: string;
  soilQuality?: string;
  ph?: string;
  n?: string;
  p?: string;
  k?: string;
  oc?: string;
  ec?: string;
  zinc?: string;
  iron?: string;
  sulphur?: string;
  boron?: string;
  copper?: string;
  manganese?: string;
  filledVia?: 'manual' | 'pdf_upload';
}

export interface UnifiedAgriReport {
  id: string;
  timestamp: number;
  dateStr: string;
  reportType: 'leaf_scan' | 'soil_dosage' | 'registry' | 'comprehensive';
  cropName: string;
  diseaseName: string;
  imageThumbnail?: string;
  soilData?: SoilReportDetails;
  sprayWaterLitres?: number;
  sprayTanks?: number;
  treatmentDosage: string;
  fertilizerNPK?: string;
  precautions: string;
  rawFormattedOutput: string;
}

const STORAGE_KEY = 'agri_diagnostic_unified_reports_v1';

export function getStoredReports(): UnifiedAgriReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load reports from localStorage', err);
    return [];
  }
}

export function saveUnifiedReport(report: Omit<UnifiedAgriReport, 'id' | 'timestamp' | 'dateStr'>): UnifiedAgriReport {
  try {
    const reports = getStoredReports();
    const now = new Date();
    const dateStr = now.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newReport: UnifiedAgriReport = {
      ...report,
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      dateStr
    };

    // Keep up to 50 latest reports
    const updated = [newReport, ...reports.slice(0, 49)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newReport;
  } catch (err) {
    console.error('Failed to save report to localStorage', err);
    return {
      ...report,
      id: `rep_${Date.now()}`,
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString()
    };
  }
}

export function deleteReportById(id: string): UnifiedAgriReport[] {
  try {
    const reports = getStoredReports().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    return reports;
  } catch (err) {
    console.error('Failed to delete report', err);
    return [];
  }
}

export function clearAllStoredReports(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear reports', err);
  }
}
