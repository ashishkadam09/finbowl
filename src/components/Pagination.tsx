import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-white text-xs text-gray-600 select-none">
      {/* Left controls: Page indicator + Rows per page */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Page input indicator */}
        <div className="flex items-center gap-1.5">
          <span>Page</span>
          <input
            type="text"
            readOnly
            value={currentPage}
            className="w-9 text-center py-1 border border-gray-200 rounded-md font-semibold text-gray-800 bg-gray-50 focus:outline-none"
          />
          <span>of {totalPages}</span>
        </div>

        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <div className="relative inline-block">
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="appearance-none border border-gray-200 rounded-md px-2.5 py-1 pr-7 font-medium text-gray-800 bg-gray-50 focus:outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Right controls: Page navigation buttons matching screenshot */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition"
          title="First Page"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition"
          title="Previous Page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Page Numbers */}
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 rounded text-xs font-semibold transition ${
              currentPage === p
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'hover:bg-gray-50 text-gray-700 border border-transparent'
            }`}
          >
            {p}
          </button>
        ))}

        <span className="px-1 text-gray-400 font-bold">...</span>

        {[8, 9, 10].map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 rounded text-xs font-semibold transition ${
              currentPage === p
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'hover:bg-gray-50 text-gray-700 border border-transparent'
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition"
          title="Next Page"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition"
          title="Last Page"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
