import axios from "axios";

export const getDataAPI = async (url, token) => {
  return await axios.get(`/api/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postDataAPI = async (url, formData, token) => {
  return await axios.post(`/api/${url}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchDataAPI = async (url, formData, token) => {
  return await axios.patch(`/api/${url}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putDataAPI = async (url, formData, token) => {
  return await axios.put(`/api/${url}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteDataAPI = async (url, token) => {
  return await axios.delete(`/api/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
