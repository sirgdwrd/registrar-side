import React, { useState, useCallback } from "react";
import ReviewHeader from "./reviewLayout/reviewHeader";
import ReviewSection from "./reviewLayout/reviewSection";
import ReviewFilter from "./reviewLayout/reviewFilter";
import ReviewTable from "./reviewLayout/reviewTable";


const Review = ({ reviewApplicants = [] }) => {
    const [sectionUpdateTrigger, setSectionUpdateTrigger] = useState(0);
    const triggerSectionUpdate = useCallback(() => {
        setSectionUpdateTrigger(prev => prev + 1);
        console.log("Section update triggered:", sectionUpdateTrigger + 1);
    }, [sectionUpdateTrigger]); 

    return (
        <>
            <ReviewHeader/>
            <ReviewSection sectionUpdateTrigger={sectionUpdateTrigger} />
            <ReviewFilter/>
            <ReviewTable 
                applicants={reviewApplicants}
                triggerSectionUpdate={triggerSectionUpdate} 
            />
        </>
    );
};

export default Review;