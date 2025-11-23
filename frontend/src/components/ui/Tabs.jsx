import React from 'react';

const Tabs = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  variant = 'default' // default, pills, underline
}) => {
  const containerClasses = {
    default: 'border-b border-gray-200 dark:border-slate-700',
    pills: 'bg-gray-100 dark:bg-slate-800 rounded-lg p-1',
    underline: 'border-b border-gray-200 dark:border-slate-700'
  };

  const tabClasses = {
    default: {
      active: 'border-amber-500 text-amber-600 dark:text-amber-400',
      inactive: 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
    },
    pills: {
      active: 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm',
      inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
    },
    underline: {
      active: 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400',
      inactive: 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
    }
  };

  const getTabClassName = (tabId, variant) => {
    const baseClasses = {
      default: 'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
      pills: 'py-2 px-4 rounded-md font-medium text-sm transition-colors',
      underline: 'py-4 px-1 border-b-2 font-medium text-sm transition-colors'
    };

    const isActive = activeTab === tabId;
    const statusClass = isActive ? tabClasses[variant].active : tabClasses[variant].inactive;
    
    return `${baseClasses[variant]} ${statusClass}`;
  };

  return (
    <div className={containerClasses[variant]}>
      <nav className={variant === 'pills' ? 'flex space-x-1' : 'flex space-x-8'}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={getTabClassName(tab.id, variant)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;