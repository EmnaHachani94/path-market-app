import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  addLigneToListe,
  createListe,
  fetchListeDetail,
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
    Lignes: {
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
    if (!nomListe || !selectedMagasinId || !utilisateurId) {
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
      setListeId(res.id ?? res.listeId ?? res.ListeId); // support différents naming backend
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

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 32,
        paddingBottom: 40,
      }}
      keyboardShouldPersistTaps="handled"
    >
      {/* --- Bloc Création Liste --- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Créer votre liste de courses</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom de la liste"
          value={nomListe}
          onChangeText={setNomListe}
        />
        <Text style={{ fontWeight: "bold", marginVertical: 8 }}>
          Choisissez votre magasin
        </Text>
        {loadingMagasins ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.storeGrid}>
            {magasins.map((m) => {
              const active = selectedMagasinId === m.id;
              return (
                <Pressable
                  key={m.id}
                  onPress={() => setSelectedMagasinId(m.id)}
                  style={[styles.storeTile, active && styles.storeTileActive]}
                >
                  <MaterialCommunityIcons
                    name="store-outline"
                    size={22}
                    color={active ? "#21413C" : "rgba(33,65,60,0.65)"}
                  />
                  <Text style={styles.storeLabel}>{m.nom}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
        <Pressable
          style={styles.creerListeBtn}
          onPress={handleCreerListe}
          disabled={loadingListe || !nomListe || !selectedMagasinId}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {loadingListe ? "Création..." : "Créer la liste"}
          </Text>
        </Pressable>
      </View>

      {/* --- Recherche Produits --- */}
      {listeId && (
        <View style={styles.card}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Rechercher un produit à ajouter :
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nom du produit (au moins 2 lettres)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {loadingResults ? (
            <Text>Chargement…</Text>
          ) : Array.isArray(searchResults) &&
            searchResults.length === 0 &&
            searchQuery.length > 1 ? (
            <Text style={{ color: "#E85B4F" }}>
              Aucun produit trouvé dans ce magasin.
            </Text>
          ) : (
            searchResults.map((res) => (
              <View
                key={res.id}
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  minWidth: 210,
                }}
              >
                <Text style={{ fontWeight: "500", fontSize: 16 }}>
                  {res.nomProduit}
                  {res.rayonNom ? `  |  Rayon : ${res.rayonNom}` : ""}
                </Text>
                <Pressable
                  style={{
                    marginLeft: 10,
                    paddingVertical: 4,
                    paddingHorizontal: 14,
                    borderRadius: 7,
                    backgroundColor: "#21413C",
                  }}
                  onPress={() => handleAjouterProduit(res.id)}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Ajouter
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      )}

      {/* --- Affichage FINAL de la liste groupée, triée par rayon et ordonnée (ordre de visite magasin) --- */}
      {listeDetail && (
        <View style={[styles.card, { width: "94%" }]}>
          <Text style={styles.sectionTitle}>
            Ma liste de courses (par rayons, ordre magasin)
          </Text>
          {loadingListe ? (
            <ActivityIndicator />
          ) : Array.isArray(listeDetail.rayons) ? (
            listeDetail.rayons.length === 0 ? (
              <Text style={{ color: "#888" }}>
                Aucun produit dans la liste.
              </Text>
            ) : (
              listeDetail.rayons
                .slice()
                .sort((a, b) => a.ordreVisite - b.ordreVisite)
                .map((rayon, idx) => (
                  <View key={rayon.rayonId} style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        backgroundColor: "#eaeaea",
                        borderRadius: 6,
                        padding: 6,
                      }}
                    >
                      {idx + 1}. {rayon.nomRayon}
                    </Text>
                    {Array.isArray(rayon.Lignes) && rayon.Lignes.length > 0 ? (
                      rayon.Lignes.map((ligne) => (
                        <Text
                          key={ligne.idLigne}
                          style={{ marginLeft: 16, fontSize: 15 }}
                        >
                          - {ligne.nomProduit} x{ligne.quantite}
                        </Text>
                      ))
                    ) : (
                      <Text
                        style={{
                          marginLeft: 20,
                          color: "#bbb",
                          fontStyle: "italic",
                        }}
                      >
                        Aucun produit dans ce rayon.
                      </Text>
                    )}
                  </View>
                ))
            )
          ) : (
            <Text style={{ color: "#888" }}>Aucune donnée disponible.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "center",
    width: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
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
