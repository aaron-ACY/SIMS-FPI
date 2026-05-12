import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const Icons = {
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
  ),
  Hash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
  ),
  Layers: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/></svg>
  )
};

const EditSubject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjectType, setSubjectType] = React.useState('Bắt buộc');

  const inputClasses = "w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#aa3bff] focus:ring-4 focus:ring-purple-50 transition-all font-medium text-[#08060d]";
  const labelClasses = "block text-sm font-black text-gray-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in pb-4 px-4">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Edit subject</h1>
        <div className="flex items-center gap-2 mt-1.5">
          <span 
            onClick={() => navigate('/admin/subjects')}
            className="text-sm font-bold text-[#aa3bff] cursor-pointer hover:underline"
          >
            Subjects
          </span>
          <span className="text-gray-300 text-xs">/</span>
          <span className="text-sm font-bold text-gray-400">Edit {id}</span>
        </div>
      </div>

      <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-50 px-8 py-5">
          <CardTitle className="text-lg font-black text-[#08060d]">Cập nhật thông tin môn học</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Name */}
            <div className="md:col-span-2 space-y-1">
              <label className={labelClasses}>Tên môn học</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.Book />
                </div>
                <input type="text" defaultValue="Lập trình hướng đối tượng" className={inputClasses} />
              </div>
            </div>

            {/* Subject ID */}
            <div className="space-y-1">
              <label className={labelClasses}>Mã môn học</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.Hash />
                </div>
                <input type="text" defaultValue={id} readOnly className={`${inputClasses} bg-gray-100 cursor-not-allowed`} />
              </div>
            </div>

            {/* Credits */}
            <div className="space-y-1">
              <label className={labelClasses}>Số tín chỉ</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.Layers />
                </div>
                <input type="number" defaultValue="3" className={inputClasses} />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className={labelClasses}>Khoa quản lý</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.Building />
                </div>
                <input type="text" defaultValue="Công nghệ thông tin" className={inputClasses} />
              </div>
            </div>

            {/* Subject Type */}
            <div className="space-y-1">
              <label className={labelClasses}>Loại môn học</label>
              <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-200 h-11">
                {['Bắt buộc', 'Tự chọn', 'Đại cương'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSubjectType(option)}
                    className={`flex-1 rounded-lg text-[12px] font-black transition-all ${
                      subjectType === option 
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
              onClick={() => navigate('/admin/subjects')}
              className="rounded-xl px-8 h-11 font-bold text-gray-400 hover:text-gray-600 text-sm"
            >
              Hủy bỏ
            </Button>
            <Button className="rounded-xl px-12 h-11 bg-[#aa3bff] hover:bg-[#922ce6] text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95 text-sm">
              <Icons.Save />
              Cập nhật môn học
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditSubject;
