import React, { useState, useCallback } from "react";
import ScreeningHeader from "./screeningLayout/screeningHeader";
import ScreeningFilter from "./screeningLayout/screeningFilter";
import ScreeningTable from "./screeningLayout/screeningTable";

const Screening = ({ onValidated }) => {
  const [filters, setFilters] = useState({
    documentStatus: "All Status",
    studentType: "All Types",
  });

  // ✅ Memoized callback to prevent infinite re-renders
  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => {
      // Avoid unnecessary updates if same values
      if (
        prev.documentStatus === newFilters.documentStatus &&
        prev.studentType === newFilters.studentType
      ) {
        return prev;
      }
      return newFilters;
    });
  }, []);

  return (
    <>
      <ScreeningHeader />
      <ScreeningFilter onFilterChange={handleFilterChange} />
      <ScreeningTable filterOptions={filters} onValidated={onValidated} />
    </>
  );
};

export default Screening;
