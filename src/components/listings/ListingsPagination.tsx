
import React from "react";

const ListingsPagination = () => {
  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center gap-1">
        <button className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50 transition-colors">
          Previous
        </button>
        <button className="w-10 h-10 rounded-md flex items-center justify-center bg-brand-50 text-brand-600 border-brand-200 border font-medium">
          1
        </button>
        <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors border">
          2
        </button>
        <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors border">
          3
        </button>
        <span className="px-2">...</span>
        <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors border">
          8
        </button>
        <button className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50 transition-colors">
          Next
        </button>
      </nav>
    </div>
  );
};

export default ListingsPagination;
