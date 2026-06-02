import {
    FontAwesome5,
    FontAwesome6,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
const MAGASIN_ICONS = {
  Auchan: "shopping-outline",
  Leclerc: "cart-outline",
  Carrefour: "shopping",
  Intermarché: "storefront-outline",
  Casino: "store-outline",
  Monoprix: "basket-outline",
};
// A placer dans StoreSelector.js
const MAGASIN_ICON = {
  Auchan: { name: "cart", lib: "MaterialCommunityIcons", color: "#f36969" },
  Leclerc: {
    name: "shopping-outline",
    lib: "MaterialCommunityIcons",
    color: "#f49f17",
  },
  Carrefour: { name: "shop", lib: "FontAwesome6", color: "#50a0b7" },
  Intermarché: {
    name: "basket-shopping",
    lib: "FontAwesome6",
    color: "#b0495a",
  },
  Casino: { name: "store", lib: "FontAwesome5", color: "#20a53f" },
  Monoprix: {
    name: "home-city-outline",
    lib: "MaterialCommunityIcons",
    color: "#d13229",
  },
};
export default function StoreSelector({
  magasins,
  selectedMagasinId,
  loading,
  onSelect,
}) {
  return (
    <>
      <Text style={{ fontWeight: "bold", marginVertical: 8 }}>
        Choisissez votre magasin
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.storeGrid}>
          {magasins.map((m) => {
            const active = selectedMagasinId === m.id;
            const iconName = MAGASIN_ICONS[m.nom] || "store-outline";
            return (
              <Pressable
                key={m.id}
                onPress={() => onSelect(m.id)}
                style={[styles.storeTile, active && styles.storeTileActive]}
              >
                {(() => {
                  const config = MAGASIN_ICON[m.nom] || {};
                  if (config.lib === "FontAwesome5" && FontAwesome5) {
                    return (
                      <FontAwesome5
                        name={config.name}
                        size={36}
                        color={config.color}
                        style={{ marginBottom: 6 }}
                      />
                    );
                  }
                  if (config.lib === "FontAwesome6" && FontAwesome6) {
                    return (
                      <FontAwesome6
                        name={config.name}
                        size={36}
                        color={config.color}
                        style={{ marginBottom: 6 }}
                      />
                    );
                  }
                  // Default: MaterialCommunityIcons
                  return (
                    <MaterialCommunityIcons
                      name={config.name || "store-outline"}
                      size={36}
                      color={config.color || "#808080"}
                      style={{ marginBottom: 6 }}
                    />
                  );
                })()}
                <Text style={styles.storeLabel}>{m.nom}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
 storeGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "100%",
},
storeTile: {
  backgroundColor: "#fff",
  borderWidth: 2,
  borderColor: "#e8eaea",
  borderRadius: 13,
  marginVertical: 7,
  marginHorizontal: 2, // très petit, pour éviter les gaps
  flexBasis: "30%",  
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 14,
  minHeight: 100,
  elevation: 2,
},
storeTileActive: {
  backgroundColor: "#e3fcf2",
  borderColor: "#30bb88",
},
storeLabel: {
  fontWeight: "600",
  fontSize: 13,
  letterSpacing: 0.2,
  color: "#202b27",
  textAlign: "center",
},
});
