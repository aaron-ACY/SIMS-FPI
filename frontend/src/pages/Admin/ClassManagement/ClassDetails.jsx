import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  ),
  UserPlus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="16" x2="22" y1="11" y2="11"/></svg>
  ),
  UserMinus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  )
};

const mockClassInfo = {
  id: "CL001",
  name: "K65-CNTT-A",
  advisor: "TS. Nguyễn Văn A",
  year: "2020-2024",
  count: 45
};

const mockStudentsInClass = [
  { id: "SV001", name: "Nguyễn Văn A", email: "vana@student.edu.vn", gender: "Nam", joinDate: "15/09/2020" },
  { id: "SV002", name: "Trần Thị B", email: "thib@student.edu.vn", gender: "Nữ", joinDate: "15/09/2020" },
  { id: "SV003", name: "Lê Hoàng C", email: "hoangc@student.edu.vn", gender: "Nam", joinDate: "16/09/2020" },
  { id: "SV004", name: "Phạm Minh D", email: "minhd@student.edu.vn", gender: "Nam", joinDate: "16/09/2020" },
];

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState(mockStudentsInClass);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12 px-4">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Class: {mockClassInfo.name}</h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-sm font-bold text-gray-400">Advisor:</span>
              <span className="text-sm font-black text-[#aa3bff]">{mockClassInfo.advisor}</span>
            </div>
          </div>
        </div>
        <Button 
          onClick={() => navigate('/admin/classes/assign')}
          className="rounded-xl h-12 px-6 bg-[#aa3bff] hover:bg-[#922ce6] text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95"
        >
          <Icons.UserPlus />
          <span>Thêm sinh viên vào lớp</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Statistics Card */}
        <div className="lg:col-span-1">
          <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl sticky top-24">
            <CardHeader className="border-b border-gray-50 p-6">
              <CardTitle className="text-lg font-black text-[#08060d] flex items-center gap-2">
                <Icons.Info />
                Thông tin chung
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-400">Mã lớp:</span>
                  <span className="text-sm font-black text-[#08060d]">{mockClassInfo.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-400">Niên khóa:</span>
                  <span className="text-sm font-black text-[#08060d]">{mockClassInfo.year}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-400">Sĩ số hiện tại:</span>
                  <span className="text-sm font-black text-[#aa3bff] bg-purple-50 px-2 py-0.5 rounded-md">{mockClassInfo.count} / 50</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">
                  * Danh sách này hiển thị tất cả sinh viên đã được biên chế chính thức vào lớp sinh hoạt này.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List Table */}
        <div className="lg:col-span-2">
          <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 bg-white">
              <h2 className="text-lg font-black text-[#08060d]">Danh sách sinh viên trong lớp</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-50">
                  <TableHead className="h-12 px-6 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Mã SV</TableHead>
                  <TableHead className="h-12 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Họ và Tên</TableHead>
                  <TableHead className="h-12 px-4 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400">Ngày gia nhập</TableHead>
                  <TableHead className="h-12 px-6 text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="group border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="px-6 py-4 font-bold text-[#aa3bff]">{student.id}</TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#08060d] text-sm">{student.name}</span>
                        <span className="text-[10px] text-gray-400 font-medium">{student.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-gray-500 font-medium text-xs">{student.joinDate}</TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all active:scale-90" title="Xóa khỏi lớp">
                        <Icons.UserMinus />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
