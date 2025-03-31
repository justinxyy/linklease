
import React from "react";
import { Filter, Check, DollarSign, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ListingsFiltersProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedPropertyType: string;
  setSelectedPropertyType: (value: string) => void;
  propertyTypes: string[];
}

const ListingsFilters = ({
  isFilterOpen,
  setIsFilterOpen,
  priceRange,
  setPriceRange,
  selectedPropertyType,
  setSelectedPropertyType,
  propertyTypes,
}: ListingsFiltersProps) => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <Filter className="h-4 w-4" />
        Filters
      </Button>
      
      {isFilterOpen && (
        <div className="bg-card rounded-xl border p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Price Range */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <DollarSign className="h-5 w-5 text-brand-500" />
                Price Range
              </h3>
              <div className="px-2">
                <Slider
                  defaultValue={priceRange}
                  min={300}
                  max={3000}
                  step={50}
                  onValueChange={(value) => setPriceRange(value)}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">${priceRange[0]}</span>
                  <span className="text-sm text-muted-foreground">to</span>
                  <span className="text-sm font-medium">${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            {/* Property Type */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <MapPin className="h-5 w-5 text-brand-500" />
                Property Type
              </h3>
              <div className="space-y-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors",
                      selectedPropertyType === type
                        ? "bg-brand-50 text-brand-600"
                        : "hover:bg-gray-50 text-foreground"
                    )}
                    onClick={() => setSelectedPropertyType(type)}
                  >
                    <span>{type}</span>
                    {selectedPropertyType === type && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Availability */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <Calendar className="h-5 w-5 text-brand-500" />
                Availability
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-white border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-white border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-8 pt-6 border-t gap-3">
            <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(false)}>
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="bg-brand-500 hover:bg-brand-600"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingsFilters;
