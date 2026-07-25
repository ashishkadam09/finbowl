import React, { useState } from 'react';
import { ColumnConfig } from '../types';
import { Columns, Check } from 'lucide-react';

interface ColumnToggleDropdownProps {
  columns: ColumnConfig[];
  onToggleColumn: (id: string) => void;
}

export const ColumnToggleDropdown: React.FC<ColumnToggleDropdownProps> = ({
  columns,
  onToggleColumn,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
        title="Customize Columns"
      >
        <Columns className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 p-2 text-xs">
          <div className="px-2 py-1.5 font-semibold text-gray-800 border-b border-gray-100 mb-1">
            Table Columns
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {columns.map((col) => (
              <button
                key={col.id}
                onClick={() => onToggleColumn(col.id)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-purple-50 text-gray-700 text-left transition"
              >
                <span>{col.label}</span>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                    col.visible
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {col.visible && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
