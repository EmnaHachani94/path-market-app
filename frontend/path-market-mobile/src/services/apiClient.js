import { API_BASE_URL } from "../config/Api";
import { getToken } from "./tokenStorage";

async function buildHeaders(extraHeaders = {}) {
  let token = null;

  try {
    token = await getToken();
  } catch (e) {
    console.warn("getToken failed, continuing without token:", e?.message ?? e);
    token = null;
  }

  const headers = {
    Accept: "application/json",
    ...extraHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: await buildHeaders(),
  });

  const text = await res.text().catch(() => "");
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || text || `HTTP ${res.status}`);
  }
  return data;
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: await buildHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });

  const text = await res.text().catch(() => "");
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || text || `HTTP ${res.status}`);
  }
  return data;
}

export async function apiDelete(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE",
    headers: await buildHeaders(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return true;
}
