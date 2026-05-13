import { apiGet, apiPost } from "./apiClient";

/**
 * Backend:
 *  - POST /api/rest/Listes
 *    Body: { nomListe, magasinId, utilisateurId }
 *    Response: { listeId }
 */
export async function createListe({ nomListe, magasinId, utilisateurId }) {
  const name = (nomListe ?? "").trim();
  if (!name) throw new Error("nomListe est obligatoire");
  if (magasinId == null) throw new Error("magasinId est obligatoire");
  if (utilisateurId == null) throw new Error("utilisateurId est obligatoire");

  return apiPost("/api/rest/Listes", {
    nomListe: name,
    magasinId,
    utilisateurId,
  });
}

/**
 * Backend:
 *  - POST /api/rest/Listes/{listeId}/lignes
 *    Body: { produitId, quantite }
 *    Response: ligneId (number)
 */
export async function addLigneToListe({ listeId, produitId, quantite }) {
  if (listeId == null) throw new Error("listeId est obligatoire");
  if (produitId == null) throw new Error("produitId est obligatoire");
  if (quantite == null) throw new Error("quantite est obligatoire");

  return apiPost(`/api/rest/Listes/${listeId}/lignes`, {
    produitId,
    quantite,
  });
}

/**
 * Backend:
 *  - GET /api/rest/Listes/{listeId}
 *    Response: ListeDeCoursesDetailResponseDto
 */
export async function fetchListeDetail(listeId) {
  if (listeId == null) throw new Error("listeId est obligatoire");
  return apiGet(`/api/rest/Listes/${listeId}`);
}
