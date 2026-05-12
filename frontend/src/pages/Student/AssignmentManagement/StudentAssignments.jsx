import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DonutProgress = ({ percentage, color = "#ff9800" }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="#f3f4f6"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-black text-gray-400">{percentage}%</span>
    </div>
  );
};

const StudentAssignments = () => {
  const [activeFilter, setActiveFilter] = useState('In progress');

  const assignments = [
    { 
      id: 1, 
      code: 'FA24_COM109', 
      progress: 66, 
      pattern: 'bg-slate-200',
      gradient: 'linear-gradient(135deg, #e2e8f0 25%, #cbd5e1 25%, #cbd5e1 50%, #e2e8f0 50%, #e2e8f0 75%, #cbd5e1 75%, #cbd5e1 100%)'
    },
    { 
      id: 2, 
      code: 'SP26_SE08101_7419', 
      progress: 30, 
      pattern: 'bg-emerald-400',
      gradient: 'linear-gradient(45deg, #34d399 25%, #10b981 25%, #10b981 50%, #34d399 50%, #34d399 75%, #10b981 75%, #10b981 100%)'
    },
    { 
      id: 3, 
      code: 'SP26_SE08101_7408', 
      progress: 33, 
      pattern: 'bg-sky-500',
      gradient: 'linear-gradient(135deg, #0ea5e9 25%, #0284c7 25%, #0284c7 50%, #0ea5e9 50%, #0ea5e9 75%, #0284c7 75%, #0284c7 100%)'
    },
    { 
      id: 4, 
      code: 'SP25_SE08101_7388', 
      progress: 40, 
      pattern: 'bg-indigo-400',
      gradient: 'linear-gradient(45deg, #818cf8 25%, #6366f1 25%, #6366f1 50%, #818cf8 50%, #818cf8 75%, #6366f1 75%, #6366f1 100%)'
    },
    { 
      id: 5, 
      code: 'SP25_SE08101_7377', 
      progress: 10, 
      pattern: 'bg-orange-400',
      gradient: 'linear-gradient(135deg, #fb923c 25%, #f97316 25%, #f97316 50%, #fb923c 50%, #fb923c 75%, #f97316 75%, #f97316 100%)'
    },
    { 
      id: 6, 
      code: 'FA24_SE08101_7200', 
      progress: 85, 
      pattern: 'bg-teal-400',
      gradient: 'linear-gradient(45deg, #2dd4bf 25%, #0d9488 25%, #0d9488 50%, #2dd4bf 50%, #2dd4bf 75%, #0d9488 75%, #0d9488 100%)'
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Filter */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex bg-[#00897b] rounded-md overflow-hidden shadow-sm">
          {['In progress', 'Future', 'Past'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 text-sm font-bold transition-all ${
                activeFilter === filter 
                  ? 'bg-[#00796b] text-white' 
                  : 'text-white/80 hover:bg-[#00796b]/50'
              } ${filter !== 'Past' ? 'border-r border-[#00695c]' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {assignments.map((asm) => (
          <Link 
            key={asm.id} 
            to={`/student/assignments/${asm.id}`}
            className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
          >
            {/* Pattern Header */}
            <div 
              className={`h-32 w-full ${asm.pattern} relative overflow-hidden`}
              style={{ backgroundImage: asm.gradient, backgroundSize: '40px 40px' }}
            >
              {/* Overlay for pattern effect */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </div>

            {/* Content */}
            <div className="p-4 flex items-center gap-6">
              <DonutProgress percentage={asm.progress} color="#ff9800" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-600 tracking-tight group-hover:text-[#00897b] transition-colors">
                  {asm.code}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignments;
