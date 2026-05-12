import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../../components/ui/table';

const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Filter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Delete: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  )
};

const mockStudents = [
  { id: "SV001", name: "Nguyễn Văn A", email: "vana@student.edu.vn", gender: "Nam", major: "CNTT" },
  { id: "SV002", name: "Trần Thị B", email: "thib@student.edu.vn", gender: "Nữ", major: "Kế toán" },
  { id: "SV003", name: "Lê Hoàng C", email: "hoangc@student.edu.vn", gender: "Nam", major: "Marketing" },
  { id: "SV004", name: "Phạm Minh D", email: "minhd@student.edu.vn", gender: "Nam", major: "CNTT" },
  { id: "SV005", name: "Đặng Thu E", email: "thue@student.edu.vn", gender: "Nữ", major: "Ngôn ngữ Anh" },
  { id: "SV006", name: "Hoàng Văn F", email: "vanf@student.edu.vn", gender: "Nam", major: "CNTT" },
  { id: "SV007", name: "Lý Thị G", email: "thig@student.edu.vn", gender: "Nữ", major: "Luật" },
];

const List = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12 px-4">
      {/* Unified Header Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Students list</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-bold text-[#aa3bff] cursor-pointer hover:underline">Dashboard</span>
            <span className="text-gray-300 text-xs">/</span>
            <span className="text-sm font-bold text-gray-400">Students</span>
          </div>
        </div>
        <Button 
          variant="sims" 
          onClick={() => navigate('/admin/students/add')}
          className="rounded-xl h-12 px-6 bg-[#aa3bff] hover:bg-[#922ce6] text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95"
        >
          <Icons.Plus />
          <span className="hidden sm:inline">Thêm sinh viên</span>
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-1.5 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#aa3bff] transition-colors">
            <Icons.Search />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, mã SV hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#aa3bff] focus:ring-4 focus:ring-purple-50 transition-all font-medium text-[#08060d] placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="h-12 px-6 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 text-sm">
            <Icons.Filter />
            <span>Khoa</span>
          </button>
          <button className="h-12 px-6 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 text-sm">
            <Icons.Filter />
            <span>Lớp</span>
          </button>
        </div>

        <button className="h-12 px-4 font-bold text-gray-400 hover:text-gray-600 transition-colors text-sm">
          Xóa bộ lọc
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-50">
              <TableHead className="h-14 px-6 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Mã SV</TableHead>
              <TableHead className="h-14 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Họ và Tên</TableHead>
              <TableHead className="h-14 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Email</TableHead>
              <TableHead className="h-14 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Giới tính</TableHead>
              <TableHead className="h-14 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Ngành học</TableHead>
              <TableHead className="h-14 px-6 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStudents.map((student) => (
              <TableRow key={student.id} className="group border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <TableCell className="px-6 py-4 font-bold text-[#aa3bff]">{student.id}</TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-black text-gray-400">
                      {student.name.charAt(student.name.lastIndexOf(' ') + 1)}
                    </div>
                    <span className="font-bold text-[#08060d]">{student.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 text-gray-500 font-medium text-sm">{student.email}</TableCell>
                <TableCell className="px-4 py-4 font-bold text-gray-600 text-sm">{student.gender}</TableCell>
                <TableCell className="px-4 py-4">
                  <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-md text-[10px] font-black border border-gray-100 uppercase tracking-wider">
                    {student.major}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => navigate(`/admin/students/edit/${student.id}`)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all active:scale-90"
                    >
                      <Icons.Edit />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all active:scale-90">
                      <Icons.Delete />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default List;
