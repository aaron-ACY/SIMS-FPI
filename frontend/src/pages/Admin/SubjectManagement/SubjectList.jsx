import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
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

const mockSubjects = [
  { id: "SUB001", name: "Lập trình hướng đối tượng", credits: 3, department: "CNTT", type: "Bắt buộc" },
  { id: "SUB002", name: "Cơ sở dữ liệu", credits: 3, department: "CNTT", type: "Bắt buộc" },
  { id: "SUB003", name: "Toán cao cấp A1", credits: 4, department: "Toán học", type: "Đại cương" },
  { id: "SUB004", name: "Marketing căn bản", credits: 2, department: "Kinh tế", type: "Tự chọn" },
  { id: "SUB005", name: "Cấu trúc dữ liệu & Giải thuật", credits: 4, department: "CNTT", type: "Bắt buộc" },
];

const SubjectList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Subjects list</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-bold text-[#aa3bff] cursor-pointer hover:underline">Dashboard</span>
            <span className="text-gray-300 text-xs">/</span>
            <span className="text-sm font-bold text-gray-400">Subjects</span>
          </div>
        </div>
        <Button 
          variant="sims" 
          onClick={() => navigate('/admin/subjects/add')}
          className="rounded-xl h-12 px-6 bg-[#aa3bff] hover:bg-[#922ce6] text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95"
        >
          <Icons.Plus />
          <span className="hidden sm:inline">Thêm môn học</span>
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-1.5 rounded-xl border border-gray-100">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#aa3bff] transition-colors">
            <Icons.Search />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên môn hoặc mã môn học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-transparent rounded-lg outline-none focus:ring-4 focus:ring-purple-50 transition-all font-medium text-[#08060d] placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-50">
              <TableHead className="h-14 px-6 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Mã Môn</TableHead>
              <TableHead className="h-14 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Tên Môn Học</TableHead>
              <TableHead className="h-14 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Tín chỉ</TableHead>
              <TableHead className="h-14 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Khoa quản lý</TableHead>
              <TableHead className="h-14 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Loại môn</TableHead>
              <TableHead className="h-14 px-6 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSubjects.map((subject) => (
              <TableRow key={subject.id} className="group border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <TableCell className="px-6 py-4 font-bold text-[#aa3bff]">{subject.id}</TableCell>
                <TableCell className="px-4 py-4 font-bold text-[#08060d]">{subject.name}</TableCell>
                <TableCell className="px-4 py-4 text-center font-bold text-gray-500">
                  <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                    {subject.credits}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 text-gray-600 font-medium text-sm">{subject.department}</TableCell>
                <TableCell className="px-4 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border uppercase tracking-wider ${
                    subject.type === 'Bắt buộc' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                    subject.type === 'Đại cương' ? 'bg-green-50 text-green-600 border-green-100' : 
                    'bg-gray-50 text-gray-500 border-gray-100'
                  }`}>
                    {subject.type}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => navigate(`/admin/subjects/edit/${subject.id}`)}
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

export default SubjectList;
