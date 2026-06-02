import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import ProduitItem from "../components/ProduitItem";

export default function GroupedShoppingList({
  rayons,
  loading,
  onIncrement,
  onDecrement,
  onToggleAchete,
  onDelete,
}) {
  if (loading) return <ActivityIndicator />;
  if (!Array.isArray(rayons))
    return <Text style={{ color: "#888" }}>Aucune donnée disponible.</Text>;
  if (rayons.length === 0)
    return <Text style={{ color: "#888" }}>Aucun produit dans la liste.</Text>;

  return (
    <>
      {rayons
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
            {Array.isArray(rayon.lignes) && rayon.lignes.length > 0 ? (
              rayon.lignes.map((ligne) => (
                <ProduitItem
                  key={ligne.idLigne}
                  ligne={ligne}
                  onIncrement={() => onIncrement(rayon.rayonId, ligne.idLigne)}
                  onDecrement={() => onDecrement(rayon.rayonId, ligne.idLigne)}
                  onToggleAchete={() =>
                    onToggleAchete(rayon.rayonId, ligne.idLigne)
                  }
                  onDelete={() => onDelete(rayon.rayonId, ligne.idLigne)}
                />
              ))
            ) : (
              <Text
                style={{ marginLeft: 20, color: "#bbb", fontStyle: "italic" }}
              >
                Aucun produit dans ce rayon.
              </Text>
            )}
          </View>
        ))}
    </>
  );
}
