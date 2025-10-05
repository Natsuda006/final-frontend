// src/components/ItemCard.jsx
import React from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

import BookService from "../api/bookApi";
import ComicService from "../api/comicsApi";
import JournalService from "../api/journalApi";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  if (!item) return null;

  const formattedDate = item.addedDate
    ? new Date(item.addedDate).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const statusColors = {
    AVAILABLE: "badge-success",
    BORROWED: "badge-warning",
    RESERVED: "badge-error",
  };

  const getServiceByType = (type) => {
    const t = (type || "").toLowerCase();
    if (t === "book" || t === "books") return BookService;
    if (t === "comic" || t === "comics") return ComicService;
    if (t === "journal" || t === "journals") return JournalService;
    console.warn("ไม่พบ service สำหรับ type:", type);
    return null;
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "การลบหนังสือเล่มนี้จะไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        const service = getServiceByType(item.type);
        if (!service) {
          Swal.fire({
            icon: "error",
            title: "ไม่พบประเภทหนังสือ",
            text: "ไม่สามารถลบหนังสือเล่มนี้ได้",
          });
          return;
        }

        await service.remove(item.itemId);

        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          text: "หนังสือเล่มนี้ถูกลบเรียบร้อยแล้ว",
          timer: 2000,
          showConfirmButton: false,
        });

        window.location.reload();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถลบได้",
          text: error.response?.data?.message || error.message,
        });
      }
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 hover:scale-[1.02]">
      <figure className="h-56 bg-gray-100">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title || "No title"}
            className="w-full h-full object-cover rounded-t-xl"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            ไม่มีรูปภาพ
          </div>
        )}
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold">
          {item.title || "-"}
          {item.status && (
            <div className={`badge ${statusColors[item.status] || "badge-ghost"}`}>
              {item.status}
            </div>
          )}
        </h2>

        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          {item.author && (
            <p>
              <span className="font-semibold">ผู้แต่ง:</span> {item.author}
            </p>
          )}
          <p>
            <span className="font-semibold">ประเภท:</span> {item.category || "-"}
          </p>
          <p>
            <span className="font-semibold">วันที่เพิ่ม:</span> {formattedDate}
          </p>
          {item.location && (
            <p>
              <span className="font-semibold">สถานที่:</span> {item.location}
            </p>
          )}
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            onClick={handleDelete}
            className="btn btn-error btn-sm text-white"
          >
            ลบ
          </button>
          <Link
            to={`/items/update/${(item.type || "").toLowerCase()}/${item.itemId || ""}`}
            className="btn btn-info btn-sm text-white"
          >
            แก้ไข
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
