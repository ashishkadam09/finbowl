import React, { useState } from 'react';
import { X, FileSpreadsheet, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (count: number) => void;
}

export const ImportExcelModal: React.FC<ImportExcelModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSimulatedUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onImportComplete(3); // Adds 3 records
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full z-10 overflow-hidden border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Import Excel Data</h3>
              <p className="text-xs text-gray-500">Upload bulk disbursement batch (.xlsx, .csv)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
              isDragging ? 'border-purple-500 bg-purple-50/50' : 'border-gray-200 hover:border-purple-300 bg-gray-50/30'
            }`}
          >
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileInput}
              className="hidden"
              id="excel-file-input"
            />
            <label htmlFor="excel-file-input" className="cursor-pointer space-y-2 block">
              <UploadCloud className="w-10 h-10 text-purple-600 mx-auto" />
              <p className="font-semibold text-gray-800 text-sm">
                {fileName ? fileName : 'Drag & drop Excel file here'}
              </p>
              <p className="text-gray-400 text-xs">or click to browse from computer</p>
            </label>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <p className="text-purple-900 text-[11px] leading-relaxed">
              Required columns: <strong>Loan ID, Disbursement Date, Applicant Name, Bank Name, Sanctioned Amount</strong>.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={!fileName || uploading}
              onClick={handleSimulatedUpload}
              className={`px-5 py-2 font-medium rounded-lg shadow-sm transition flex items-center gap-2 ${
                fileName && !uploading
                  ? 'bg-[#635bff] text-white hover:bg-[#5248e8]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {uploading ? 'Processing...' : 'Process Import'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
