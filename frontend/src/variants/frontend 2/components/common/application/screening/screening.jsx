import React, { useState } from 'react';
import ScreeningHeader from './screeningLayout/screeningHeader'
import ScreeningFilter from './screeningLayout/screeningFilter'
import ScreeningTable from './screeningLayout/screeningTable'

const Screening = () => {
  
  return (
    
    <>
      <ScreeningHeader/>
      <ScreeningFilter/>
      <ScreeningTable/>
    </>
    
  );
};

export default Screening;