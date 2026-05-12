import React, { useState, useEffect } from 'react';
import { studentApi } from '../../../api/studentApi';
import { User, Mail, Phone, Calendar, MapPin, GraduationCap, School, BookOpen, Clock } from 'lucide-react';

const StudentProfile = () => {
  const defaultData = {
    fullName: 'Lê Hữu Đan',
    studentCode: 'SV123456',
    email: 'huudan@student.edu.vn',
    phoneNumber: '0987654321',
    dateOfBirth: '2003-05-15',
    gender: 'Male',
    address: '123 Đường ABC, Quận 1, TP. HCM',
    className: 'CNTT2021',
    majorName: 'Software Engineering',
    academicYear: '2021-2025',
    status: 'Active'
  };

  const [profile, setProfile] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await studentApi.getProfile();
        if (response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const InfoItem = ({ icon: Icon, label, value, isLast }) => (
    <div className={`flex items-center gap-4 py-2.5 ${!isLast ? 'border-b border-[#e2e8f0]' : ''}`}>
      <div className="w-10 h-10 flex-shrink-0 bg-[#f8fafc] rounded-xl flex items-center justify-center text-[#94a3b8]">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">{label}</p>
        <p className="text-[14px] font-bold text-[#1e293b] mt-0.5">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-4 animate-fade-in font-sans">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-8 border-b border-[#e2e8f0] flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white border border-[#e2e8f0] rounded-full flex items-center justify-center text-[#cbd5e1] shadow-sm flex-shrink-0">
            <User size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-[26px] font-bold text-[#1e293b] tracking-tight">{profile.fullName}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
              <span className="text-[14px] text-[#64748b] font-medium">{profile.studentCode}</span>
              <span className="text-[#cbd5e1]">·</span>
              <span className="text-[14px] text-[#2563eb] font-bold">{profile.status}</span>
              {loading && <div className="w-3 h-3 border-2 border-[#e2e8f0] border-t-[#2563eb] rounded-full animate-spin ml-2"></div>}
            </div>
          </div>
          <div className="md:self-start">
            <button className="px-6 py-2 border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#1e293b] hover:bg-[#f8fafc] transition-all shadow-sm">
              Edit
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]">
          {/* Personal Info */}
          <div className="p-8">
            <h2 className="text-sm font-bold text-[#1e293b] mb-6 flex items-center gap-3">
              <User size={16} className="text-[#64748b]" /> Personal Information
            </h2>
            <div className="space-y-0">
              <InfoItem icon={Mail} label="Email" value={profile.email} />
              <InfoItem icon={Phone} label="Phone" value={profile.phoneNumber} />
              <InfoItem icon={Calendar} label="Date of Birth" value={profile.dateOfBirth} />
              <InfoItem icon={MapPin} label="Address" value={profile.address} isLast={true} />
            </div>
          </div>

          {/* Academic Record */}
          <div className="p-8">
            <h2 className="text-sm font-bold text-[#1e293b] mb-6 flex items-center gap-3">
              <GraduationCap size={18} className="text-[#64748b]" /> Academic Record
            </h2>
            <div className="space-y-0">
              <InfoItem icon={BookOpen} label="Major" value={profile.majorName} />
              <InfoItem icon={School} label="Class" value={profile.className} />
              <InfoItem icon={Clock} label="Academic Year" value={profile.academicYear} isLast={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
