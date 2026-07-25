import React from 'react';
import { X, Building2, User, CreditCard, ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { DisbursementRecord } from '../types';

interface DisbursementDetailDrawerProps {
  record: DisbursementRecord | null;
  onClose: () => void;
}

export const DisbursementDetailDrawer: React.FC<DisbursementDetailDrawerProps> = ({
  record,
  onClose,
}) => {
  if (!record) return null;

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Submitted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Verified':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Audited':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/60">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">{record.loanId}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(record.status)}`}>
                  • {record.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Disbursement record details</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-gray-700">
            {/* Applicant Summary */}
            <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Applicant Name</span>
                <span className="font-bold text-gray-900 text-sm">{record.applicantName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Bank Partner</span>
                <span className="font-semibold text-purple-900">{record.bankName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Disbursement Date</span>
                <span className="font-medium text-gray-800">{record.disbursementDate}</span>
              </div>
            </div>

            {/* Financial Overview */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-xs tracking-wider uppercase flex items-center gap-1.5 text-purple-800">
                <CreditCard className="w-4 h-4" />
                Financial Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-gray-200 bg-gray-50/50">
                  <p className="text-gray-500 text-[11px]">Sanctioned Amount</p>
                  <p className="font-bold text-gray-900 text-sm mt-0.5">
                    ₹{record.sanctionedAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 bg-gray-50/50">
                  <p className="text-gray-500 text-[11px]">Verified Amount</p>
                  <p className="font-bold text-emerald-700 text-sm mt-0.5">
                    {record.verifiedAmt !== null
                      ? `₹${record.verifiedAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                      : '--'}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 bg-gray-50/50 flex items-center justify-between">
                <span className="text-gray-500">Referral Percentage</span>
                <span className="font-semibold text-gray-900 text-sm">
                  {(record.referralPct * 100).toFixed(4)}%
                </span>
              </div>
            </div>

            {/* Assigned Executives */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-xs tracking-wider uppercase flex items-center gap-1.5 text-purple-800">
                <User className="w-4 h-4" />
                Assigned Executives
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={record.creditExecutive.avatar}
                      alt={record.creditExecutive.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{record.creditExecutive.name}</p>
                      <p className="text-[10px] text-gray-500">Credit Executive</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-medium">Assigned</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={record.bankExecutive.avatar}
                      alt={record.bankExecutive.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{record.bankExecutive.name}</p>
                      <p className="text-[10px] text-gray-500">Bank Nodal Officer</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-medium">Verified</span>
                </div>
              </div>
            </div>

            {/* Audit Status & Notes */}
            {record.notes && (
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-xs tracking-wider uppercase flex items-center gap-1.5 text-purple-800">
                  <FileText className="w-4 h-4" />
                  Compliance Notes
                </h3>
                <p className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 leading-relaxed">
                  {record.notes}
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white transition"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-[#635bff] hover:bg-[#5248e8] text-white font-medium rounded-lg shadow-sm transition">
              Edit Disbursement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
