import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Search Bar Placeholder */}
        <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 group focus-within:border-[#aa3bff] transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none ml-3 text-sm font-medium w-64 text-gray-800"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative" ref={menuRef}>
        <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />

        {/* Notification Bell */}
        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#aa3bff] hover:bg-purple-50 transition-all border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>

        {/* User Profile Clickable Area */}
        <div 
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-full transition-all border border-transparent hover:border-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.fullName || 'Admin'}&background=0ea5e9&color=fff&bold=true`} 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-sm font-black text-[#08060d] leading-none">{user?.name || user?.fullName || 'Huỳnh Hữu Đan'}</p>
            <p className="text-[10px] font-bold text-gray-400 mt-1">{user?.role || 'Student'}</p>
          </div>
        </div>

        {/* User Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-50 p-2 animate-fade-in-up z-50">
            <div className="p-3 border-b border-gray-50 mb-1">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Account</p>
              <p className="text-sm font-bold text-gray-700 truncate">{user?.email || 'admin@sims.edu.vn'}</p>
            </div>
            
            {user?.role === 'STUDENT' && (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/student/profile');
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                My Profile
              </button>
            )}
            
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Settings
            </button>

            <div className="h-[1px] bg-gray-50 my-1" />

            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Logout System
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;