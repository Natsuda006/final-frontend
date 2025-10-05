import api from "./api";

const JOURNAL_API = import.meta.env.VITE_JOURNAL_API || "/journals";

const JournalApi= {
  getAll: (params) => api.get(`${JOURNAL_API}`, { params }),
  create: (data) => api.post(`${JOURNAL_API}`, data),
  search: (query) => api.get(`${JOURNAL_API}/search`, { params: { q: query } }),
  advancedSearch: (filters) => api.get(`${JOURNAL_API}/advanced-search`, { params: filters }),
  getAvailable: () => api.get(`${JOURNAL_API}/available`),
  getStatistics: () => api.get(`${JOURNAL_API}/statistics`),
  filter: (filters) => api.get(`${JOURNAL_API}/filter`, { params: filters }),
  getById: (id) => api.get(`${JOURNAL_API}/${id}`),
  getDetails: (id) => api.get(`${JOURNAL_API}/${id}/details`),
  update: (id, data) => api.put(`${JOURNAL_API}/${id}`, data),
  remove: (id) => api.delete(`${JOURNAL_API}/${id}`),
  updateStatus: (id, status) => api.patch(`${JOURNAL_API}/${id}/status`, { status }),
};

export default JournalApi;