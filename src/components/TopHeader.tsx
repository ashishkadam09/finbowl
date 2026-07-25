import React, { useState } from 'react';
import { Building2, ChevronDown, Bell, Menu, Check, User, Settings, LogOut } from 'lucide-react';

interface TopHeaderProps {
  onToggleMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleMobileSidebar }) => {
  const [graciaOpen, setGraciaOpen] = useState(false);
  const [abcOpen, setAbcOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [selectedGraciaGroup, setSelectedGraciaGroup] = useState('Gracia Advisory Group');
  const [selectedAbcGroup, setSelectedAbcGroup] = useState('ABC Advisory Group');

  const graciaOptions = ['Gracia Advisory Group', 'Gracia Capital Ltd', 'Gracia Fintech'];
  const abcOptions = ['ABC Advisory Group', 'ABC Wealth Management', 'ABC Holdings'];

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Advisory Group Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Gracia Advisory Group Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setGraciaOpen(!graciaOpen);
                setAbcOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none shadow-2xs transition"
            >
              <Building2 className="w-3.5 h-3.5 text-gray-500" />
              <span>{selectedGraciaGroup}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </button>

            {graciaOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 text-xs">
                {graciaOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedGraciaGroup(opt);
                      setGraciaOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-purple-50 hover:text-purple-700 text-gray-700"
                  >
                    <span>{opt}</span>
                    {selectedGraciaGroup === opt && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ABC Advisory Group Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setAbcOpen(!abcOpen);
                setGraciaOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none shadow-2xs transition"
            >
              <Building2 className="w-3.5 h-3.5 text-gray-500" />
              <span>{selectedAbcGroup}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </button>

            {abcOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 text-xs">
                {abcOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedAbcGroup(opt);
                      setAbcOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-purple-50 hover:text-purple-700 text-gray-700"
                  >
                    <span>{opt}</span>
                    {selectedAbcGroup === opt && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Bell Notification Icon */}
        <button className="relative p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition focus:outline-none">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-purple-300 transition focus:outline-none"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="User profile"
              className="w-8 h-8 rounded-full object-cover border border-purple-200"
            />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-2 text-xs">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-800">Radhika Mehta</p>
                <p className="text-gray-500 text-[11px]">Senior Risk Officer</p>
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                <User className="w-3.5 h-3.5" />
                <span>My Profile</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                <Settings className="w-3.5 h-3.5" />
                <span>Account Settings</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
