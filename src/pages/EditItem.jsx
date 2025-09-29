import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById, updateItem } from "../api/itemApi";
import ItemForm from "../components/ItemForm";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(id);
        setInitialData(response.data);
      } catch (error) {
        console.error("Failed to fetch item", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const dataToSend = {
        ...formData,
        publishYear: formData.publishYear
          ? parseInt(formData.publishYear, 10)
          : null,
        pageCount:
          formData.category === "Book"
            ? parseInt(formData.pageCount, 10)
            : undefined,
        volumeNumber:
          formData.category === "Comic"
            ? parseInt(formData.volumeNumber, 10)
            : undefined,
      };

      await updateItem(id, dataToSend);

    
      import("sweetalert2").then((Swal) => {
        Swal.default.fire({
          icon: "success",
          title: "อัปเดตข้อมูลสำเร็จ!",
          showConfirmButton: false,
          timer: 1500,
        });
      });

      navigate(`/item/${id}`);
    } catch (error) {
      console.error("Failed to update item", error);
      import("sweetalert2").then((Swal) => {
        Swal.default.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถอัปเดตข้อมูลได้",
        });
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (!initialData)
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ ไม่พบข้อมูลสินค้า
      </div>
    );

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <div className="card bg-base-100 shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          ✏️ แก้ไขข้อมูล: <span className="text-primary">{initialData.title}</span>
        </h1>
        <ItemForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isEditMode={true}
        />
      </div>
    </div>
  );
};

export default EditItem;
