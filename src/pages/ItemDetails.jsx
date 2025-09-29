import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getItemById } from '../api/itemApi';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(id);
        setItem(response.data);
      } catch (error) {
        console.error('Failed to fetch item details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <div className="text-center py-10">⏳ กำลังโหลด...</div>;
  if (!item) return <div className="text-center py-10">❌ ไม่พบข้อมูลสินค้า</div>;

  const renderSpecificDetails = () => {
    switch (item.category) {
      case 'Book':
        return (
          <>
            <p><strong>ครั้งที่พิมพ์:</strong> {item.edition}</p>
            <p><strong>จำนวนหน้า:</strong> {item.pageCount}</p>
            <p><strong>ภาษา:</strong> {item.language}</p>
            <p><strong>ประเภท:</strong> {item.genre}</p>
          </>
        );
      case 'Journal':
        return (
          <>
            <p><strong>ISSN:</strong> {item.issn}</p>
            <p><strong>เล่มที่:</strong> {item.volume}</p>
            <p><strong>ฉบับที่:</strong> {item.issue}</p>
            <p><strong>ความถี่ในการออก:</strong> {item.publicationFrequency}</p>
          </>
        );
      case 'Comic':
        return (
          <>
            <p><strong>ชื่อซีรี่ส์:</strong> {item.series}</p>
            <p><strong>เล่มที่ในซีรี่ส์:</strong> {item.volumeNumber}</p>
            <p><strong>ผู้วาด:</strong> {item.illustrator}</p>
            <p><strong>ประเภทสี:</strong> {item.colorType}</p>
            <p><strong>กลุ่มเป้าหมาย:</strong> {item.targetAge}</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        {/* รูปปก */}
        <figure className="w-full lg:w-1/3">
          <img
            src={item.coverImage}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </figure>

        {/* รายละเอียด */}
        <div className="card-body">
          <h2 className="card-title text-2xl">{item.title}</h2>
          <p><strong>ผู้แต่ง/ผู้เขียน:</strong> {item.author}</p>
          <p><strong>สำนักพิมพ์:</strong> {item.publisher}</p>
          <p><strong>ปีที่พิมพ์:</strong> {item.publishYear}</p>
          <p><strong>ISBN/ISSN:</strong> {item.isbn || item.issn}</p>
          <p><strong>สถานะ:</strong> 
            <span className={`badge ${item.status === 'AVAILABLE' ? 'badge-success' : 'badge-error'} ml-2`}>
              {item.status}
            </span>
          </p>
          <p><strong>ตำแหน่ง:</strong> {item.location}</p>

          <div className="divider"></div>
          {renderSpecificDetails()}
          <div className="divider"></div>

          <h3 className="font-bold">คำอธิบาย</h3>
          <p>{item.description}</p>

          {/* ปุ่ม */}
          <div className="card-actions justify-end mt-4">
            <Link to="/" className="btn btn-secondary">⬅ กลับหน้าหลัก</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
