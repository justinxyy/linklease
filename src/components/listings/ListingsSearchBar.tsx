
import React from "react";
import SearchBar from "@/components/SearchBar";
import { cn } from "@/lib/utils";

interface ListingsSearchBarProps {
  isSearchSticky: boolean;
  children?: React.ReactNode;
}

const ListingsSearchBar = ({ isSearchSticky, children }: ListingsSearchBarProps) => {
  return (
    <div 
      className={cn(
        "search-bar-sticky z-20 bg-background py-4",
        isSearchSticky ? "sticky top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8 stuck" : ""
      )}
    >
      <SearchBar variant="expanded" className="mb-4" />
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        {children}
      </div>
    </div>
  );
};

export default ListingsSearchBar;
