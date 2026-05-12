import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/hero.png';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Icons = {
  Student: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Education: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 6h10"/></svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aa3bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  )
};

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Quản lý Sinh viên",
      desc: "Lưu trữ hồ sơ, theo dõi tiến độ học tập và thông tin cá nhân tập trung.",
      icon: <Icons.Student />
    },
    {
      title: "Quản lý Đào tạo",
      desc: "Đăng ký môn học, xem thời khóa biểu và lộ trình đào tạo trực quan.",
      icon: <Icons.Education />
    },
    {
      title: "Cổng thông tin Điểm",
      desc: "Tra cứu kết quả học tập, rèn luyện và nhận thông báo kết quả nhanh chóng.",
      icon: <Icons.Chart />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#6b6375] font-sans selection:bg-purple-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-[#aa3bff] rounded-lg flex items-center justify-center text-white font-black">S</div>
            <div className="text-2xl font-black text-[#08060d] tracking-tighter">SIMS.</div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8 text-sm font-bold text-gray-500">
              <a href="#about" className="hover:text-[#aa3bff] transition-colors">Về chúng tôi</a>
              <a href="#features" className="hover:text-[#aa3bff] transition-colors">Tính năng</a>
            </div>
            <Button 
              variant="sims"
              onPress={() => navigate('/login')}
              className="rounded-full px-8 h-11 font-black"
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-32 gap-16">
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-100 text-[#aa3bff] text-xs font-black uppercase tracking-widest">
              ✨ Nền tảng quản lý giáo dục 4.0
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-[#08060d] leading-[1.1] tracking-tight">
              Hệ thống Quản lý <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aa3bff] to-[#cc80ff]">Thông tin Sinh viên</span>
            </h1>
            <p className="text-xl text-[#6b6375] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Nền tảng tích hợp toàn diện giúp số hóa quy trình quản lý, kết nối hiệu quả giữa Nhà trường, Giảng viên và Sinh viên.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button size="lg" variant="sims" className="rounded-2xl h-14 px-10 text-lg font-black shadow-2xl shadow-[#aa3bff]/30">
                Khám phá ngay
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl h-14 px-10 text-lg font-black border-2 border-gray-100">
                Liên hệ hỗ trợ
              </Button>
            </div>
          </div>
          <div className="flex-1 relative flex justify-center animate-fade-in-right">
            <div className="relative w-full max-w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#aa3bff]/20 to-transparent blur-3xl -z-10 rounded-full" />
              <img src={heroImg} alt="SIMS Visual" className="w-full h-auto drop-shadow-[0_35px_35px_rgba(170,59,255,0.2)]" />
            </div>
          </div>
        </section>

        {/* Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 bg-gray-50/50 rounded-[3rem] border border-gray-100 text-center mb-32 backdrop-blur-sm">
          <div>
            <div className="text-5xl font-black text-[#08060d]">
              <CountUp end={15000} suffix="+" />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-black text-gray-400 mt-3">Sinh viên hoạt động</div>
          </div>
          <div className="border-y md:border-y-0 md:border-x border-gray-200 py-8 md:py-0">
            <div className="text-5xl font-black text-[#08060d]">
              <CountUp end={800} suffix="+" />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-black text-gray-400 mt-3">Giảng viên chuyên môn</div>
          </div>
          <div>
            <div className="text-5xl font-black text-[#08060d]">
              <CountUp end={99} suffix=".9%" />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-black text-gray-400 mt-3">Độ tin cậy hệ thống</div>
          </div>
        </div>

        {/* Feature Cards */}
        <section id="features" className="py-20 mb-20">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-[#08060d] tracking-tight">Giải pháp quản lý thông minh</h2>
            <p className="max-w-2xl mx-auto text-lg font-medium text-gray-500">Tối ưu hóa mọi tác vụ học thuật chỉ trên một nền tảng duy nhất, bảo mật và hiệu quả.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((f, index) => (
              <Card key={index} className="group hover:border-[#aa3bff] hover:shadow-2xl hover:shadow-purple-100 p-4 border-2 border-transparent">
                <CardHeader>
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#aa3bff] group-hover:bg-[#aa3bff] group-hover:text-white transition-colors mb-4">
                    {f.icon}
                  </div>
                  <CardTitle className="text-2xl font-black text-[#08060d] mb-4">{f.title}</CardTitle>
                  <CardDescription className="text-base font-medium leading-relaxed">{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* About University */}
        <section id="about" className="py-32 border-t border-gray-100">
          <div className="bg-[#08060d] rounded-[4rem] p-10 lg:p-24 text-white flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#aa3bff]/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black leading-tight">Về Đại học <br /> của chúng tôi</h2>
              <p className="text-gray-400 text-xl leading-relaxed font-light">
                Với sứ mệnh tiên phong trong giáo dục số, nhà trường không ngừng nâng cấp hệ thống SIMS nhằm cung cấp trải nghiệm tốt nhất cho sinh viên trong quá trình trau dồi tri thức.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Bảo mật dữ liệu tuyệt đối",
                  "Truy cập mọi lúc, mọi nơi",
                  "Hỗ trợ kỹ thuật 24/7",
                  "Giao diện thân thiện"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold">
                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                      <Icons.Check />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-2xl h-14 px-10 font-black">
                Tìm hiểu thêm
              </Button>
            </div>
            <div className="flex-1 w-full relative z-10">
               <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] border border-white/10 flex items-center justify-center group cursor-pointer overflow-hidden">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#08060d] shadow-2xl group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z"/></svg>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#aa3bff] rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>
                <div className="text-3xl font-black text-[#08060d] tracking-tighter">SIMS.</div>
              </div>
              <p className="max-w-sm text-lg font-medium text-gray-500 leading-relaxed">
                Hệ thống quản lý giáo dục hiện đại, mang lại trải nghiệm học tập và làm việc chuyên nghiệp cho thế hệ tương lai.
              </p>
            </div>
            <div>
              <h4 className="font-black text-[#08060d] mb-6 uppercase tracking-widest text-xs">Liên kết</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500">
                <li><a href="#" className="hover:text-[#aa3bff] transition-colors">Trang chủ</a></li>
                <li><a href="#" className="hover:text-[#aa3bff] transition-colors">Tin tức & Sự kiện</a></li>
                <li><a href="#" className="hover:text-[#aa3bff] transition-colors">Tuyển sinh 2026</a></li>
                <li><a href="#" className="hover:text-[#aa3bff] transition-colors">Cổng thông tin đào tạo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[#08060d] mb-6 uppercase tracking-widest text-xs">Liên hệ hỗ trợ</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500">
                <li className="flex flex-col">
                  <span className="text-xs font-black text-gray-400 uppercase mb-1">Email</span>
                  support@sims.edu.vn
                </li>
                <li className="flex flex-col">
                  <span className="text-xs font-black text-gray-400 uppercase mb-1">Hotline</span>
                  1900 1234 (8:00 - 17:00)
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-black text-gray-400 uppercase tracking-widest">
            <div>© 2026 Student Information Management System. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#aa3bff]">Privacy Policy</a>
              <a href="#" className="hover:text-[#aa3bff]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
    </div>
  );
};

export default Home;