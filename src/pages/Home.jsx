import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import BookService from "../api/bookApi";
import ComicService from "../api/comicsApi";
import JournalService from "../api/journalApi";
import Items from "../components/Item";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [comics, setComics] = useState([]);
  const [journals, setJournals] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, book, comic, journal

  useEffect(() => {
    fetchAllItems();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterType, searchKeyword, books, comics, journals]);

  const fetchAllItems = async () => {
    try {
      setLoading(true);
      const [bookRes, comicRes, journalRes] = await Promise.all([
        BookService.getAll(),
        ComicService.getAll(),
        JournalService.getAll(),
      ]);

      const booksData = bookRes.data?.data || [];
      const comicsData = comicRes.data?.data || [];
      const journalsData = journalRes.data?.data || [];

      setBooks(booksData);
      setComics(comicsData);
      setJournals(journalsData);

      setFilteredBooks(booksData);
      setFilteredComics(comicsData);
      setFilteredJournals(journalsData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "ไม่สามารถโหลดข้อมูลหนังสือได้",
      });
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const applyFilters = () => {
    const lowerKeyword = searchKeyword.toLowerCase();

    const filterFunc = (item) =>
      !searchKeyword ||
      item.title?.toLowerCase().includes(lowerKeyword) ||
      item.author?.toLowerCase().includes(lowerKeyword) ||
      item.category?.toLowerCase().includes(lowerKeyword);

    setFilteredBooks(
      books.filter((item) => (filterType === "all" || filterType === "book") && filterFunc(item))
    );
    setFilteredComics(
      comics.filter((item) => (filterType === "all" || filterType === "comic") && filterFunc(item))
    );
    setFilteredJournals(
      journals.filter((item) => (filterType === "all" || filterType === "journal") && filterFunc(item))
    );
  };

  if (loading) {
    return (
      <div className="text-center p-4 text-lg">⏳ กำลังโหลดข้อมูล...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-10">
   {/* Title */}
<div className="text-center mb-6">
  <h1 className="text-2xl md:text-5xl font-extrabold tracking-wide text-indigo-500 dark:text-indigo-400">
    📖 Library Items 📖
  </h1>
</div>

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-lg">
          <input
            type="search"
            value={searchKeyword}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="ค้นหา..."
            className="input input-bordered w-full pl-10 pr-4 py-2 rounded-xl text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <span className="absolute left-3 top-2 text-gray-400 text-sm">🔍</span>
        </div>
      </div>

      {/* Filter Tabs */}
<div className="flex justify-center mb-8 gap-2 flex-wrap">
  {["all", "book", "comic", "journal"].map((type) => (
    <button
      key={type}
      onClick={() => setFilterType(type)}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
        filterType === type
          ? "bg-indigo-600 text-white"
          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white"
      }`}
    >
      {type === "all"
        ? "All"
        : type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  ))}
</div>

{/* Items */}
{(filterType === "all" || filterType === "book") && (
  <>
    <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400 tracking-wide relative inline-block">
      📙 Books
  <span className="absolute left-0 -bottom-1 w-full h-1 bg-purple-300 rounded-full opacity-50"></span>
    </h2>
    <Items items={filteredBooks} type="book" />
  </>
)}

{(filterType === "all" || filterType === "comic") && (
  <>
    <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-pink-600 dark:text-pink-400 tracking-wide relative inline-block">
      🎨 Comics
      <span className="absolute left-0 -bottom-1 w-full h-1 bg-pink-300 rounded-full opacity-50"></span>
    </h2>
    <Items items={filteredComics} type="comic" />
  </>
)}

{(filterType === "all" || filterType === "journal") && (
  <>
    <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-teal-600 dark:text-teal-400 tracking-wide relative inline-block">
      📰 Journals
      <span className="absolute left-0 -bottom-1 w-full h-1 bg-teal-300 rounded-full opacity-50"></span>
    </h2>
    <Items items={filteredJournals} type="journal" />
  </>
)}



    </div>
  );
};

export default Home;
