import React, { useState } from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ReleaseConfirmationModal from "./ReleaseConfirmationModal";

const ViewReportCardModal = ({ reportCard, isOpen, onClose, onAction }) => {
  const [showReleaseModal, setShowReleaseModal] = useState(false);

  if (!reportCard) return null;

  // Generate elementary school subject grades
  const generateElementarySubjects = () => {
    const subjects = [
      { name: "Reading", grade: getRandomGrade(), credits: 1.0 },
      { name: "Writing", grade: getRandomGrade(), credits: 1.0 },
      { name: "Mathematics", grade: getRandomGrade(), credits: 1.0 },
      { name: "Science", grade: getRandomGrade(), credits: 1.0 },
      { name: "Filipino", grade: getRandomGrade(), credits: 1.0 },
      { name: "Araling Panlipunan", grade: getRandomGrade(), credits: 1.0 },
      { name: "MAPEH", grade: getRandomGrade(), credits: 1.0 },
      {
        name: "Edukasyon sa Pagpapakatao",
        grade: getRandomGrade(),
        credits: 0.5,
      },
      { name: "Computer Literacy", grade: getRandomGrade(), credits: 0.5 },
    ];
    return subjects;
  };

  const getRandomGrade = () => {
    // Elementary grades typically 75-100 or 1.00-4.00
    // Using 75-100 scale for elementary
    return (Math.random() * 25 + 75).toFixed(0);
  };

  const getGradeRemarks = (grade) => {
    const numericGrade = parseFloat(grade);
    if (numericGrade >= 90) return "Outstanding";
    if (numericGrade >= 85) return "Very Satisfactory";
    if (numericGrade >= 80) return "Satisfactory";
    if (numericGrade >= 75) return "Fairly Satisfactory";
    return "Needs Improvement";
  };

  const getGradeColor = (grade) => {
    const numericGrade = parseFloat(grade);
    if (numericGrade >= 90)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (numericGrade >= 85)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    if (numericGrade >= 80)
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };

  const subjectGrades = generateElementarySubjects();

  const handlePrint = () => {
    // BACKEND PLACEHOLDER: Replace with actual PDF generation and download
    console.log(
      "BACKEND: Generate PDF report card for",
      reportCard.studentName
    );
    console.log(
      "BACKEND: PDF should include all subject grades, teacher comments, and school branding"
    );

    if (onAction) {
      onAction("print", reportCard);
    }
  };

  const handleRelease = () => {
    setShowReleaseModal(true);
  };

  const handleConfirmRelease = () => {
    // BACKEND PLACEHOLDER: Replace with actual release logic
    console.log(
      "BACKEND: Release report card to parents for",
      reportCard.studentName
    );
    console.log(
      "BACKEND: Update status to 'Released', send email notification, update portal"
    );

    setShowReleaseModal(false);
    if (onAction) {
      onAction("release", reportCard);
    }
  };

  const handleCloseReleaseModal = () => {
    setShowReleaseModal(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Report Card - {reportCard.studentName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {reportCard.gradeLevel} - {reportCard.section} •{" "}
                {reportCard.gradingPeriod}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                <span className="text-blue-800 dark:text-blue-300 text-sm font-semibold">
                  Final Average: {reportCard.gpa.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Status: {reportCard.status}
              </p>
            </div>
          </div>

          {/* BACKEND PLACEHOLDER NOTE */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                  Backend Integration Required
                </h4>
                <p className="text-amber-700 dark:text-amber-400 text-sm">
                  This is a preview placeholder. Backend should replace this
                  with actual PDF viewer integration, official school branding,
                  and real student data from the database.
                </p>
              </div>
            </div>
          </div>

          {/* Elementary School Report Card Preview */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600 p-6 mb-6">
            {/* School Header */}
            <div className="text-center mb-6 border-b border-gray-200 dark:border-slate-600 pb-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                ELEMENTARY SCHOOL REPORT CARD
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sample Elementary School • Academic Year 2023-2024
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {reportCard.gradingPeriod} • {reportCard.gradeLevel} -{" "}
                {reportCard.section}
              </p>
              {/* BACKEND PLACEHOLDER: School logo and official header */}
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                [BACKEND: Replace with official school letterhead and logo]
              </div>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Student Information
                </h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-gray-600 dark:text-gray-400">
                      Name:
                    </span>{" "}
                    {reportCard.studentName}
                  </p>
                  <p>
                    <span className="text-gray-600 dark:text-gray-400">
                      Grade Level:
                    </span>{" "}
                    {reportCard.gradeLevel}
                  </p>
                  <p>
                    <span className="text-gray-600 dark:text-gray-400">
                      Section:
                    </span>{" "}
                    {reportCard.section}
                  </p>
                  <p>
                    <span className="text-gray-600 dark:text-gray-400">
                      Advisory Teacher:
                    </span>{" "}
                    Teacher Maria
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Academic Summary
                </h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-gray-600 dark:text-gray-400">
                      Final Average:
                    </span>{" "}
                    {reportCard.gpa.toFixed(1)}
                  </p>
                  <p>
                    <span className="text-gray-600 dark:text-gray-400">
                      Overall Remark:
                    </span>{" "}
                    {getGradeRemarks(reportCard.gpa)}
                  </p>
                  <p>
                    <span className="text-gray-600 dark:text-gray-400">
                      Days Present:
                    </span>{" "}
                    85/90
                  </p>
                  <p>
                    <span className="text-gray-600 dark:text-gray-400">
                      Days Absent:
                    </span>{" "}
                    5/90
                  </p>
                </div>
              </div>
            </div>

            {/* BACKEND PLACEHOLDER: Actual grade data */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 mb-4">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>BACKEND NOTE:</strong> Replace mock subject grades with
                actual grade data from database
              </p>
            </div>

            {/* Elementary School Subject Grades */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                Learning Areas
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-700">
                      <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                        Learning Area
                      </th>
                      <th className="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                        Quarter Grade
                      </th>
                      <th className="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                    {subjectGrades.map((subject, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-slate-700"
                      >
                        <td className="px-4 py-2 text-gray-800 dark:text-white">
                          {subject.name}
                        </td>
                        <td className="px-4 py-2 text-center font-mono text-gray-800 dark:text-white">
                          {subject.grade}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getGradeColor(
                              subject.grade
                            )}`}
                          >
                            {getGradeRemarks(subject.grade)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grading Scale and Teacher's Comments */}
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Grading Scale
                </h4>
                <div className="space-y-1 text-gray-600 dark:text-gray-400">
                  <p>90-100: Outstanding</p>
                  <p>85-89: Very Satisfactory</p>
                  <p>80-84: Satisfactory</p>
                  <p>75-79: Fairly Satisfactory</p>
                  <p>Below 75: Needs Improvement</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Teacher's Comments
                </h4>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  {reportCard.gpa >= 85
                    ? `${reportCard.studentName} shows excellent progress in all learning areas. Demonstrates curiosity and active participation in class activities.`
                    : `${reportCard.studentName} is developing well. Shows improvement in reading and writing skills. Continue practicing mathematics daily.`}
                </p>
                {/* BACKEND PLACEHOLDER: Actual teacher comments */}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                  [BACKEND: Replace with actual teacher comments from database]
                </div>
              </div>
            </div>

            {/* Parent's Signature Section */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-600">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Parent's Signature:
                  </p>
                  <div className="border-b border-gray-300 dark:border-slate-500 pb-1 min-h-8"></div>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Date Received:
                  </p>
                  <div className="border-b border-gray-300 dark:border-slate-500 pb-1 min-h-8"></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Generated on March 25, 2024 • Official document of Sample
                Elementary School
              </p>
              {/* BACKEND PLACEHOLDER: Official school footer */}
              <div className="mt-1 text-xs text-gray-400 dark:text-gray-600">
                [BACKEND: Replace with official school footer and signatures]
              </div>
            </div>
          </div>

          {/* Action Buttons with Backend Notes */}
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={handlePrint}>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print (PDF)
            </Button>
            {reportCard.status === "Ready" && (
              <Button variant="primary" onClick={handleRelease}>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Release to Parent
              </Button>
            )}
          </div>

          {/* Backend Integration Requirements */}
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm">
              Backend Integration Required:
            </h4>
            <ul className="text-slate-600 dark:text-slate-400 text-xs space-y-1">
              <li>• PDF generation with official school template</li>
              <li>• Actual student grade data from database</li>
              <li>• Teacher comments from grade submission system</li>
              <li>• Official school branding and signatures</li>
              <li>• Email notification system for parent releases</li>
              <li>• Portal integration for parent access</li>
            </ul>
          </div>
        </div>
      </Modal>

      <ReleaseConfirmationModal
        isOpen={showReleaseModal}
        onClose={handleCloseReleaseModal}
        onConfirm={handleConfirmRelease}
        reportCard={reportCard}
      />
    </>
  );
};

export default ViewReportCardModal;
