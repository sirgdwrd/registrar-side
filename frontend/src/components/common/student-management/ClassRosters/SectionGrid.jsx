import React from 'react';
import SectionCard from './SectionCard';

const SectionGrid = ({ sections, selectedSection, onSectionSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          isSelected={selectedSection?.id === section.id}
          onClick={() => onSectionSelect(section)}
        />
      ))}
    </div>
  );
};

export default SectionGrid;