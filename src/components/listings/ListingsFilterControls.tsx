
import React from "react";
import ListingsFilters from "./ListingsFilters";
import ListingsViewToggle from "./ListingsViewToggle";

interface ListingsFilterControlsProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedPropertyType: string;
  setSelectedPropertyType: (value: string) => void;
  propertyTypes: string[];
  showMap: boolean;
  setShowMap: (value: boolean) => void;
}

const ListingsFilterControls = ({
  isFilterOpen,
  setIsFilterOpen,
  priceRange,
  setPriceRange,
  selectedPropertyType,
  setSelectedPropertyType,
  propertyTypes,
  showMap,
  setShowMap
}: ListingsFilterControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <ListingsFilters
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedPropertyType={selectedPropertyType}
        setSelectedPropertyType={setSelectedPropertyType}
        propertyTypes={propertyTypes}
      />
      <ListingsViewToggle showMap={showMap} setShowMap={setShowMap} />
    </div>
  );
};

export default ListingsFilterControls;
