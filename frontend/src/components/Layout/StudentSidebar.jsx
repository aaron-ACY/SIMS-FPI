import React from 'react';
import { NavLink } from 'react-router-dom';

const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Classes: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M13 13h4"/><path d="M13 17h4"/><path d="M7 13h2v4H7z"/></svg>
  ),
  Assignments: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14h6"/><path d="M9 18h6"/><path d="M9 10h6"/></svg>
  ),
  Courses: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 6h10"/><path d="M8 10h10"/><path d="M8 14h10"/></svg>
  ),
  SidebarToggle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/></svg>
  ),
  Profile: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
};

const StudentSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const menus = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <Icons.Dashboard /> },
    { name: 'Class', path: '/student/class', icon: <Icons.Classes /> },
    { name: 'Assignments', path: '/student/assignments', icon: <Icons.Assignments /> },
    { name: 'My Courses', path: '/student/courses', icon: <Icons.Courses /> },
    { name: 'Profile', path: '/student/profile', icon: <Icons.Profile /> },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-100 h-screen flex flex-col fixed left-0 top-0 z-40 transition-all duration-300`}>
      <div className={`h-20 flex items-center ${isCollapsed ? 'justify-center' : 'px-8'} border-b border-gray-50 relative`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center text-white font-black">S</div>
            <span className="text-2xl font-black text-[#08060d] tracking-tighter">SIMS.</span>
          </div>
        )}
        {isCollapsed && (
           <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center text-white font-black animate-fade-in">S</div>
        )}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute ${isCollapsed ? '-right-4' : 'right-4'} top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#0ea5e9] hover:shadow-md transition-all z-50`}
        >
          <Icons.SidebarToggle />
        </button>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto sims-scrollbar transition-all">
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            title={isCollapsed ? menu.name : ""}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-sky-50 text-[#0ea5e9] font-bold shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#0ea5e9]'
              }`
            }
          >
            <span className={`${isCollapsed ? 'mr-0' : 'mr-3'}`}>{menu.icon}</span>
            {!isCollapsed && <span className="text-sm font-bold whitespace-nowrap animate-fade-in">{menu.name}</span>}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default StudentSidebar;
