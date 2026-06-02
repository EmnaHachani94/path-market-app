import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AppFooter from "@/src/components/AppFooter";
import GroupedShoppingList from "../src/components/GroupedShoppingList";
import ProductSearch from "../src/components/ProductSearch";
import StoreSelector from "../src/components/StoreSelector";
import {
  addLigneToListe,
  createListe,
  fetchListeDetail,
  supprimerLigne,
  updateLigneQuantite,
  updateLigneStatut,
} from "../src/services/listeApi";
import { fetchMagasins } from "../src/services/magasinApi";
import { searchProduits } from "../src/services/produitApi";

// ---- Types ----
type Magasin = { id: number; nom: string; adresse: string };
type ListeDeCoursesDetailResponseDto = {
  ListeId: number;
  nomListe: string;
  dateDeCreation: string;
  magasinId: number;
  nomMagasin: string;
  rayons: {
    rayonId: number;
    nomRayon: string;
    ordreVisite: number;
    lignes: {
      idLigne: number;
      produitId: number;
      nomProduit: string;
      quantite: number;
      statut: boolean;
      rayonId: number;
      nomRayon: string;
    }[];
  }[];
};

type ContentSection = {
  id: string;
  type: "creation" | "search";
};

export default function Home() {
  // Magasins / sélection
  const [magasins, setMagasins] = useState<Magasin[]>([]);
  const [selectedMagasinId, setSelectedMagasinId] = useState<number | null>(
    null,
  );
  const [loadingMagasins, setLoadingMagasins] = useState(false);
  // Utilisateur (à adapter avec ton auth si besoin)
  const [utilisateurId] = useState<number>(1);

  // Création liste
  const [nomListe, setNomListe] = useState("");
  const [listeId, setListeId] = useState<number | null>(null);
  const [listeDetail, setListeDetail] =
    useState<ListeDeCoursesDetailResponseDto | null>(null);
  const [loadingListe, setLoadingListe] = useState(false);

  // Recherche produits
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const handleIncrementQte = async (rayonId: number, idLigne: number) => {
    if (!listeDetail || !listeId) return;
    const rayon = listeDetail.rayons.find((r) => r.rayonId === rayonId);
    if (!rayon) return;
    const ligne = rayon.lignes.find((l) => l.idLigne === idLigne);
    if (!ligne) return;
    const nouvelleQuantite = ligne.quantite + 1;
    await updateLigneQuantite({ ligneId: idLigne, nouvelleQuantite });
    const maj = await fetchListeDetail(listeId);
    console.log("NOUVELLES DONNEES API --->", maj);
    setListeDetail(maj);
  };

  const handleDecrementQte = async (rayonId: number, idLigne: number) => {
    if (!listeDetail || !listeId) return;
    const rayon = listeDetail.rayons.find((r) => r.rayonId === rayonId);
    if (!rayon) return;
    const ligne = rayon.lignes.find((l) => l.idLigne === idLigne);
    if (!ligne || ligne.quantite <= 1) return;
    const nouvelleQuantite = ligne.quantite - 1;
    await updateLigneQuantite({ ligneId: idLigne, nouvelleQuantite });
    const maj = await fetchListeDetail(listeId);
    console.log("NOUVELLES DONNEES API --->", maj);
    setListeDetail(maj);
  };

  const handleSupprimerLigne = async (rayonId: number, idLigne: number) => {
    if (!listeDetail || !listeId) return;
    await supprimerLigne(idLigne);
    const maj = await fetchListeDetail(listeId);
    setListeDetail(maj);
  };

  const handleToggleAchete = async (rayonId: number, idLigne: number) => {
    if (!listeDetail || !listeId) return;
    const rayon = listeDetail.rayons.find((r) => r.rayonId === rayonId);
    if (!rayon) return;
    const ligne = rayon.lignes.find((l) => l.idLigne === idLigne);
    if (!ligne) return;
    // Inverse statut
    await updateLigneStatut({ ligneId: idLigne, statut: !ligne.statut });
    const maj = await fetchListeDetail(listeId);
    setListeDetail(maj);
  };

  // --- Chargement magasins ---
  useEffect(() => {
    let cancelled = false;
    setLoadingMagasins(true);
    fetchMagasins()
      .then((data) => {
        if (!cancelled) setMagasins(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setMagasins([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingMagasins(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // --- Création liste ---
  async function handleCreerListe() {
    if (!selectedMagasinId || !utilisateurId) {
      alert("Complète le nom, le magasin et l'utilisateur !");
      return;
    }
    setLoadingListe(true);
    try {
      const res = await createListe({
        nomListe,
        magasinId: selectedMagasinId,
        utilisateurId,
      });
      setListeId(res.id ?? res.listeId ?? res.ListeId);
      const detail = await fetchListeDetail(
        res.id ?? res.listeId ?? res.ListeId,
      );
      setListeDetail(detail);
    } catch (e: any) {
      alert(e?.message || "Erreur lors de la création de la liste");
    } finally {
      setLoadingListe(false);
    }
  }

  // --- Recherche produits dynamique ---
  useEffect(() => {
    if (searchQuery.length >= 2 && selectedMagasinId && listeId) {
      setLoadingResults(true);
      searchProduits(searchQuery, selectedMagasinId)
        .then((results) =>
          setSearchResults(Array.isArray(results) ? results : []),
        )
        .catch(() => setSearchResults([]))
        .finally(() => setLoadingResults(false));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedMagasinId, listeId]);

  // --- Ajout d'un produit dans la liste puis refresh de la liste ordonnée (groupée rayons) ---
  async function handleAjouterProduit(produitId: number, quantite = 1) {
    if (!listeId) return;
    setLoadingListe(true);
    try {
      await addLigneToListe({ listeId, produitId, quantite });
      const data = await fetchListeDetail(listeId);
      setListeDetail(data);
      setSearchResults([]); // vide la recherche
      setSearchQuery("");
    } finally {
      setLoadingListe(false);
    }
  }

  const handleChangeMagasin = async (nouveauId: number) => {
    // Si on reclique sur le même, on ne fait rien
    if (nouveauId === selectedMagasinId) return;

    // Si une liste existe ET contient au moins un produit,
    // demander confirmation à l'utilisateur avant de changer
    if (
      listeId &&
      listeDetail &&
      listeDetail.rayons.some((r) => r.lignes.length > 0)
    ) {
      Alert.alert(
        "Changer de magasin ?",
        "Vous avez déjà commencé une liste pour un autre magasin. Voulez-vous garder la liste actuelle ou en créer une nouvelle ?",
        [
          { text: "Garder ma liste", style: "cancel" },
          {
            text: "Créer une nouvelle liste",
            style: "destructive",
            onPress: async () => {
              await createNewListe(nouveauId);
            },
          },
        ],
      );
      return;
    }
    // Sinon : créer directement une nouvelle liste (aucune ou vide)
    await createNewListe(nouveauId);
  };

  async function createNewListe(magasinId: number) {
    setSelectedMagasinId(magasinId);
    setListeId(null);
    setListeDetail(null);
    setSearchQuery("");
    setSearchResults([]);
    try {
      const magasin = magasins.find((m) => m.id === magasinId);
      const nomParDefaut = magasin
        ? `Ma liste ${magasin.nom}`
        : "Nouvelle liste";
      const nomEffectif =
        nomListe && nomListe.trim().length > 0 ? nomListe : nomParDefaut;

      const res = await createListe({
        nomListe: nomEffectif,
        magasinId,
        utilisateurId,
      });
      setListeId(res.id ?? res.listeId ?? res.ListeId);
      const detail = await fetchListeDetail(
        res.id ?? res.listeId ?? res.ListeId,
      );
      setListeDetail(detail);
      setNomListe(nomEffectif);
    } catch (e: any) {
      alert(e?.message || "Erreur lors de la création de la liste");
    }
  }

  // Data pour FlatList (sans footer)
  const sections: ContentSection[] = [
    { id: "creation", type: "creation" },
    { id: "search", type: "search" },
  ];

  const renderSection = ({ item }: { item: ContentSection }) => {
    switch (item.type) {
      case "creation":
        return (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Créer votre liste de courses
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de la liste"
              value={nomListe}
              onChangeText={setNomListe}
            />
            <StoreSelector
              magasins={magasins}
              selectedMagasinId={selectedMagasinId}
              loading={loadingMagasins}
              onSelect={handleChangeMagasin}
            />
          </View>
        );

      case "search":
        return (
          <View style={styles.card}>
            <ProductSearch
              value={searchQuery}
              onChange={setSearchQuery}
              results={searchResults}
              loading={loadingResults}
              onAdd={handleAjouterProduit}
            />
            {/* Affiche GroupedShoppingList seulement si recherche vide */}
            {searchQuery.length === 0 && (
              <GroupedShoppingList
                rayons={listeDetail ? listeDetail.rayons : []}
                loading={loadingListe}
                onIncrement={handleIncrementQte}
                onDecrement={handleDecrementQte}
                onToggleAchete={handleToggleAchete}
                onDelete={handleSupprimerLigne}
              />
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.flex}
      >
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 32,
            paddingBottom: 90, // Leave space for fixed footer
            paddingHorizontal: 0,
            backgroundColor: "#86e3bb",
          }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
      {/* Fixed Footer - OUTSIDE KeyboardAvoidingView */}
      <AppFooter />
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: {
    margin: 12,
    marginVertical: 12,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 18,
    alignSelf: "center",
    width: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 4,
    color: "#21413C",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    width: "100%",
    minWidth: 200,
    alignSelf: "center",
    fontSize: 15,
    backgroundColor: "#fafbfb",
  },
  storeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  storeTile: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    margin: 7,
    alignItems: "center",
    minWidth: 100,
    flexDirection: "row",
    gap: 7,
    backgroundColor: "#eee",
  },
  storeTileActive: { backgroundColor: "#d0f0ea", borderColor: "#007A5C" },
  storeLabel: { fontWeight: "bold", fontSize: 16 },
  creerListeBtn: {
    marginTop: 14,
    backgroundColor: "#21413C",
    borderRadius: 8,
    padding: 11,
    alignItems: "center",
    minWidth: 160,
    alignSelf: "center",
  },
});
