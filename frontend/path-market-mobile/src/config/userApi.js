import { API_BASE_URL } from "../config/Api";

export async function fetchUsers() {
  const res = await fetch(`${API_BASE_URL}/api/rest/user/all`, {
    
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}
