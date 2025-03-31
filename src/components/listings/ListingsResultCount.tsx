
import React from "react";

interface ListingsResultCountProps {
  count: number;
  isLoading: boolean;
}

const ListingsResultCount = ({ count, isLoading }: ListingsResultCountProps) => {
  return (
    <div className="text-sm text-muted-foreground mb-6">
      {isLoading ? (
        <p>Loading listings...</p>
      ) : count > 0 ? (
        <p>Showing {count} available subleases</p>
      ) : (
        <p>No listings found</p>
      )}
    </div>
  );
};

export default ListingsResultCount;
