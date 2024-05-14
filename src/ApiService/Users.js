import { API_ENDPOINTS, API_URL } from "../Common/constants";
import { getHeaders } from "./Common";

export const getUsers = async (skip , limit) => {
  const headers = getHeaders();
  const response = await fetch(API_URL + API_ENDPOINTS.users.list+"?skip="+skip+"&limit="+limit, {
    method: "GET",
    headers,
  });
  if (!response.ok) return [];
  const resp = await response.json();
  return resp;
};

export const addUser = async (data) => {
  try {
    const headers = getHeaders();
    const response = await fetch(API_URL + API_ENDPOINTS.users.add, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    let resp = await response.json();
    if (!response.ok) {
      throw Error(resp.message);
    }
    return resp;
  } catch (error) {
    throw Error(error?.message ? error.message.toString() : "Error while adding user");
  }
};

export const updateUser = async (id, data) => {
  const headers = getHeaders();
  const response = await fetch(API_URL + API_ENDPOINTS.users.update + id, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) return null;
  const resp = await response.json();
  return resp;
};

export const deleteUser = async (id) => {
  const headers = getHeaders();
  const response = await fetch(API_URL + API_ENDPOINTS.users.delete + id, {
    method: "POST",
    headers,
  });
  if (!response.ok) return null;
  const resp = await response.json();
  return resp;
};
