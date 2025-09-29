import React from 'react';

const ComicForm = ({ formData, handleChange }) => {
  return (
    <>
      <hr className="my-4" />
      <h4>รายละเอียดการ์ตูน (Comic Details)</h4>

      <div className="mb-3">
        <label className="form-label">ชื่อซีรี่ส์ (Series)</label>
        <input
          type="text"
          name="series"
          value={formData.series || ''}
          onChange={handleChange}
          placeholder="เช่น One Piece, Dragon Ball"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">เล่มที่ (Volume Number)</label>
        <input
          type="number"
          name="volumeNumber"
          value={formData.volumeNumber || ''}
          onChange={handleChange}
          placeholder="เช่น 1, 2, 3..."
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ผู้วาด (Illustrator)</label>
        <input
          type="text"
          name="illustrator"
          value={formData.illustrator || ''}
          onChange={handleChange}
          placeholder="ชื่อผู้วาดภาพประกอบ"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ประเภทสี (Color Type)</label>
        <input
          type="text"
          name="colorType"
          value={formData.colorType || ''}
          onChange={handleChange}
          placeholder="เช่น สี, ขาวดำ"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">กลุ่มเป้าหมาย (Target Age)</label>
        <input
          type="text"
          name="targetAge"
          value={formData.targetAge || ''}
          onChange={handleChange}
          placeholder="เช่น ทั่วไป, 18+"
          className="form-control"
        />
      </div>
    </>
  );
};

export default ComicForm;