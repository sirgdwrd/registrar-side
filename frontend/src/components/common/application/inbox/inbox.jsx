import React, { useState } from "react";
import InboxHeader from "./inboxLayout/inboxHeader";
import InboxFilter from "./inboxLayout/inboxFilter";
import InboxTable from "./inboxLayout/inboxTable";

const Inbox = ({ onProceedToScreening }) => {
  // --- State for filters ---
  const [filtersState, setFiltersState] = useState({
    "Student Type": "All Types",
    "Date Submitted": "All Dates",
    "Grade Level": "All Grades",
  });

  return (
    <>
      <InboxHeader />
       {/* new comment */}
      {/* Pass filters state to the filter component */}
      <InboxFilter filtersState={filtersState} setFiltersState={setFiltersState} />

      {/* Pass filters state to the table so it can filter */}
      <InboxTable filtersState={filtersState} onProceedToScreening={onProceedToScreening} />
    </>
  );
};

export default Inbox;
