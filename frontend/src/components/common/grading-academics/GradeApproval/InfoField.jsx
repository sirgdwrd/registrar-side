import React from 'react';

const InfoField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
      {label}
    </label>
    <p className="text-gray-800 dark:text-white font-medium">
      {value || 'N/A'}
    </p>
  </div>
);

export default InfoField;