import React from 'react';
import { Link } from 'react-router-dom';

const StudentClasses = () => {
  const classes = [
    { id: 'SE1701', name: 'Web Programming', lecturer: 'TS. Nguyễn Văn A', email: 'vana@lecturer.edu.vn', department: 'CNTT', schedule: 'Mon, Wed 08:00 - 10:00', room: 'A1-202' },
    { id: 'SE1702', name: 'Database Systems', lecturer: 'ThS. Trần Thị B', email: 'thib@lecturer.edu.vn', department: 'KINH TẾ', schedule: 'Tue, Thu 13:00 - 15:00', room: 'B2-305' },
    { id: 'SE1703', name: 'Software Engineering', lecturer: 'TS. Lê Hoàng C', email: 'hoangc@lecturer.edu.vn', department: 'CNTT', schedule: 'Fri 08:00 - 11:30', room: 'C3-101' },
    { id: 'SE1704', name: 'UI/UX Design', lecturer: 'ThS. Phạm Minh D', email: 'minhd@lecturer.edu.vn', department: 'THIẾT KẾ', schedule: 'Thu 15:15 - 17:30', room: 'D4-204' },
    { id: 'SE1705', name: 'Mobile App Dev', lecturer: 'PGS.TS Đặng Thu E', email: 'thue@lecturer.edu.vn', department: 'CNTT', schedule: 'Sat 08:00 - 10:00', room: 'E5-301' },
  ];

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header Section */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Classes List</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/student/dashboard" className="text-[#a855f7] hover:underline">Dashboard</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500 font-medium">Classes</span>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên lớp, giảng viên..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#a855f7] outline-none transition-all text-sm font-medium"
          />
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:border-[#a855f7] hover:text-[#a855f7] transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Khoa
        </button>

        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:border-[#a855f7] hover:text-[#a855f7] transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 6h10"/><path d="M8 10h10"/><path d="M8 14h10"/></svg>
          Kỳ học
        </button>

        <button className="text-sm font-bold text-gray-400 hover:text-[#a855f7] transition-all ml-auto">
          Xóa bộ lọc
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Mã Lớp</th>
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Tên Lớp & Môn Học</th>
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Giảng Viên</th>
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Khoa</th>
                <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Lịch Học</th>
                <th className="px-6 py-5 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {classes.map((cls) => (
                <tr key={cls.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-6 py-5 text-sm font-black text-[#a855f7]">
                    {cls.id}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-gray-800">{cls.name}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 border border-white shadow-sm">
                        {cls.lecturer.split(' ').pop().charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{cls.lecturer}</span>
                        <span className="text-[11px] font-medium text-gray-400 tracking-tight">{cls.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-purple-50 text-[#a855f7] text-[10px] font-black rounded-lg border border-purple-100">
                      {cls.department}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">{cls.schedule}</span>
                      <span className="text-[11px] font-medium text-gray-400">{cls.room}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex justify-center items-center gap-2 transition-all">
                      <Link 
                        to={`/student/class/${cls.id}/members`}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-[#a855f7] transition-all border border-transparent hover:border-gray-100"
                        title="Xem danh sách lớp"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      </Link>
                    </div>
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

export default StudentClasses;
