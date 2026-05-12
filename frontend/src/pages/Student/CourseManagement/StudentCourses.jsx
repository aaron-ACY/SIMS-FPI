import React from 'react';
import { Link } from 'react-router-dom';

const StudentCourses = () => {
  const courses = [
    { id: 'PRO101', name: 'Introduction to Programming', credits: 3, department: 'CNTT', status: 'In Progress', progress: 65 },
    { id: 'DBI202', name: 'Database Systems', credits: 3, department: 'CNTT', status: 'Completed', progress: 100 },
    { id: 'SWE301', name: 'Software Engineering', credits: 3, department: 'CNTT', status: 'In Progress', progress: 40 },
    { id: 'UXD401', name: 'UI/UX Design Strategy', credits: 2, department: 'THIẾT KẾ', status: 'Upcoming', progress: 0 },
    { id: 'MAD501', name: 'Mobile Application Development', credits: 4, department: 'CNTT', status: 'In Progress', progress: 25 },
  ];

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header Section */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-[#08060d] tracking-tight">My Courses</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/student/dashboard" className="text-[#0ea5e9] hover:underline">Dashboard</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500 font-medium">Courses</span>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Tìm kiếm môn học..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none transition-all text-sm font-medium"
          />
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-all">
          Khoa
        </button>

        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-all">
          Trạng thái
        </button>

        <button className="text-sm font-bold text-gray-400 hover:text-[#0ea5e9] transition-all ml-auto">
          Xóa bộ lọc
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Mã Môn</th>
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Tên Môn Học</th>
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Tín Chỉ</th>
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Khoa</th>
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Tiến Độ</th>
                <th className="px-6 py-5 text-right text-[11px] font-black text-gray-400 uppercase tracking-widest">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses.map((course) => (
                <tr key={course.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-6 py-5 text-sm font-black text-[#0ea5e9]">
                    {course.id}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-gray-800">{course.name}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-gray-600">{course.credits}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-sky-50 text-[#0ea5e9] text-[10px] font-black rounded-lg border border-sky-100">
                      {course.department}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1 w-32">
                       <div className="flex justify-between text-[10px] font-black text-gray-400">
                         <span>Progress</span>
                         <span>{course.progress}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-[#0ea5e9] rounded-full transition-all duration-500" 
                           style={{ width: `${course.progress}%` }}
                         ></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                      course.status === 'Completed' 
                        ? 'bg-green-50 text-green-600 border-green-100'
                        : course.status === 'In Progress'
                        ? 'bg-orange-50 text-orange-600 border-orange-100'
                        : 'bg-gray-50 text-gray-400 border-gray-100'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
