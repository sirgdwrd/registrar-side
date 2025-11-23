import React from 'react'
import StudentTabs from '../common/student-management/StudentTabs'

const StudentPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      <StudentTabs />
    </div>
  )
}

export default StudentPage