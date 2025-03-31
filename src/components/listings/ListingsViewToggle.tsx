
import React from "react";
import { Map, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingsViewToggleProps {
  showMap: boolean;
  setShowMap: (value: boolean) => void;
}

const ListingsViewToggle = ({ showMap, setShowMap }: ListingsViewToggleProps) => {
  return (
    <div className="flex items-center bg-muted rounded-md p-1">
      <Button
        variant={showMap ? "ghost" : "secondary"}
        size="sm"
        className="flex items-center gap-1.5"
        onClick={() => setShowMap(false)}
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
      <Button
        variant={showMap ? "secondary" : "ghost"}
        size="sm"
        className="flex items-center gap-1.5"
        onClick={() => setShowMap(true)}
      >
        <Map className="h-4 w-4" />
        <span className="hidden sm:inline">Map</span>
      </Button>
    </div>
  );
};

export default ListingsViewToggle;
