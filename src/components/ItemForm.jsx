import React, { useState } from 'react';

const ItemForm = ({ initialData, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      {/* Category Selection */}
      <div className="form-group">
        <label>ประเภทสินค้า</label>
        <select name="category" value={formData.category} onChange={handleChange} disabled={isEditMode}>
          <option value="Book">หนังสือ (Book)</option>
          <option value="Journal">วารสาร (Journal)</option>
          <option value="Comic">การ์ตูน (Comic)</option>
        </select>
      </div>

      {/* Common Fields */}
      <div className="form-group">
        <label>ชื่อเรื่อง</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>ผู้แต่ง/ผู้เขียน</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>URL รูปปก</label>
        <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} />
      </div>
       <div className="form-group">
        <label>ปีที่พิมพ์</label>
        <input type="number" name="publishYear" value={formData.publishYear} onChange={handleChange} />
      </div>
       <div className="form-group">
        <label>สำนักพิมพ์</label>
        <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>คำอธิบาย</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
      </div>
      
      {/* Conditional Fields based on Category */}
      <hr />
      {formData.category === 'Book' && (
        <div className="conditional-fields">
          <h4>รายละเอียดหนังสือ</h4>
          <input name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" />
          <input name="edition" value={formData.edition} onChange={handleChange} placeholder="ครั้งที่พิมพ์" />
          <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} placeholder="จำนวนหน้า" />
          <input name="language" value={formData.language} onChange={handleChange} placeholder="ภาษา" />
          <input name="genre" value={formData.genre} onChange={handleChange} placeholder="ประเภทหนังสือ" />
        </div>
      )}

      {formData.category === 'Journal' && (
        <div className="conditional-fields">
          <h4>รายละเอียดวารสาร</h4>
          <input name="issn" value={formData.issn} onChange={handleChange} placeholder="ISSN" />
          <input name="volume" value={formData.volume} onChange={handleChange} placeholder="เล่มที่" />
          <input name="issue" value={formData.issue} onChange={handleChange} placeholder="ฉบับที่" />
          <input name="publicationFrequency" value={formData.publicationFrequency} onChange={handleChange} placeholder="ความถี่ในการออก" />
        </div>
      )}

      {formData.category === 'Comic' && (
        <div className="conditional-fields">
          <h4>รายละเอียดการ์ตูน</h4>
          <input name="series" value={formData.series} onChange={handleChange} placeholder="ชื่อซีรี่ส์" />
          <input type="number" name="volumeNumber" value={formData.volumeNumber} onChange={handleChange} placeholder="เล่มที่ในซีรี่ส์" />
          <input name="illustrator" value={formData.illustrator} onChange={handleChange} placeholder="ผู้วาด" />
          <input name="colorType" value={formData.colorType} onChange={handleChange} placeholder="ประเภทสี (สี, ขาวดำ)" />
          <input name="targetAge" value={formData.targetAge} onChange={handleChange} placeholder="กลุ่มเป้าหมาย" />
        </div>
      )}

      <button type="submit" className="btn btn-success">{isEditMode ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มสินค้า'}</button>
    </form>
  );
};

export default ItemForm;