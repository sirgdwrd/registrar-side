import React, { useState } from 'react';
import ReviewHeader from './reviewLayout/reviewHeader'
import ReviewSectionxFilter from './reviewLayout/reviewsectionxFilter'
import ReviewTable from './reviewLayout/reviewTable'

const Review = () => {

  return (
    <>
      <ReviewHeader/>
      <ReviewSectionxFilter/>
      <ReviewTable/>
    </>
  );
};

export default Review;