import React from 'react';
import { Trash, User, BookOpen } from "lucide-react"; 

const GradeCardList = ({ 
    sectionsData, 
    lastAddedGrade, 
    openConfirmation, 
    openEditModal, 
    getSectionColor,
    lastEditedSectionId 
}) => {
    return (
        <div className="flex gap-4 min-w-max pb-2">
            {sectionsData.map((grade) => (
                <div
                    key={grade.grade}
                    id={`grade-card-${grade.grade}`}
                    className={`bg-white rounded-xl shadow-lg p-4 min-w-[200px] flex-shrink-0 relative transition ease-in-out border border-gray-200 
                      ${lastAddedGrade === grade.grade 
                        ? 'ring-4 ring-offset-2 ring-sky-300 shadow-xl shadow-sky-200/50 duration-300' // Ring/Highlight transition (300ms)
                        : 'hover:shadow-xl hover:shadow-gray-300/50 duration-200' // Hover transition (200ms)
                      } 
                    `}
                >
                    {!grade.isInitial && (
                        <button
                            onClick={() => openConfirmation(grade.grade)}
                            className="absolute top-3 right-3 p-1 rounded-lg text-rose-500 hover:text-rose-700 bg-white shadow-sm transition z-10"
                            title={`Remove ${grade.grade}`}
                        >
                            <Trash size={18} />
                        </button>
                    )}
                    
                    <div className="flex items-center justify-center mb-3">
                        <BookOpen size={20} className="text-sky-600 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">
                            {grade.grade}
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {grade.sections.map((s) => (
                            <div
                                key={s.SectionID}
                                data-section-id={s.SectionID}
                                onClick={() => openEditModal(s)}
                                className={`cursor-pointer rounded-lg py-3 px-4 text-center border-2 shadow-sm transition-all duration-300 ease-in-out font-semibold text-sm ${getSectionColor(s.current, s.max)} hover:shadow-md flex justify-between items-center`}
                            >
                                <span className="font-medium">{s.time}</span> 
                                <span className="font-bold flex items-center">
                                    <User size={14} className="mr-1" />
                                    {s.current}/{s.max}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GradeCardList;