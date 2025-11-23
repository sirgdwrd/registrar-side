import React from 'react';

const SectionCard = ({ section, isSelected, onClick }) => {
  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-lg shadow border-2 cursor-pointer transition-all hover:shadow-lg ${
        isSelected 
          ? 'border-amber-500 dark:border-amber-600' 
          : 'border-gray-200 dark:border-slate-700'
      }`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {section.gradeLevel} - {section.section}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            section.studentsEnrolled >= section.capacity 
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
          }`}>
            {section.studentsEnrolled}/{section.capacity}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {section.classSchedule}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {section.advisoryTeacher}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;