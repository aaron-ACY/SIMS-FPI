import React from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Courses Enrolled', value: '6', icon: '📚', color: 'bg-blue-500' },
    { label: 'Completed Credits', value: '42', icon: '🎓', color: 'bg-green-500' },
    { label: 'Current GPA', value: '3.8', icon: '⭐', color: 'bg-yellow-500' },
    { label: 'Pending Tasks', value: '4', icon: '📝', color: 'bg-red-500' },
  ];

  const recentActivities = [
    { id: 1, type: 'grade', title: 'New grade in Web Programming', date: '2 hours ago', score: 'A' },
    { id: 2, type: 'assignment', title: 'Assignment 2 submitted', date: 'Yesterday', score: null },
    { id: 3, type: 'course', title: 'Joined Advanced Database', date: '3 days ago', score: null },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Student Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Welcome back, <span className="text-[#0ea5e9] font-bold">{user?.fullName || 'Student'}</span>! Here's your academic overview.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-2xl flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <div className="text-xs font-black text-gray-300 group-hover:text-gray-400 transition-colors">DETAILS</div>
            </div>
            <p className="text-3xl font-black text-gray-800">{stat.value}</p>
            <p className="text-sm font-bold text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentDashboard;