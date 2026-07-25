import React, { useState, useRef, useEffect } from 'react';
import {
  DisbursementRecord,
  DisbursementStatus,
  ColumnConfig,
  TableColumnId
} from '../types';
import {
  Search,
  ArrowUpDown,
  Filter,
  ChevronDown,
  Download,
  Check,
  Eye,
  Trash2,
  Share2,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { ColumnToggleDropdown } from './ColumnToggleDropdown';

interface DisbursementTableProps {
  records: DisbursementRecord[];
  onSelectRecord: (record: DisbursementRecord) => void;
  onDeleteRecord?: (id: string) => void;
}

export const DisbursementTable: React.FC<DisbursementTableProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [savedView, setSavedView] = useState('Default View');
  const [savedViewOpen, setSavedViewOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  
  // Status filter state
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [bankFilter, setBankFilter] = useState<string>('All');

  // Sort state
  const [sortColumn, setSortColumn] = useState<TableColumnId>('disbursementDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Column Visibility Config
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'disbursementDate', label: 'Disbursement Date', sortable: true, filterable: false, visible: true },
    { id: 'loanId', label: 'Loan ID', sortable: true, filterable: true, visible: true },
    { id: 'status', label: 'Status', sortable: true, filterable: true, visible: true },
    { id: 'applicantName', label: 'Applicant Name', sortable: true, filterable: true, visible: true },
    { id: 'bankName', label: 'Bank Name', sortable: true, filterable: true, visible: true },
    { id: 'sanctionedAmt', label: 'Sanctioned Amt', sortable: true, filterable: true, visible: true },
    { id: 'verifiedAmt', label: 'Verified', sortable: true, filterable: true, visible: true },
    { id: 'referralPct', label: 'Referral %', sortable: true, filterable: true, visible: true },
    { id: 'creditExecutive', label: 'Credit Executive', sortable: true, filterable: false, visible: true },
    { id: 'bankExecutive', label: 'Bank Executive', sortable: false, filterable: false, visible: true },
  ]);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleColumnVisibility = (id: string) => {
    setColumns(prev =>
      prev.map(col => (col.id === id ? { ...col, visible: !col.visible } : col))
    );
  };

  const isColumnVisible = (id: TableColumnId) => {
    const found = columns.find(c => c.id === id);
    return found ? found.visible : true;
  };

  // Toggle selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredRecords.map(r => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Sort handler
  const handleSort = (columnId: TableColumnId) => {
    if (sortColumn === columnId) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  // Filter logic
  const filteredRecords = records.filter(item => {
    const matchesSearch =
      item.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bankName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesBank = bankFilter === 'All' || item.bankName === bankFilter;

    return matchesSearch && matchesStatus && matchesBank;
  });

  // Sort logic
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let aVal: any = a[sortColumn];
    let bVal: any = b[sortColumn];

    if (sortColumn === 'creditExecutive') {
      aVal = a.creditExecutive.name;
      bVal = b.creditExecutive.name;
    }

    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    if (typeof aVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  // Export CSV Helper
  const handleExportCSV = () => {
    const headers = ['Disbursement Date', 'Loan ID', 'Status', 'Applicant Name', 'Bank Name', 'Sanctioned Amt', 'Verified Amt', 'Referral %'];
    const rows = sortedRecords.map(r => [
      r.disbursementDate,
      r.loanId,
      r.status,
      `"${r.applicantName}"`,
      `"${r.bankName}"`,
      r.sanctionedAmt,
      r.verifiedAmt || '--',
      `${(r.referralPct * 100).toFixed(4)}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Disbursements_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportOpen(false);
  };

  const renderBadge = (status: DisbursementStatus) => {
    switch (status) {
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Draft
          </span>
        );
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Submitted
          </span>
        );
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            Verified
          </span>
        );
      case 'Audited':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
            Audited
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
      {/* Table Header Filter & Search Toolbar */}
      <div className="p-3.5 sm:p-4 border-b border-gray-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white">
        {/* Search Input Box with Cmd+K Badge */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for Disbursement"
            className="w-full pl-9 pr-12 py-1.5 border border-gray-200 rounded-lg text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
          <kbd className="absolute right-2.5 top-2 px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded">
            ⌘K
          </kbd>
        </div>

        {/* Saved View & Export All Buttons */}
        <div className="flex items-center gap-2.5 justify-end">
          {/* Saved View Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setSavedViewOpen(!savedViewOpen);
                setExportOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition"
            >
              <span>Saved View</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {savedViewOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1 text-xs">
                {['Default View', 'All Pending Approval', 'Verified & Audited', 'Draft Records'].map((view) => (
                  <button
                    key={view}
                    onClick={() => {
                      setSavedView(view);
                      setSavedViewOpen(false);
                      if (view === 'All Pending Approval') setStatusFilter('Submitted');
                      else if (view === 'Verified & Audited') setStatusFilter('Verified');
                      else if (view === 'Draft Records') setStatusFilter('Draft');
                      else setStatusFilter('All');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-purple-50 text-gray-700"
                  >
                    <span>{view}</span>
                    {savedView === view && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export All Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setExportOpen(!exportOpen);
                setSavedViewOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition"
            >
              <span>Export All</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {exportOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1 text-xs">
                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-purple-50 text-gray-700"
                >
                  <Download className="w-3.5 h-3.5 text-purple-600" />
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={() => {
                    alert('Preparing Excel document export...');
                    setExportOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-purple-50 text-gray-700"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Export Excel Sheet</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar when rows are selected */}
      {selectedIds.length > 0 && (
        <div className="px-4 py-2 bg-purple-50 border-b border-purple-200 flex items-center justify-between text-xs text-purple-900 font-medium">
          <span>{selectedIds.length} row(s) selected</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1 hover:text-purple-700"
            >
              <Download className="w-3.5 h-3.5" />
              Export Selected
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-gray-500 hover:text-gray-700"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Main Responsive Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider select-none">
              {/* Checkbox Column */}
              <th className="py-3 px-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredRecords.length && filteredRecords.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
              </th>

              {/* Disbursement Date */}
              {isColumnVisible('disbursementDate') && (
                <th
                  onClick={() => handleSort('disbursementDate')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Disbursement Date</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Loan ID */}
              {isColumnVisible('loanId') && (
                <th
                  onClick={() => handleSort('loanId')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Loan ID</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <Filter className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Status */}
              {isColumnVisible('status') && (
                <th
                  onClick={() => handleSort('status')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <Filter className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Applicant Name */}
              {isColumnVisible('applicantName') && (
                <th
                  onClick={() => handleSort('applicantName')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Applicant Name</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <Filter className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Bank Name */}
              {isColumnVisible('bankName') && (
                <th
                  onClick={() => handleSort('bankName')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Bank Name</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <Filter className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Sanctioned Amt */}
              {isColumnVisible('sanctionedAmt') && (
                <th
                  onClick={() => handleSort('sanctionedAmt')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Sanctioned Amt</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <Filter className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Verified */}
              {isColumnVisible('verifiedAmt') && (
                <th
                  onClick={() => handleSort('verifiedAmt')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Verified</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <Filter className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Referral % */}
              {isColumnVisible('referralPct') && (
                <th
                  onClick={() => handleSort('referralPct')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Referral %</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <Filter className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Credit Executive */}
              {isColumnVisible('creditExecutive') && (
                <th
                  onClick={() => handleSort('creditExecutive')}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100/80 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Credit Executive</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Bank Executive */}
              {isColumnVisible('bankExecutive') && (
                <th className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <span>Bank...</span>
                  </div>
                </th>
              )}

              {/* Column Customizer Toggle Header */}
              <th className="py-3 px-2 text-center w-8">
                <ColumnToggleDropdown
                  columns={columns}
                  onToggleColumn={toggleColumnVisibility}
                />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {sortedRecords.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-12 text-center text-gray-400">
                  No disbursement records matching your query.
                </td>
              </tr>
            ) : (
              sortedRecords.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-purple-50/30 transition-colors ${
                      isSelected ? 'bg-purple-50/50' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(row.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                    </td>

                    {/* Date */}
                    {isColumnVisible('disbursementDate') && (
                      <td className="py-3 px-3 text-gray-600 font-normal whitespace-nowrap">
                        {row.disbursementDate}
                      </td>
                    )}

                    {/* Loan ID Link */}
                    {isColumnVisible('loanId') && (
                      <td className="py-3 px-3 font-medium whitespace-nowrap">
                        <button
                          onClick={() => onSelectRecord(row)}
                          className="text-[#6253e1] hover:text-[#4d3ecc] font-semibold hover:underline focus:outline-none"
                        >
                          {row.loanId}
                        </button>
                      </td>
                    )}

                    {/* Status Badge */}
                    {isColumnVisible('status') && (
                      <td className="py-3 px-3 whitespace-nowrap">
                        {renderBadge(row.status)}
                      </td>
                    )}

                    {/* Applicant Name */}
                    {isColumnVisible('applicantName') && (
                      <td className="py-3 px-3 font-semibold text-gray-900 whitespace-nowrap">
                        {row.applicantName}
                      </td>
                    )}

                    {/* Bank Name */}
                    {isColumnVisible('bankName') && (
                      <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                        {row.bankName}
                      </td>
                    )}

                    {/* Sanctioned Amount */}
                    {isColumnVisible('sanctionedAmt') && (
                      <td className="py-3 px-3 text-gray-800 font-medium text-right whitespace-nowrap">
                        {row.sanctionedAmt.toFixed(2)}
                      </td>
                    )}

                    {/* Verified Amount */}
                    {isColumnVisible('verifiedAmt') && (
                      <td className="py-3 px-3 text-gray-800 font-medium text-right whitespace-nowrap">
                        {row.verifiedAmt !== null
                          ? `₹${row.verifiedAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                          : '--'}
                      </td>
                    )}

                    {/* Referral % */}
                    {isColumnVisible('referralPct') && (
                      <td className="py-3 px-3 text-gray-700 text-right whitespace-nowrap">
                        {(row.referralPct * 100).toFixed(4)}%
                      </td>
                    )}

                    {/* Credit Executive Avatar + Name */}
                    {isColumnVisible('creditExecutive') && (
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={row.creditExecutive.avatar}
                            alt={row.creditExecutive.name}
                            className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-200"
                          />
                          <span className="text-gray-800 font-medium">{row.creditExecutive.name}</span>
                        </div>
                      </td>
                    )}

                    {/* Bank Executive Avatar + Name */}
                    {isColumnVisible('bankExecutive') && (
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={row.bankExecutive.avatar}
                            alt={row.bankExecutive.name}
                            className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-200"
                          />
                          <span className="text-gray-800 font-medium truncate max-w-[100px]">
                            {row.bankExecutive.name}
                          </span>
                        </div>
                      </td>
                    )}

                    {/* Row View Action */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => onSelectRecord(row)}
                        className="p-1 rounded text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
