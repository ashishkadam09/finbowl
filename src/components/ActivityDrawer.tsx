import React from 'react';
import { X, Activity, Clock, CheckCircle2, FileUp, PlusCircle } from 'lucide-react';
import { ActivityLog } from '../types';

interface ActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ActivityLog[];
}

export const ActivityDrawer: React.FC<ActivityDrawerProps> = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-300">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Activity History</h2>
                <p className="text-xs text-gray-500">Real-time disbursement audit log</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {logs.map((log) => (
              <div key={log.id} className="relative pl-6 pb-4 border-l-2 border-purple-200 last:border-l-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900">{log.action}</span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.timestamp}
                  </span>
                </div>

                <p className="text-gray-600 mb-2 leading-relaxed">{log.details}</p>

                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <img src={log.avatar} alt={log.user} className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-medium text-gray-700">{log.user}</span>
                  <span className="ml-auto text-[10px] font-semibold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                    {log.targetLoanId}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <button
              onClick={onClose}
              className="w-full py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Close Activity Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
