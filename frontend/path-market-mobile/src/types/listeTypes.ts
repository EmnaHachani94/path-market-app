export type LigneListeResponseDto = {
  idLigne: number;
  produitId: number;
  nomProduit: string;
  quantite: number;
  statut: boolean;
  rayonId: number;
  nomRayon: string;
};
export type ListeRayonGroupeDto = {
  rayonId: number;
  nomRayon: string;
  ordreVisite: number;
  lignes: LigneListeResponseDto[];
};
export type ListeDeCoursesDetailResponseDto = {
  ListeId: number;
  nomListe: string;
  dateDeCreation: string;
  magasinId: number;
  nomMagasin: string;
  rayons: ListeRayonGroupeDto[];
};
