export interface Texts {
  pageTitle: string;
  eyebrow: string;
  appTitle: string;
  themeToggle: string;
  heroTitle: string;
  heroDescriptionBefore: string;
  heroDescriptionAfter: string;
  dropTitle: string;
  dropSubtitle: string;
  pyGuidTitle: string;
  columnsToRemoveLabel: string;
  pyGuidDescription: string;
  cleanButton: string;
  clearButton: string;
  downloadButton: string;
  filesEyebrow: string;
  filesTitle: string;
  emptyState: string;
  footer: string;
  processing: string;
  csvBadge: string;
  removeFile: string;
  invalidCsv: string;
  processedOne: string;
  processedMany: string;
  removedOne: string;
  removedMany: string;
  zipName: string;
  bytes: string;
  kilobytes: string;
  megabytes: string;
}

export const TEXTS: Texts = Object.freeze({
  pageTitle: 'Limpiador CSV',
  eyebrow: 'Herramienta de datos',
  appTitle: 'Limpiador CSV PEGA System',
  themeToggle: 'Alternar tema',
  heroTitle: 'Preparar archivos CSV',
  heroDescriptionBefore: 'Carga uno o varios archivos. La herramienta eliminará las columnas cuyo encabezado comience con',
  heroDescriptionAfter: ', sin distinguir mayúsculas.',
  dropTitle: 'Arrastra tus CSV aquí',
  dropSubtitle: 'o haz clic para seleccionar varios archivos',
  pyGuidTitle: 'Eliminar columnas pyGUID, pyLabel y pyBoolFlag',
  columnsToRemoveLabel: 'Columnas adicionales a eliminar',
  pyGuidDescription: 'Activado por defecto y sin sensibilidad a mayúsculas.',
  cleanButton: 'Limpiar archivos',
  clearButton: 'Limpiar lista',
  downloadButton: 'Descargar resultado',
  filesEyebrow: 'Archivos',
  filesTitle: 'Archivos seleccionados',
  emptyState: 'Aún no hay archivos',
  footer: 'Procesamiento directo en el navegador · Se conserva el delimitador y se retiran las marcas de fecha del nombre de salida.',
  processing: 'Procesando…',
  csvBadge: 'CSV',
  removeFile: 'Quitar',
  invalidCsv: 'CSV vacío o inválido',
  processedOne: 'archivo procesado',
  processedMany: 'archivos procesados',
  removedOne: 'columna eliminada',
  removedMany: 'columnas eliminadas',
  zipName: 'CSV_Cleaned.zip',
  bytes: 'B',
  kilobytes: 'KB',
  megabytes: 'MB',
});

export interface Settings {
  systemPrefix: string;
  optionalExactColumns: readonly string[];
}

export const SETTINGS: Settings = Object.freeze({
  systemPrefix: 'px',
  optionalExactColumns: ['pyGUID', 'pyLabel', 'pyBoolFlag'],
});
