import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const Icons = {
  Student: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Lecturer: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><rect width="10" height="14" x="11" y="3" rx="2"/><path d="M15 7h2"/><path d="M15 11h2"/></svg>
  ),
  Class: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M13 13h4"/><path d="M13 17h4"/><path d="M7 13h2v4H7z"/></svg>
  ),
  Department: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  )
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Tổng sinh viên", value: "12,482", icon: <Icons.Student />, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Tổng giảng viên", value: "842", icon: <Icons.Lecturer />, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Lớp học hoạt động", value: "156", icon: <Icons.Class />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Khoa đào tạo", value: "12", icon: <Icons.Department />, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const recentClasses = [
    { name: "K65-CNTT-A", department: "Công nghệ thông tin", students: 45, status: "Active" },
    { name: "K64-KHMT-B", department: "Khoa học máy tính", students: 38, status: "Active" },
    { name: "K65-DTVT-C", department: "Điện tử viễn thông", students: 42, status: "Pending" },
    { name: "K63-HTTT-A", department: "Hệ thống thông tin", students: 35, status: "Active" },
  ];

  const alerts = [
    { type: "Warning", message: "Lớp K65-KT vừa thêm 5 sinh viên mới", time: "10 phút trước" },
    { type: "Info", message: "Hệ thống sẽ bảo trì vào 12:00 PM hôm nay", time: "2 giờ trước" },
    { type: "Success", message: "Đã hoàn tất nhập dữ liệu khoa Cơ khí", time: "5 giờ trước" },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate('/admin/students/add')}
            variant="outline" 
            className="rounded-xl font-semibold text-sm"
          >
            Thêm sinh viên
          </Button>
          <Button 
            onClick={() => navigate('/admin/classes/add')}
            className="bg-[#aa3bff] hover:bg-[#922ce6] text-white rounded-xl font-semibold text-sm"
          >
            Tạo lớp học mới
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-gray-100 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="h-48 border-2 border-dashed border-gray-50 rounded-[3rem] flex items-center justify-center">
         <p className="text-gray-300 font-bold text-sm tracking-widest uppercase">Nội dung đang được cập nhật...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;