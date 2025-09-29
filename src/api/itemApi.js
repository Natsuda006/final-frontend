const BASE_URL = "https://bookshop-api-er7t.onrender.com/api";

export const getItems = async () => {
  const response = await fetch(`${BASE_URL}/items`);
  return response.json();
};

export const getItemById = async (itemId) => {
  const response = await fetch(`${BASE_URL}/items/${itemId}`);
  return response.json();
};

export const createItem = async (itemData) => {
  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const updateItem = async (itemId, itemData) => {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const deleteItem = async (itemId) => {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
  });
  return response.json();
};
