/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { MetricsCards } from './components/MetricsCards';
import { DisbursementTable } from './components/DisbursementTable';
import { Pagination } from './components/Pagination';
import { AddDisbursementModal } from './components/AddDisbursementModal';
import { DisbursementDetailDrawer } from './components/DisbursementDetailDrawer';
import { ActivityDrawer } from './components/ActivityDrawer';
import { ImportExcelModal } from './components/ImportExcelModal';
import {
  INITIAL_DISBURSEMENTS,
  INITIAL_ACTIVITY_LOGS
} from './data/mockDisbursements';
import { DisbursementRecord, ActivityLog } from './types';
import {
  History,
  Download,
  Plus,
  ChevronDown,
  LayoutDashboard,
  Receipt,
  FileCheck2,
  BarChart3
} from 'lucide-react';

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Disbursement');

  // Data state
  const [records, setRecords] = useState<DisbursementRecord[]>(INITIAL_DISBURSEMENTS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  // Modals / Drawers state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DisbursementRecord | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handlers
  const handleAddRecord = (newRecord: DisbursementRecord) => {
    setRecords(prev => [newRecord, ...prev]);

    // Add activity log
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      timestamp: 'Just now',
      user: 'Radhika Mehta',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      action: `Created ${newRecord.status}`,
      targetLoanId: newRecord.loanId,
      details: `Added new loan disbursement for ${newRecord.bankName} (₹${newRecord.sanctionedAmt})`,
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const handleImportComplete = (count: number) => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const batchRecords: DisbursementRecord[] = Array.from({ length: count }).map((_, idx) => ({
      id: (Date.now() + idx).toString(),
      disbursementDate: formattedDate,
      loanId: `LN0${Math.floor(15 + Math.random() * 80)}-24-10${idx + 20}`,
      status: 'Submitted',
      applicantName: ['Vijay Mallya', 'Sunita Rao', 'Kishore Biyani'][idx % 3],
      bankName: ['Federal Bank', 'Bandhan Bank', 'South Indian Bank'][idx % 3],
      sanctionedAmt: (idx + 1) * 35000,
      verifiedAmt: null,
      referralPct: 0.005,
      creditExecutive: {
        name: 'Arjun Mehta',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      bankExecutive: {
        name: 'Tanvi M',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
    }));

    setRecords(prev => [...batchRecords, ...prev]);
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden font-sans antialiased text-gray-900">
      {/* Sidebar Component */}
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <TopHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Dynamic Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-5">
          {activeTab === 'Disbursement' ? (
            <>
              {/* Page Title & Top Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight font-sans">
                    Disbursement
                  </h1>
                  <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                    <span>RMS</span>
                    <span>&gt;</span>
                    <span className="text-purple-700 font-medium">Disbursement</span>
                  </nav>
                </div>

                {/* Header Action Buttons (Matching Screenshot) */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Activity Button */}
                  <button
                    onClick={() => setActivityDrawerOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none shadow-2xs transition"
                  >
                    <History className="w-3.5 h-3.5 text-gray-500" />
                    <span>Activity</span>
                  </button>

                  {/* Import Excel Button */}
                  <button
                    onClick={() => setImportModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none shadow-2xs transition"
                  >
                    <Download className="w-3.5 h-3.5 text-gray-500" />
                    <span>Import Excel</span>
                  </button>

                  {/* Add Disbursement Primary Action */}
                  <div className="relative inline-flex">
                    <button
                      onClick={() => setAddModalOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#635bff] hover:bg-[#5248e8] text-white text-xs font-semibold rounded-lg shadow-sm transition"
                    >
                      <span>Add Disbursement</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-80 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 6 Summary Metric Cards */}
              <MetricsCards records={records} />

              {/* Disbursement Main Data Table */}
              <div className="space-y-0">
                <DisbursementTable
                  records={records}
                  onSelectRecord={(rec) => setSelectedRecord(rec)}
                />

                {/* Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  rowsPerPage={rowsPerPage}
                  onPageChange={(p) => setCurrentPage(p)}
                  onRowsPerPageChange={(r) => setRowsPerPage(r)}
                />
              </div>
            </>
          ) : (
            /* Fallback view for other sidebar tab selections */
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-4 shadow-2xs my-8">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{activeTab} Module</h2>
              <p className="text-gray-500 text-xs max-w-md mx-auto">
                You are currently viewing the {activeTab} section under FinBowl Risk Management System.
              </p>
              <button
                onClick={() => setActiveTab('Disbursement')}
                className="px-4 py-2 bg-[#635bff] text-white font-medium text-xs rounded-lg shadow-xs hover:bg-[#5248e8] transition"
              >
                Return to Disbursement
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Slide-over Drawers & Modals */}
      <AddDisbursementModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddRecord}
      />

      <ImportExcelModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImportComplete={handleImportComplete}
      />

      <ActivityDrawer
        isOpen={activityDrawerOpen}
        onClose={() => setActivityDrawerOpen(false)}
        logs={activityLogs}
      />

      <DisbursementDetailDrawer
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
}
