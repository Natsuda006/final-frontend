import api from "./api";

const COMIC_API = import.meta.env.VITE_COMIC_API || "/comics";

const ComicsApi = {
  getAll: (params) => api.get(`${COMIC_API}`, { params }),
  create: (data) => api.post(`${COMIC_API}`, data),
  search: (query) => api.get(`${COMIC_API}/search`, { params: { q: query } }),
  advancedSearch: (filters) => api.get(`${COMIC_API}/advanced-search`, { params: filters }),
  getAvailable: () => api.get(`${COMIC_API}/available`),
  getStatistics: () => api.get(`${COMIC_API}/statistics`),
  filter: (filters) => api.get(`${COMIC_API}/filter`, { params: filters }),
  getById: (id) => api.get(`${COMIC_API}/${id}`),
  update: (id, data) => api.put(`${COMIC_API}/${id}`, data),
  remove: (id) => api.delete(`${COMIC_API}/${id}`),
  updateStatus: (id, status) => api.patch(`${COMIC_API}/${id}/status`, { status }),
};

export default ComicsApi;