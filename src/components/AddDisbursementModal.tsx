import React, { useState } from 'react';
import { X, Plus, Calendar, Building, Landmark, DollarSign } from 'lucide-react';
import { DisbursementRecord, DisbursementStatus } from '../types';

interface AddDisbursementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newRecord: DisbursementRecord) => void;
}

export const AddDisbursementModal: React.FC<AddDisbursementModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [loanId, setLoanId] = useState(`LN0${Math.floor(11 + Math.random() * 89)}-24-100${Math.floor(Math.random() * 10)}`);
  const [applicantName, setApplicantName] = useState('');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [sanctionedAmt, setSanctionedAmt] = useState('50000');
  const [referralPct, setReferralPct] = useState('0.50');
  const [status, setStatus] = useState<DisbursementStatus>('Draft');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim()) return;

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const newRecord: DisbursementRecord = {
      id: Date.now().toString(),
      disbursementDate: formattedDate,
      loanId: loanId,
      status: status,
      applicantName: applicantName,
      bankName: bankName,
      sanctionedAmt: parseFloat(sanctionedAmt) || 0,
      verifiedAmt: status === 'Verified' || status === 'Audited' ? (parseFloat(sanctionedAmt) * 12) : null,
      referralPct: (parseFloat(referralPct) || 0) / 100,
      creditExecutive: {
        name: 'Arjun Mehta',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      bankExecutive: {
        name: 'Siddharth V',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      notes: 'New disbursement record created.',
    };

    onAdd(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full z-10 overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Add New Disbursement</h3>
              <p className="text-xs text-gray-500">Create a new loan disbursement entry</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Loan ID</label>
              <input
                type="text"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DisbursementStatus)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Verified">Verified</option>
                <option value="Audited">Audited</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Applicant Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Bank Name</label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
                <option value="Canara Bank">Canara Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Sanctioned Amount (₹)</label>
              <input
                type="number"
                value={sanctionedAmt}
                onChange={(e) => setSanctionedAmt(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Referral Percentage (%)</label>
            <input
              type="number"
              step="0.01"
              value={referralPct}
              onChange={(e) => setReferralPct(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#635bff] hover:bg-[#5248e8] text-white font-medium rounded-lg shadow-sm transition"
            >
              Save Disbursement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
