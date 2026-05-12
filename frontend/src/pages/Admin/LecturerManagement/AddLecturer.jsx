import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';

const Icons = {
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Briefcase: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  ),
  GraduationCap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="7" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )
};

const Add = () => {
  const navigate = useNavigate();
  const [gender, setGender] = React.useState('Nam');

  const inputClasses = "w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#aa3bff] focus:ring-4 focus:ring-purple-50 transition-all font-medium text-[#08060d]";
  const labelClasses = "block text-sm font-black text-gray-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-7xl mx-auto space-y-4 animate-fade-in pb-4 px-4">
      {/* Unified Header Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Add lecturer</h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span 
                onClick={() => navigate('/admin/lecturers')}
                className="text-sm font-bold text-[#aa3bff] cursor-pointer hover:underline"
              >
                Lecturers
              </span>
              <span className="text-gray-300 text-xs">/</span>
              <span className="text-sm font-bold text-gray-400">Add</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Picture Upload Section */}
        <div className="md:col-span-1">
          <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl overflow-hidden">
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center mb-3 group hover:border-[#aa3bff] cursor-pointer transition-colors relative overflow-hidden">
                <div className="text-gray-300 group-hover:scale-110 transition-transform">
                   <Icons.Plus />
                </div>
              </div>
              <h3 className="font-bold text-[#08060d] text-sm">Ảnh đại diện</h3>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium px-4 leading-tight">Định dạng JPG, PNG. Tối đa 2MB.</p>
              <Button variant="outline" className="mt-4 w-full h-9 rounded-xl border-gray-200 font-bold text-xs">Tải ảnh lên</Button>
            </CardContent>
          </Card>
        </div>

        {/* Form Fields Section */}
        <div className="md:col-span-2">
          <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl">
            <CardHeader className="border-b border-gray-50 px-6 py-3">
              <CardTitle className="text-lg font-black text-[#08060d]">Thông tin giảng viên</CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className={labelClasses}>Họ và Tên</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                      <Icons.User />
                    </div>
                    <input type="text" placeholder="TS. Nguyễn Văn A" className={inputClasses} />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className={labelClasses}>Email</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                      <Icons.Mail />
                    </div>
                    <input type="email" placeholder="vana@lecturer.edu.vn" className={inputClasses} />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className={labelClasses}>Số điện thoại</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                      <Icons.Phone />
                    </div>
                    <input type="tel" placeholder="090 123 4567" className={inputClasses} />
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
                        className={`flex-1 rounded-lg text-[13px] font-black transition-all ${
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

              <div className="h-px bg-gray-50 my-1"></div>

              <h3 className="text-lg font-black text-[#08060d] mb-2">Chuyên môn & Công tác</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {/* Department */}
                <div className="space-y-1">
                  <label className={labelClasses}>Khoa công tác</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                      <Icons.Briefcase />
                    </div>
                    <input type="text" placeholder="Công nghệ thông tin" className={inputClasses} />
                  </div>
                </div>

                {/* Degree */}
                <div className="space-y-1">
                  <label className={labelClasses}>Học vị</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                      <Icons.GraduationCap />
                    </div>
                    <input type="text" placeholder="Tiến sĩ, Thạc sĩ..." className={inputClasses} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-50 mt-3">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/admin/lecturers')}
                  className="rounded-xl px-8 h-10 font-bold text-gray-400 hover:text-gray-600 text-sm"
                >
                  Hủy bỏ
                </Button>
                <Button className="rounded-xl px-10 h-10 bg-[#aa3bff] hover:bg-[#922ce6] text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95 text-sm">
                  <Icons.Save />
                  Lưu hồ sơ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Add;
