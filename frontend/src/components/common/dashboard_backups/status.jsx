import React from 'react';
import { Link } from 'react-router-dom';
import { 
  NotebookText, 
  CalendarDays, 
  FileText, 
  CreditCard, 
  Library, 
  MessageCircleQuestion 
} from 'lucide-react';

const QuickAccessCard = ({ icon, title, subtitle, tooltipText, path }) => {
  return (
    <Link 
      to={path} 
      className='relative block bg-white dark:bg-slate-800 rounded-xl p-4 hover:shadow-md transition-all duration-300 group border border-gray-100 dark:border-slate-700'
    >
      <div className='flex items-start gap-4'>
        <div className='bg-[#F4D77D] dark:bg-slate-700 p-2.5 rounded-lg text-gray-800 dark:text-amber-300'>
          {icon}
        </div>
        <div>
          <h3 className='text-sm font-bold text-gray-800 dark:text-gray-100 mb-1'>{title}</h3>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{subtitle}</p>
        </div>
      </div>

      <span className="
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
        bg-gray-900 text-white text-xs font-bold 
        rounded-md px-2 py-1 
        opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
        transition-all duration-300 ease-in-out
        whitespace-nowrap
        z-10
      ">
        {tooltipText || title}
      </span>
    </Link>
  );
};

const Status = () => {
  const quickAccessItems = [
    { 
      icon: <NotebookText size={20} />, 
      title: 'Subjects', 
      subtitle: '7 Active',
      tooltipText: 'View Subjects',
      path: '/student-dashboard/subject'
    },
    { 
      icon: <CalendarDays size={20} />, 
      title: 'Events', 
      subtitle: '3 Ongoing',
      tooltipText: 'See All Events',
      path: '/student-dashboard/events' 
    },
    { 
      icon: <FileText size={20} />, 
      title: 'Document Request', 
      subtitle: '0 Pending',
      tooltipText: 'Request a Document',
      path: '/student-dashboard/document-request'
    },
    { 
      icon: <CreditCard size={20} />, 
      title: 'Pay Tuition', 
      subtitle: 'View Balance',
      tooltipText: 'Go to Payment Portal',
      path: '/student-dashboard/pay-tuiton'
    },
    { 
      icon: <Library size={20} />, 
      title: 'Library Access', 
      subtitle: '10 Books Available',
      tooltipText: 'Open Library Portal',
      path: '/student-dashboard/library' 
    },
    { 
      icon: <MessageCircleQuestion size={20} />, 
      title: 'Teacher Q&A Corner', 
      subtitle: 'Ask About...',
      tooltipText: 'Ask a Teacher',
      path: '/student-dashboard/teacher-qa' 
    },
  ];

  return (
    <div className='mb-6'>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4'>
        {quickAccessItems.map((item, index) => (
          <QuickAccessCard
            key={index}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            tooltipText={item.tooltipText}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Status;