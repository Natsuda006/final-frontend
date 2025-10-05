
import api from "./api";

const BOOK_API = import.meta.env.VITE_BOOK_API || "/books";

const BookApi = {
    
  getAll: (params) => api.get(`${BOOK_API}`, { params }),
  create: (data) => api.post(`${BOOK_API}`, data),
  getById: (id) => api.get(`${BOOK_API}/${id}`),
  update: (id, data) => api.put(`${BOOK_API}/${id}`, data),
  remove: (id) => api.delete(`${BOOK_API}/${id}`),
};

export default BookApi;

