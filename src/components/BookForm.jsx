import React, { useState } from "react";
import { createItem, updateItem } from "../api/itemApi";

export default function BookForm({ book, onSuccess }) {
  const [formData, setFormData] = useState(book || {
    title: "",
    author: "",
    category: "Classic Literature",
    publishYear: "",
    isbn: "",
    publisher: "",
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
    description: "",
    coverImage: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (book) await updateItem(book.itemId, formData);
    else await createItem(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" />
      <input name="publishYear" type="number" value={formData.publishYear} onChange={handleChange} placeholder="Publish Year" />
      <input name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" />
      <input name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher" />
      <input name="edition" value={formData.edition} onChange={handleChange} placeholder="Edition" />
      <input name="pageCount" type="number" value={formData.pageCount} onChange={handleChange} placeholder="Page Count" />
      <input name="language" value={formData.language} onChange={handleChange} placeholder="Language" />
      <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="Cover Image URL" />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      <button type="submit">{book ? "Update Book" : "Add Book"}</button>
    </form>
  );
}
