import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createItem } from "../api/itemApi";

const AddItem = () => {
  const navigate = useNavigate();

  const initialData = {
    title: "",
    author: "",
    category: "Book",
    publishYear: "",
    isbn: "",
    publisher: "",
    status: "AVAILABLE",
    coverImage: "",
    description: "",
    location: "",
    // Book
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
    // Journal
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "",
    // Comic
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
  };

  const [itemData, setItemData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...itemData,
        publishYear: itemData.publishYear
          ? parseInt(itemData.publishYear, 10)
          : null,
        pageCount:
          itemData.category === "Book" && itemData.pageCount
            ? parseInt(itemData.pageCount, 10)
            : undefined,
        volumeNumber:
          itemData.category === "Comic" && itemData.volumeNumber
            ? parseInt(itemData.volumeNumber, 10)
            : undefined,
      };

      await createItem(dataToSend);

      Swal.fire({
        icon: "success",
        title: "เพิ่มหนังสือสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
      });

      setItemData(initialData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create item", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.response?.data?.message || "ไม่สามารถเพิ่มสินค้าได้",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <div className="card bg-base-100 shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">➕ เพิ่มสินค้าใหม่</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ---- Common Fields ---- */}
          <div className="form-control">
            <label className="label">ประเภทสินค้า</label>
            <select
              name="category"
              value={itemData.category}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="Book">หนังสือ (Book)</option>
              <option value="Journal">วารสาร (Journal)</option>
              <option value="Comic">การ์ตูน (Comic)</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">ชื่อเรื่อง</label>
            <input
              type="text"
              name="title"
              value={itemData.title}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">ผู้แต่ง</label>
            <input
              type="text"
              name="author"
              value={itemData.author}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">URL รูปปก</label>
            <input
              type="text"
              name="coverImage"
              value={itemData.coverImage}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">ปีที่พิมพ์</label>
            <input
              type="number"
              name="publishYear"
              value={itemData.publishYear}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">สำนักพิมพ์</label>
            <input
              type="text"
              name="publisher"
              value={itemData.publisher}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">คำอธิบาย</label>
            <textarea
              name="description"
              value={itemData.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
            ></textarea>
          </div>

          <div className="divider">รายละเอียดเพิ่มเติม</div>

          {/* ---- Conditional Fields ---- */}
          {itemData.category === "Book" && (
            <>
              <h4 className="font-bold">รายละเอียดหนังสือ</h4>
              <input
                name="isbn"
                value={itemData.isbn}
                onChange={handleChange}
                placeholder="ISBN"
                className="input input-bordered mb-2"
              />
              <input
                name="edition"
                value={itemData.edition}
                onChange={handleChange}
                placeholder="ครั้งที่พิมพ์"
                className="input input-bordered mb-2"
              />
              <input
                type="number"
                name="pageCount"
                value={itemData.pageCount}
                onChange={handleChange}
                placeholder="จำนวนหน้า"
                className="input input-bordered mb-2"
              />
            </>
          )}

          {itemData.category === "Journal" && (
            <>
              <h4 className="font-bold">รายละเอียดวารสาร</h4>
              <input
                name="issn"
                value={itemData.issn}
                onChange={handleChange}
                placeholder="ISSN"
                className="input input-bordered mb-2"
              />
              <input
                name="volume"
                value={itemData.volume}
                onChange={handleChange}
                placeholder="เล่มที่"
                className="input input-bordered mb-2"
              />
              <input
                name="issue"
                value={itemData.issue}
                onChange={handleChange}
                placeholder="ฉบับที่"
                className="input input-bordered mb-2"
              />
            </>
          )}

          {itemData.category === "Comic" && (
            <>
              <h4 className="font-bold">รายละเอียดการ์ตูน</h4>
              <input
                name="series"
                value={itemData.series}
                onChange={handleChange}
                placeholder="ชื่อซีรี่ส์"
                className="input input-bordered mb-2"
              />
              <input
                type="number"
                name="volumeNumber"
                value={itemData.volumeNumber}
                onChange={handleChange}
                placeholder="เล่มที่ในซีรี่ส์"
                className="input input-bordered mb-2"
              />
              <input
                name="illustrator"
                value={itemData.illustrator}
                onChange={handleChange}
                placeholder="ผู้วาด"
                className="input input-bordered mb-2"
              />
            </>
          )}

          <button type="submit" className="btn btn-primary w-full mt-4">
            ✅ เพิ่มสินค้า
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
