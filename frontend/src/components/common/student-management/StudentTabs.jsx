import React, { useState } from 'react';
import Tabs from "@/components/ui/Tabs";
import EnrollmentCompletion from './EnrollmentCompletion/index';
import ClassRosters from './ClassRosters/index';
import AllStudents from './AllStudents/index';

const StudentTabs = () => {
  const [activeTab, setActiveTab] = useState('enrollment');

  const tabs = [
    { id: 'enrollment', label: 'Enrollment Completion' },
    { id: 'rosters', label: 'Class Rosters' },
    { id: 'all', label: 'All Students' }
  ];

  return (
    <div className="w-full">
      <Tabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="underline"
      />

      <div className="py-4">
        {activeTab === 'enrollment' && <EnrollmentCompletion />}
        {activeTab === 'rosters' && <ClassRosters />}
        {activeTab === 'all' && <AllStudents />}
      </div>
    </div>
  );
};

export default StudentTabs; // Make sure this line says "export default"