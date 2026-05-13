import { apiGet } from "./apiClient";

// A adapter selon ton endpoint réel (ex: /api/rest/magasins)
export async function fetchMagasins() {
  return apiGet("/api/rest/magasins");
}
