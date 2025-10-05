import React from "react";
import Card from "./ItemCard";

const Items = ({ items, type }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="alert alert-info text-center col-span-full">
        <span>No Content.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {items.map((item) => (
        <Card
          key={item.itemId || item.id}
          item={{ ...item, type }}
        />
      ))}
    </div>
  );
};

export default Items;