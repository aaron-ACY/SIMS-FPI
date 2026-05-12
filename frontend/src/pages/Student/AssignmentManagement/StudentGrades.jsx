import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentGrades = () => {
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);

  const submissionData = [
    { label: 'Submission status', value: 'Submitted for grading' },
    { label: 'Grading status', value: 'Graded', isHighlight: true },
    { label: 'Due date', value: 'Saturday, 8 March 2025, 11:59 PM' },
    { label: 'Extension due date', value: 'Tuesday, 8 April 2025, 11:59 PM' },
    { label: 'Time remaining', value: 'Assignment was submitted 30 days 6 hours early' },
    { label: 'Last modified', value: 'Sunday, 9 March 2025, 5:46 PM' },
    { label: 'File submissions', value: '7388_SE08101_BD00889_ASM1.pdf', isFile: true },
  ];

  const feedbackData = [
    { label: 'Grade', value: '70.00 / 100.00' },
    { label: 'Graded on', value: 'Monday, 21 April 2025, 3:43 PM' },
    { label: 'Graded by', value: 'Đỗ Trung Anh (FE FPI DN)', isUser: true },
    { label: 'Feedback comments', value: 'Student achieved: Pass', isComment: true },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-4 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white py-2 px-4 border-b border-gray-200">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
           <Link to="/student/assignments" className="hover:underline">My courses</Link>
           <span>{'>'}</span>
           <Link to="/student/assignments/1" className="hover:underline">SP25_SE08101_7388</Link>
           <span>{'>'}</span>
           <span className="text-gray-600">ASM Part 1</span>
           <span>{'>'}</span>
           <span className="text-gray-600">ASM Part 1</span>
        </div>

        <div className="space-y-8 px-4">
          <div>
            <h1 className="text-3xl font-normal text-gray-800 font-serif">ASM Part 1</h1>
            <div className="h-px bg-gray-200 w-full mt-4"></div>
          </div>

          {/* Submission Status Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-normal text-gray-800 font-serif">Submission status</h2>
            <div className="border border-gray-200 rounded-sm overflow-hidden max-w-4xl">
              <table className="w-full border-collapse">
                <tbody>
                  {submissionData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-[#f2f2f2]' : 'bg-[#ffffff]'}>
                      <td className="px-4 py-3 w-64 text-sm text-gray-700 font-normal border-b border-gray-200">
                        {row.label}
                      </td>
                      <td className={`px-4 py-3 text-sm text-gray-800 font-normal border-b border-gray-200 bg-white ${
                        row.isHighlight ? 'bg-[#d4edda] text-[#155724]' : ''
                      }`}>
                        {row.isFile ? (
                          <div className="flex items-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="PDF" className="w-4 h-4" />
                            <span className="text-[#0070e0] hover:underline cursor-pointer">{row.value}</span>
                          </div>
                        ) : row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Feedback Section */}
          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-normal text-gray-800 font-serif">Feedback</h2>
            <div className="border border-gray-200 rounded-sm overflow-hidden max-w-4xl">
              <table className="w-full border-collapse">
                <tbody>
                  {feedbackData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-[#f2f2f2]' : 'bg-[#ffffff]'}>
                      <td className="px-4 py-3 w-64 text-sm text-gray-700 font-normal border-b border-gray-200">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-normal border-b border-gray-200 bg-white">
                        {row.isUser ? (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-[#6f42c1] rounded-full flex items-center justify-center text-white text-[10px] font-bold">Đ</div>
                            <span>{row.value}</span>
                          </div>
                        ) : row.isComment ? (
                          <div className="flex items-start gap-2">
                            <button 
                              onClick={() => setIsFeedbackExpanded(!isFeedbackExpanded)}
                              className="mt-1 w-4 h-4 border border-gray-300 flex items-center justify-center text-[10px] text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                              {isFeedbackExpanded ? '-' : '+'}
                            </button>
                            {isFeedbackExpanded ? (
                              <div className="space-y-2">
                                <p className="font-bold">{row.value}</p>
                                <p className="text-gray-600 text-xs italic">
                                  Great work on this assignment. Your documentation is clear and the implementation follows the requirements. 
                                  Keep up the good work for the next phase.
                                </p>
                              </div>
                            ) : (
                              <p className="text-gray-400">Feedback collapsed</p>
                            )}
                          </div>
                        ) : row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;
