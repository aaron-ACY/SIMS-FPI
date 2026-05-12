import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const Icons = {
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
  Hash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
  )
};

const AddDepartment = () => {
  const navigate = useNavigate();

  const inputClasses = "w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#aa3bff] focus:ring-4 focus:ring-purple-50 transition-all font-medium text-[#08060d]";
  const labelClasses = "block text-sm font-black text-gray-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in pb-4 px-4">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-[#08060d] tracking-tight">Add department</h1>
        <div className="flex items-center gap-2 mt-1.5">
          <span 
            onClick={() => navigate('/admin/departments')}
            className="text-sm font-bold text-[#aa3bff] cursor-pointer hover:underline"
          >
            Departments
          </span>
          <span className="text-gray-300 text-xs">/</span>
          <span className="text-sm font-bold text-gray-400">Add</span>
        </div>
      </div>

      <Card className="border-gray-100 shadow-xl shadow-gray-200/10 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-50 px-8 py-5">
          <CardTitle className="text-lg font-black text-[#08060d]">Thông tin khoa</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dept ID */}
            <div className="space-y-1">
              <label className={labelClasses}>Mã khoa</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.Hash />
                </div>
                <input type="text" placeholder="DXXX" className={inputClasses} />
              </div>
            </div>

            {/* Dept Name */}
            <div className="space-y-1">
              <label className={labelClasses}>Tên khoa</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.Building />
                </div>
                <input type="text" placeholder="Tên khoa đào tạo" className={inputClasses} />
              </div>
            </div>

            {/* Head of Dept */}
            <div className="space-y-1">
              <label className={labelClasses}>Trưởng khoa</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.User />
                </div>
                <input type="text" placeholder="TS. Nguyễn Văn A" className={inputClasses} />
              </div>
            </div>

            {/* Office */}
            <div className="space-y-1">
              <label className={labelClasses}>Văn phòng</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 scale-90">
                  <Icons.MapPin />
                </div>
                <input type="text" placeholder="Phòng, Nhà..." className={inputClasses} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin/departments')}
              className="rounded-xl px-8 h-11 font-bold text-gray-400 hover:text-gray-600 text-sm"
            >
              Hủy bỏ
            </Button>
            <Button className="rounded-xl px-12 h-11 bg-[#aa3bff] hover:bg-[#922ce6] text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-100 transition-all active:scale-95 text-sm">
              <Icons.Save />
              Lưu thông tin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDepartment;
