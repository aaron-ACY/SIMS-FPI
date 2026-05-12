import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Students: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  ),
  Teachers: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
  ),
  Subjects: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 6h10"/></svg>
  ),
  Classes: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M13 13h4"/><path d="M13 17h4"/><path d="M7 13h2v4H7z"/></svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  ),
  SidebarToggle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/></svg>
  )
};

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [openMenus, setOpenMenus] = useState({ 
    student: true, 
    lecturer: true,
    department: false,
    subject: false,
    class: false
  });

  const toggleMenu = (key) => {
    if (isCollapsed) {
        setIsCollapsed(false);
        setOpenMenus(prev => ({ ...prev, [key]: true }));
    } else {
        setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const menus = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <Icons.Dashboard /> },
    { 
      name: 'Student Manage', 
      icon: <Icons.Students />,
      key: 'student',
      children: [
        { name: 'Students list', path: '/admin/students' },
        { name: 'Add student', path: '/admin/students/add' },
      ]
    },
    { 
      name: 'Lecturer Manage', 
      icon: <Icons.Teachers />,
      key: 'lecturer',
      children: [
        { name: 'Lecturers list', path: '/admin/lecturers' },
        { name: 'Add lecturer', path: '/admin/lecturers/add' },
      ]
    },
    { 
      name: 'Department Manage', 
      icon: <Icons.Building />,
      key: 'department',
      children: [
        { name: 'Departments list', path: '/admin/departments' },
        { name: 'Add department', path: '/admin/departments/add' },
      ]
    },
    { 
      name: 'Subjects Manage', 
      icon: <Icons.Subjects />,
      key: 'subject',
      children: [
        { name: 'Subjects list', path: '/admin/subjects' },
        { name: 'Add subject', path: '/admin/subjects/add' },
      ]
    },
    { 
      name: 'Class Manage', 
      icon: <Icons.Classes />,
      key: 'class',
      children: [
        { name: 'Classes list', path: '/admin/classes' },
        { name: 'Add class', path: '/admin/classes/add' },
        { name: 'Add student to class', path: '/admin/classes/assign' },
      ]
    },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-100 h-screen flex flex-col fixed left-0 top-0 z-40 transition-all duration-300`}>
      <div className={`h-20 flex items-center ${isCollapsed ? 'justify-center' : 'px-8'} border-b border-gray-50 relative`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-8 h-8 bg-[#aa3bff] rounded-lg flex items-center justify-center text-white font-black">S</div>
            <span className="text-2xl font-black text-[#08060d] tracking-tighter">SIMS.</span>
          </div>
        )}
        {isCollapsed && (
           <div className="w-8 h-8 bg-[#aa3bff] rounded-lg flex items-center justify-center text-white font-black animate-fade-in">S</div>
        )}
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute ${isCollapsed ? '-right-4' : 'right-4'} top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#aa3bff] hover:shadow-md transition-all z-50`}
        >
          <Icons.SidebarToggle />
        </button>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto sims-scrollbar transition-all">
        {menus.map((menu, index) => (
          <div key={index} className="space-y-1">
            {menu.children ? (
              <>
                <button
                  onClick={() => toggleMenu(menu.key)}
                  title={isCollapsed ? menu.name : ""}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'} py-3 rounded-xl transition-all duration-200 text-gray-500 hover:bg-gray-50 hover:text-[#aa3bff]`}
                >
                  <div className="flex items-center">
                    <span className={`${isCollapsed ? 'mr-0' : 'mr-3'}`}>{menu.icon}</span>
                    {!isCollapsed && <span className="font-bold text-sm whitespace-nowrap animate-fade-in">{menu.name}</span>}
                  </div>
                  {!isCollapsed && (
                    <div className={`transition-transform duration-200 ${openMenus[menu.key] ? 'rotate-180' : ''}`}>
                      <Icons.ChevronDown />
                    </div>
                  )}
                </button>
                {!isCollapsed && openMenus[menu.key] && (
                  <div className="pl-12 space-y-1 animate-fade-in">
                    {menu.children.map((child, cIdx) => (
                      <NavLink
                        key={cIdx}
                        to={child.path}
                        end={
                          child.path === '/admin/students' || 
                          child.path === '/admin/lecturers' ||
                          child.path === '/admin/departments' ||
                          child.path === '/admin/subjects' ||
                          child.path === '/admin/classes'
                        }
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg text-[13px] transition-all ${
                            isActive 
                              ? 'text-[#aa3bff] font-black bg-purple-50' 
                              : 'text-gray-400 hover:text-gray-600'
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={menu.path}
                title={isCollapsed ? menu.name : ""}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-purple-50 text-[#aa3bff] font-bold shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#aa3bff]'
                  }`
                }
              >
                <span className={`${isCollapsed ? 'mr-0' : 'mr-3'}`}>{menu.icon}</span>
                {!isCollapsed && <span className="text-sm font-bold whitespace-nowrap animate-fade-in">{menu.name}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-50 animate-fade-in">
          <NavLink 
            to="/admin/status"
            className={({ isActive }) => 
              `block bg-gray-50 rounded-2xl p-4 transition-all hover:bg-gray-100 border border-transparent ${isActive ? 'border-purple-200 bg-purple-50/50' : ''}`
            }
          >
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-gray-600">Hệ thống ổn định</span>
            </div>
          </NavLink>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
