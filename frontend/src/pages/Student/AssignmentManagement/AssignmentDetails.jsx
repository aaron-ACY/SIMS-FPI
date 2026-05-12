import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SectionItem = ({ title, iconType, isCompleted = false, isGraded = false }) => {
  const path = isGraded ? "/student/assignments/grades" : "/student/assignments/upload";
  const getIcon = () => {
    switch (iconType) {
      case 'announcement':
        return <img src="https://moodle.com/wp-content/uploads/2021/06/Moodle-icon-Announcements.png" alt="" className="w-5 h-5 opacity-80" />;
      case 'word':
        return <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/1200px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png" alt="" className="w-5 h-5 opacity-80" />;
      case 'file':
      default:
        return <img src="https://cdn-icons-png.flaticon.com/512/2991/2991108.png" alt="" className="w-5 h-5 opacity-80" />;
    }
  };

  return (
    <div className="flex items-center justify-between py-2 px-4 hover:bg-[#f8f9fa] transition-colors border-b border-gray-100 last:border-0 group cursor-pointer">
      <Link to={path} className="flex items-center gap-3 flex-1">
        {getIcon()}
        <span className="text-sm font-normal text-[#0070e0] hover:underline transition-colors">
          {title}
        </span>
      </Link>
      <div className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center transition-all ${
        isCompleted ? 'bg-[#00897b] border-[#00897b]' : 'bg-white'
      }`}>
        {isCompleted && (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        )}
      </div>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <div className="py-3 px-4 border-b border-gray-100 bg-[#f8f9fa]">
    <h2 className="text-lg font-normal text-[#00897b] tracking-tight">{title}</h2>
  </div>
);

const AssignmentDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-4 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white py-2 px-4 border-b border-gray-200">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
           <Link to="/student/assignments" className="hover:underline">My courses</Link>
           <span>{'>'}</span>
           <span className="text-gray-600">SP26_SE08101_7419</span>
        </div>

        {/* Progress Info */}
        <div className="flex justify-end pr-4">
          <div className="flex items-center gap-1 text-[11px] text-gray-500">
            <span>Your progress</span>
            <div className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center text-[8px] text-white">?</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white border border-gray-200 rounded-sm">
          {/* Section 1 */}
          <div className="p-2 space-y-1">
            <SectionItem title="Announcements" iconType="announcement" />
            <SectionItem title="Assignment 1 guidance" iconType="word" />
            <SectionItem title="Assignment 2 guidance" iconType="word" />
            <SectionItem title="FRONTSHEET ASM FINAL REPORT (IND)" iconType="word" />
            <SectionItem title="Unit 13.Assignment brief part 1" iconType="word" />
            <SectionItem title="Unit 13.Assignment brief part 2" iconType="word" />
          </div>

          <SectionHeader title="Lap" />
          <div className="p-2">
            <SectionItem title="Lap - 01" iconType="file" isCompleted={true} isGraded={true} />
          </div>

          <SectionHeader title="ASM Part 1 - 04/03/2026" />
          <div className="p-2">
            <SectionItem title="ASM Part 1" iconType="file" isCompleted={true} isGraded={true} />
          </div>

          <SectionHeader title="ASM - Final Report - 01/04/2026" />
          <div className="p-2">
            <SectionItem title="ASM - Final Report" iconType="file" isCompleted={true} isGraded={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
