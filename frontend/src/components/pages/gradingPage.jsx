import React from 'react'
import GradingTabs from '../common/grading-academics/GradingTabs'

const GradingPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Grading and Academics</h1>
      <GradingTabs />
    </div>
  )
}

export default GradingPage