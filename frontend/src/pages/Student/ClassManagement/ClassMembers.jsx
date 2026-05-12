import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ClassMembers = () => {
  const { classId } = useParams();

  const members = [
    { id: 'SV001', name: 'Nguyễn Văn A', email: 'vana@student.edu.vn', joinedDate: '15/09/2020' },
    { id: 'SV002', name: 'Trần Thị B', email: 'thib@student.edu.vn', joinedDate: '15/09/2020' },
    { id: 'SV003', name: 'Lê Hoàng C', email: 'hoangc@student.edu.vn', joinedDate: '16/09/2020' },
    { id: 'SV004', name: 'Phạm Minh D', email: 'minhd@student.edu.vn', joinedDate: '16/09/2020' },
  ];

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header Section */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Class: {classId || 'K65-CNTT-A'}</h1>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-gray-400">Advisor:</span>
            <span className="text-[#a855f7]">TS. Nguyễn Văn A</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: General Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-8">
               <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center text-[10px] font-black">i</div>
               <h2 className="text-xl font-black text-gray-800 tracking-tight">Thông tin chung</h2>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400">Mã lớp:</span>
                <span className="text-sm font-black text-gray-800">{classId || 'CL001'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400">Niên khóa:</span>
                <span className="text-sm font-black text-gray-800">2020-2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400">Sĩ số hiện tại:</span>
                <span className="px-3 py-1 bg-purple-50 text-[#a855f7] text-xs font-black rounded-lg border border-purple-100">
                  45 / 50
                </span>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <p className="text-[11px] font-medium text-gray-400 italic leading-relaxed">
                  * Danh sách này hiển thị tất cả sinh viên đã được biên chế chính thức vào lớp sinh hoạt này.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Member List */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50">
               <h2 className="text-xl font-black text-gray-800 tracking-tight">Danh sách sinh viên trong lớp</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-50">
                    <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Mã SV</th>
                    <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Họ và tên</th>
                    <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Ngày gia nhập</th>
                    <th className="px-8 py-5 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {members.map((member) => (
                    <tr key={member.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                      <td className="px-8 py-6 text-sm font-black text-[#a855f7]">
                        {member.id}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-800">{member.name}</span>
                          <span className="text-[11px] font-medium text-gray-400 tracking-tight">{member.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-600">
                        {member.joinedDate}
                      </td>
                      <td className="px-8 py-6 text-center">
                         {/* Action column as requested (blank or minor icons) */}
                         <div className="flex justify-center items-center gap-2 transition-all">
                           <button className="p-1.5 text-gray-300 hover:text-gray-500">
                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassMembers;
