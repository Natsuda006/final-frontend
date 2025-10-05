import api from "./api";

const ITEM_API = import.meta.env.VITE_ITEM_URL || "/items";

const ItemApi = {
  getAll: (params) => api.get(`${ITEM_API}`, { params }),
  search: (query) => api.get(`${ITEM_API}/search`, { params: { q: query } }),
  getStatistics: () => api.get(`${ITEM_API}/statistics`),
  filter: (filters) => api.get(`${ITEM_API}/filter`, { params: filters }),
  getAvailable: () => api.get(`${ITEM_API}/available`),
  getByTypeAndId: (type, id) => api.get(`${ITEM_API}/${type}/${id}`),
  updateStatus: (type, id, status) =>
    api.patch(`${ITEM_API}/${type}/${id}/status`, { status }),
};

export default ItemApi;