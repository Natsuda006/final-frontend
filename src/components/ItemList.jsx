import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../api/itemApi";
import { Link } from "react-router-dom";

export default function ItemList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const data = await getItems(); 
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchBooks();
  };

  return (
    <div>
      <h2>รายการหนังสือ</h2>
      <Link to="/add">เพิ่มหนังสือ</Link>
      <ul>
        {books.map((book) => (
          <li key={book.itemId}>
            <strong>{book.title}</strong> ({book.category}) - {book.publishYear}
            <Link to={`/edit/${book.itemId}`}>แก้ไข</Link>
            <button onClick={() => handleDelete(book.itemId)}>ลบ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
