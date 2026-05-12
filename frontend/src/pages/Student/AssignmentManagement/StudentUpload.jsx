import React from 'react';
import { Link } from 'react-router-dom';

const StudentSubmission = () => {
  const statusData = [
    { label: 'Submission status', value: 'No attempt' },
    { label: 'Grading status', value: 'Not graded' },
    { label: 'Due date', value: 'Wednesday, 12 August 2026, 12:00 PM' },
    { label: 'Time remaining', value: '92 days 22 hours' },
    { label: 'Last modified', value: '-' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-4 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white py-2 px-4 border-b border-gray-200">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
           <Link to="/student/assignments" className="hover:underline">My courses</Link>
           <span>{'>'}</span>
           <Link to="/student/assignments/1" className="hover:underline">SP26_SE08101_7419</Link>
           <span>{'>'}</span>
           <span className="text-gray-600">ASM part 1</span>
        </div>

        <div className="bg-white p-8 rounded-sm border border-gray-200">
          {/* Title */}
          <h1 className="text-3xl font-normal text-gray-800 font-serif mb-8 border-b border-gray-100 pb-4">Submission status</h1>

          {/* Table */}
          <div className="border border-gray-200 rounded-sm overflow-hidden max-w-4xl">
            <table className="w-full border-collapse">
              <tbody>
                {statusData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#f2f2f2]' : 'bg-[#ffffff]'}>
                    <td className="px-4 py-3 w-64 text-sm text-gray-700 font-normal border-b border-gray-200">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 font-normal border-b border-gray-200 bg-white">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Comments Section */}
          <div className="flex items-center gap-2 py-4">
            <span className="text-sm text-gray-700">Submission comments</span>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400"><path d="M8 5v14l11-7z"/></svg>
              <span className="hover:underline">Comments (0)</span>
            </button>
          </div>

          {/* Action Button Area */}
          <div className="flex flex-col items-center pt-8 space-y-8">
            <button className="bg-[#00897b] hover:bg-[#00796b] text-white px-8 py-2 rounded-md font-medium text-base shadow-sm transition-colors">
              Add submission
            </button>
            
            <p className="text-sm text-gray-600 font-normal">
              You have not made a submission yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmission;
