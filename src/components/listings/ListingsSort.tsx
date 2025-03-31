
import React from "react";
import { ArrowDownUp } from "lucide-react";

interface ListingsSortProps {
  sortOption: string;
  setSortOption: (value: string) => void;
}

const ListingsSort = ({ sortOption, setSortOption }: ListingsSortProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <select
        className="text-sm border rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="recommended">Recommended</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="date_newest">Newest</option>
      </select>
    </div>
  );
};

export default ListingsSort;
