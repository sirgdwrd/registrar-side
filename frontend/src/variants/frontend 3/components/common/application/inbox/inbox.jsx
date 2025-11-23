import React, { useState } from 'react';
import { Text, Contrast, EyeOff } from 'lucide-react';

const Inbox = () => {
  const [fontSize, setFontSize] = useState('Default');

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Accessibility
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Customize the experience to fit your needs.
      </p>

      <div className="py-4 border-b border-gray-100 dark:border-slate-700">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Font Size</h4>
        <div className="flex gap-2">
          {['Small', 'Default', 'Large'].map(size => (
            <div key={size} className="relative group">
              <button 
                onClick={() => setFontSize(size)} 
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${fontSize === size ? 'bg-amber-400 text-stone-900' : 'bg-gray-100 dark:bg-slate-700'}`}
              >
                {size}
              </button>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
                Set font size to {size}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        <div className="relative group">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Contrast className="text-indigo-500" />
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">High Contrast Mode</h4>
            </div>
            <div className="w-12 h-6 rounded-full p-1 bg-gray-300 dark:bg-slate-600">
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
          </div>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
            Increases text and element contrast
          </span>
        </div>

        <div className="relative group">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <EyeOff className="text-rose-500" />
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Reduce Motion</h4>
            </div>
            <div className="w-12 h-6 rounded-full p-1 bg-green-500">
              <div className="w-4 h-4 rounded-full bg-white transform translate-x-6" />
            </div>
          </div>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
            Disables animations and transitions
          </span>
        </div>
      </div>
    </div>
  );
};

export default Inbox;