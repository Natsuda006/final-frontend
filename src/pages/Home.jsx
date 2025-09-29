import React, { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../api/itemApi';
import ItemCard from '../components/ItemCard';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await getItems();
        setItems(responseData.data);
      } catch (err) {
        setError('❌ ไม่สามารถโหลดข้อมูลได้');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
      try {
        await deleteItem(id);
        setItems(items.filter((item) => item.itemId !== id));
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบสินค้า');
        console.error(err);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 font-bold mt-10">{error}</div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📚 รายการสินค้าทั้งหมด
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.itemId} item={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;
