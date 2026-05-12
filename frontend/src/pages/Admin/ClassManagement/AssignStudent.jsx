import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  )
};

const mockClasses = [
  { id: "CL001", name: "K65-CNTT-A" },
  { id: "CL002", name: "K65-CNTT-B" },
  { id: "CL003", name: "K66-Kế Toán" },
];

const mockAvailableStudents = [
  { id: "SV010", name: "Lê Văn Tám", email: "tam@student.edu.vn", major: "CNTT" },
  { id: "SV011", name: "Hoàng Thị Chín", email: "chin@student.edu.vn", major: "CNTT" },
  { id: "SV012", name: "Nguyễn Văn Mười", email: "muoi@student.edu.vn", major: "CNTT" },
  { id: "SV013", name: "Trần Văn Một", email: "mot@student.edu.vn", major: "Kế toán" },
];

const AssignStudent = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleStudent = (id) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const inputClasses = "w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#aa3bff] focus:ring-4 focus:ring-purple-50 transition-all font-medium text-[#08060d]";
  const labelClasses = "block text-sm font-black text-gray-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12 px-4">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Assign Students</h1>
          <p className="text-sm font-bold text-gray-400 mt-1">Thêm sinh viên vào các lớp sinh hoạt</p>
        </div>
        <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin/classes')}
              className="rounded-xl px-6 h-11 font-bold text-gray-400 hover:text-gray-600 text-sm"
            >
              Hủy bỏ
            </Button>
            <Button 
              disabled={!selectedClass || selectedStudents.length === 0}
              className="rounded-xl px-10 h-11 bg-[#aa3bff] hover:bg-[#922ce6] text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95 text-sm disabled:opacity-50 disabled:shadow-none"
            >
              <Icons.Save />
              Xác nhận thêm ({selectedStudents.length})
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Class Selection Card */}
        <div className="md:col-span-1">
          <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-50 p-5">
              <CardTitle className="text-base font-black text-[#08060d]">1. Chọn lớp học</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-1">
                <label className={labelClasses}>Lớp sinh hoạt</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                    <Icons.Building />
                  </div>
                  <select 
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className={`${inputClasses} appearance-none cursor-pointer text-sm`}
                  >
                    <option value="">-- Chọn lớp --</option>
                    {mockClasses.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-medium px-1">
                Vui lòng chọn lớp học trước khi tiến hành chọn danh sách sinh viên.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Student Selection Card */}
        <div className="md:col-span-2">
          <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-50 p-5 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-black text-[#08060d]">2. Chọn sinh viên</CardTitle>
              <span className="text-xs font-black text-[#aa3bff] bg-purple-50 px-2.5 py-1 rounded-full">
                {selectedStudents.length} đã chọn
              </span>
            </CardHeader>
            <div className="p-4 border-b border-gray-50">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#aa3bff] transition-colors">
                    <Icons.Search />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sinh viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#aa3bff] focus:ring-4 focus:ring-purple-50 transition-all font-medium text-sm"
                  />
                </div>
            </div>
            <CardContent className="p-0 max-h-[400px] overflow-y-auto">
              <div className="divide-y divide-gray-50">
                {mockAvailableStudents.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => toggleStudent(student.id)}
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/80 transition-colors ${
                      selectedStudents.includes(student.id) ? 'bg-purple-50/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        selectedStudents.includes(student.id) 
                          ? 'bg-[#aa3bff] border-[#aa3bff] text-white shadow-sm' 
                          : 'border-gray-200 bg-white'
                      }`}>
                        {selectedStudents.includes(student.id) && <Icons.Check />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#08060d]">{student.name}</span>
                        <span className="text-[11px] text-gray-400 font-medium">{student.id} • {student.major}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{student.email}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignStudent;
