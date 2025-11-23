import React from 'react';

const TablePagination = ({ 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  handlePageChange, 
  handleItemsPerPageChange 
}) => {
  
  if (totalPages <= 1) return null; 

  return (
    <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg shadow">
      {/* Left side: Rows per page selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="itemsPerPage" className="text-sm text-gray-700 dark:text-gray-300">
          Rows per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="text-sm border border-gray-300 rounded-md py-1 px-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Right side: Page navigation */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
          title="Previous Page"
        >
           {"<"}
        </button>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
          title="Next Page"
        >
           {">"}
        </button>
      </div>
    </div>
  );
};

export default TablePagination;