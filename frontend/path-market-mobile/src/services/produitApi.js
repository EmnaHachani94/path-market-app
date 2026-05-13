import { apiGet } from "./apiClient";

/**
 * GET /api/rest/produits/search?prefixe=...&magasinId=...
 * @param {string} prefixe
 * @param {number} magasinId
 * @returns {Promise<Array<{id:number, nomProduit:string, rayonId:number|null, rayonNom:string|null, ordreVisite:number|null}>>}
 */
export async function searchProduits(prefixe, magasinId) {
  const p = (prefixe ?? "").trim();
  if (!p) return [];

  if (magasinId == null) {
    // évite un 400 côté backend
    return [];
  }

  const qs = new URLSearchParams({
    prefixe: p,
    magasinId: String(magasinId),
  });

  // ✅ "produits" (pluriel) et "/search" comme ton controller backend
  return apiGet(`/api/rest/produits/search?${qs.toString()}`);
}
