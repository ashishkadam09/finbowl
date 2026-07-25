import React, { useState } from 'react';
import {
  LayoutDashboard,
  Landmark,
  TrendingUp,
  FolderGit2,
  ShieldCheck,
  Store,
  Sparkles,
  FileText,
  Search,
  ChevronDown,
  ChevronRight,
  Receipt,
  FileCheck2,
  BarChart3,
  X,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenMobile,
  onCloseMobile,
  activeTab,
  setActiveTab,
}) => {
  const [rmsOpen, setRmsOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [vendorsOpen, setVendorsOpen] = useState(false);
  const [aiSuiteOpen, setAiSuiteOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#3a2c7b] text-purple-100 w-64 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-purple-900/40">
        <div className="flex items-center gap-3">
          {/* Logo icon matching FinBowl layered geometric bowl */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-400 to-indigo-200 flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-[#3a2c7b]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5l5 4.5h-2v5H9v-5H7l5-4.5z"/>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans">
            FinBowl
          </span>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden text-purple-200 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input inside Sidebar */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-purple-300/70" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#2d2162] hover:bg-[#32256c] text-sm text-white placeholder-purple-300/60 pl-9 pr-3 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 transition"
          />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 text-sm font-medium py-2 custom-scrollbar">
        {/* Main Dashboard */}
        <button
          onClick={() => setActiveTab('Dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition ${
            activeTab === 'Dashboard'
              ? 'bg-[#52419c] text-white shadow-xs'
              : 'text-purple-200 hover:bg-[#45358c] hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        {/* Finance Group */}
        <div>
          <button
            onClick={() => setFinanceOpen(!financeOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-purple-200 hover:bg-[#45358c] hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <Landmark className="w-4 h-4" />
              <span>Finance</span>
            </div>
            {financeOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-purple-300/60" />}
          </button>
          {financeOpen && (
            <div className="pl-9 pr-2 py-1 space-y-1 text-xs">
              <button className="w-full text-left py-1 text-purple-200 hover:text-white">Accounts Payable</button>
              <button className="w-full text-left py-1 text-purple-200 hover:text-white">General Ledger</button>
            </div>
          )}
        </div>

        {/* Sales CRM Group */}
        <div>
          <button
            onClick={() => setSalesOpen(!salesOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-purple-200 hover:bg-[#45358c] hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4" />
              <span>Sales CRM</span>
            </div>
            {salesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-purple-300/60" />}
          </button>
        </div>

        {/* RMS Expanded Section (Matching Image) */}
        <div>
          <button
            onClick={() => setRmsOpen(!rmsOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-purple-200 hover:bg-[#45358c] hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <FolderGit2 className="w-4 h-4" />
              <span>RMS</span>
            </div>
            {rmsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-purple-300/60" />}
          </button>

          {rmsOpen && (
            <div className="pl-6 pr-2 py-1 space-y-1 my-1 border-l border-purple-500/20 ml-5">
              <button
                onClick={() => setActiveTab('RMS Dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition ${
                  activeTab === 'RMS Dashboard'
                    ? 'bg-[#52419c] text-white font-medium'
                    : 'text-purple-200 hover:bg-[#45358c] hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('Disbursement')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-semibold transition ${
                  activeTab === 'Disbursement'
                    ? 'bg-[#52419c] text-white shadow-xs'
                    : 'text-purple-200 hover:bg-[#45358c] hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Disbursement</span>
              </button>

              <button
                onClick={() => setActiveTab('Invoices')}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition ${
                  activeTab === 'Invoices'
                    ? 'bg-[#52419c] text-white'
                    : 'text-purple-200 hover:bg-[#45358c] hover:text-white'
                }`}
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>Invoices</span>
              </button>

              <button
                onClick={() => setActiveTab('PO')}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition ${
                  activeTab === 'PO'
                    ? 'bg-[#52419c] text-white'
                    : 'text-purple-200 hover:bg-[#45358c] hover:text-white'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>PO</span>
              </button>

              <button
                onClick={() => setActiveTab('RMS Reports')}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition ${
                  activeTab === 'RMS Reports'
                    ? 'bg-[#52419c] text-white'
                    : 'text-purple-200 hover:bg-[#45358c] hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>RMS Reports</span>
              </button>
            </div>
          )}
        </div>

        {/* Other Sections */}
        <div>
          <button
            onClick={() => setComplianceOpen(!complianceOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-purple-200 hover:bg-[#45358c] hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Compliance</span>
            </div>
            {complianceOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-purple-300/60" />}
          </button>
        </div>

        <div>
          <button
            onClick={() => setVendorsOpen(!vendorsOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-purple-200 hover:bg-[#45358c] hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <Store className="w-4 h-4" />
              <span>Vendors</span>
            </div>
            {vendorsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-purple-300/60" />}
          </button>
        </div>

        <div>
          <button
            onClick={() => setAiSuiteOpen(!aiSuiteOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-purple-200 hover:bg-[#45358c] hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Suite</span>
            </div>
            {aiSuiteOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-purple-300/60" />}
          </button>
        </div>

        <div>
          <button
            onClick={() => setReportsOpen(!reportsOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-purple-200 hover:bg-[#45358c] hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </div>
            {reportsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-purple-300/60" />}
          </button>
        </div>
      </div>

      {/* Sidebar Footer Badge */}
      <div className="p-4 border-t border-purple-900/30">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#52419c] text-purple-200 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Version 1.0
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 max-w-xs w-full bg-[#3a2c7b] z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
