import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const Icons = {
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  GraduationCap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
  Hash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
  )
};

const EditLecturer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gender, setGender] = useState("Nam");

  const inputClasses = "w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#aa3bff] focus:ring-4 focus:ring-purple-50 transition-all font-medium text-[#08060d]";
  const labelClasses = "block text-sm font-black text-gray-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in pb-4 px-4">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Edit lecturer</h1>
        <div className="flex items-center gap-2 mt-1.5">
          <span 
            onClick={() => navigate('/admin/lecturers')}
            className="text-sm font-bold text-[#aa3bff] cursor-pointer hover:underline"
          >
            Lecturers
          </span>
          <span className="text-gray-300 text-xs">/</span>
          <span className="text-sm font-bold text-gray-400">Edit {id}</span>
        </div>
      </div>

      <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-50 px-8 py-5">
          <CardTitle className="text-lg font-black text-[#08060d]">Cập nhật thông tin giảng viên</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1">
              <label className={labelClasses}>Họ và tên</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.User />
                </div>
                <input type="text" defaultValue="TS. Trần Văn B" className={inputClasses} />
              </div>
            </div>

            {/* Lecturer ID */}
            <div className="space-y-1">
              <label className={labelClasses}>Mã giảng viên</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.Hash />
                </div>
                <input type="text" defaultValue={id} readOnly className={`${inputClasses} bg-gray-100 cursor-not-allowed`} />
              </div>
            </div>

            {/* Degree */}
            <div className="space-y-1">
              <label className={labelClasses}>Học vị</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.GraduationCap />
                </div>
                <input type="text" defaultValue="Tiến sĩ" className={inputClasses} />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className={labelClasses}>Email công vụ</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.Mail />
                </div>
                <input type="email" defaultValue="vanb@lecturer.edu.vn" className={inputClasses} />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className={labelClasses}>Giới tính</label>
              <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-200 h-11">
                {['Nam', 'Nữ', 'Khác'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setGender(option)}
                    className={`flex-1 rounded-lg text-[12px] font-black transition-all ${
                      gender === option 
                        ? 'bg-white text-[#aa3bff] shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin/lecturers')}
              className="rounded-xl px-8 h-11 font-bold text-gray-400 hover:text-gray-600 text-sm"
            >
              Hủy bỏ
            </Button>
            <Button className="rounded-xl px-12 h-11 bg-[#aa3bff] hover:bg-[#922ce6] text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95 text-sm">
              <Icons.Save />
              Cập nhật hồ sơ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditLecturer;
