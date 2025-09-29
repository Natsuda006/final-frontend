import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>โดย: {item.author}</p>
        <p className="text-sm opacity-70">ประเภท: {item.category}</p>
        <div className="card-actions justify-end mt-2">
          <Link to={`/item/${item.itemId}`} className="btn btn-secondary">
            ดูรายละเอียด
          </Link>
          <Link to={`/edit/${item.itemId}`} className="btn btn-warning">
            แก้ไข
          </Link>
          <button
            onClick={() => onDelete(item.itemId)}
            className="btn btn-error"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
