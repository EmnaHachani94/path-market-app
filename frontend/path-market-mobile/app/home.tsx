import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Screen from "../src/components/Screen";
import { theme } from "../src/theme";

type StoreKey =
  | "auchan"
  | "leclerc"
  | "carrefour"
  | "intermarche"
  | "casino"
  | "monoprix";

type CategoryKey =
  | "fruits_legumes"
  | "boulangerie"
  | "boissons"
  | "produits_laitiers"
  | "viandes"
  | "pates"
  | "epicerie";

type Product = {
  id: string;
  name: string;
  category?: CategoryKey;
};

type ListItem = {
  id: string;
  name: string;
  qty: number;
  checked: boolean;
  category?: CategoryKey;
};

const STORES: {
  key: StoreKey;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}[] = [
  { key: "auchan", label: "Auchan", icon: "cart-outline" },
  { key: "leclerc", label: "Leclerc", icon: "store-outline" },
  { key: "carrefour", label: "Carrefour", icon: "shopping-outline" },
  { key: "intermarche", label: "Intermarché", icon: "basket-outline" },
  { key: "casino", label: "Casino", icon: "storefront-outline" },
  { key: "monoprix", label: "Monoprix", icon: "shopping-search" },
];

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}[] = [
  {
    key: "fruits_legumes",
    label: "Fruits &\nLégumes",
    icon: "food-apple-outline",
  },
  { key: "boulangerie", label: "Boulangerie", icon: "bread-slice-outline" },
  { key: "boissons", label: "Boissons", icon: "cup-outline" },
  { key: "produits_laitiers", label: "Produits\nlaitiers", icon: "cheese" },
  { key: "viandes", label: "Viandes", icon: "food-drumstick-outline" },
  { key: "pates", label: "Pâtes", icon: "pasta" },
  { key: "epicerie", label: "Épicerie", icon: "food-variant" },
];

// Mock (remplacé plus tard par ton backend recherche)
const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Lait", category: "produits_laitiers" },
  { id: "2", name: "Oeufs", category: "produits_laitiers" },
  { id: "3", name: "Farine", category: "boulangerie" },
  { id: "4", name: "Pain", category: "boulangerie" },
  { id: "5", name: "Pommes", category: "fruits_legumes" },
  { id: "6", name: "Jus d'orange", category: "boissons" },
  { id: "7", name: "Spaghetti", category: "pates" },
  { id: "8", name: "Riz", category: "epicerie" },
  { id: "9", name: "Huile d'olive", category: "epicerie" },
];

export default function Home() {
  const [store, setStore] = useState<StoreKey | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null,
  );
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<ListItem[]>([]);

  const results = useMemo(() => {
    if (!store) return [];
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return MOCK_PRODUCTS.filter((p) =>
      selectedCategory ? p.category === selectedCategory : true,
    )
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [store, selectedCategory, query]);

  const addItem = (p: Product) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === p.id);
      if (existing) {
        return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [
        ...prev,
        {
          id: p.id,
          name: p.name,
          qty: 1,
          checked: false,
          category: p.category,
        },
      ];
    });

    setQuery("");
  };

  const toggleChecked = (id: string) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, checked: !x.checked } : x)),
    );
  };

  const incQty = (id: string) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)),
    );
  };

  const decQty = (id: string) => {
    setItems((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const Header = (
    <View>
      {/* Brand + menu */}
      <View style={styles.brandHeader}>
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <Text style={styles.brand}>PathMarket</Text>
        </View>

        <Pressable
          onPress={() => console.log("menu")}
          style={styles.menuBtn}
          hitSlop={10}
        >
          <MaterialCommunityIcons name="menu" size={26} color="#21413C" />
        </Pressable>
      </View>

      {/* Catégories (centrées) */}
      <View style={styles.categoriesOuter}>
        <View style={styles.categoriesRow}>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(c) => c.key}
            contentContainerStyle={styles.categoriesContent}
            renderItem={({ item: c }) => {
              const active = selectedCategory === c.key;

              return (
                <Pressable
                  onPress={() =>
                    setSelectedCategory((prev) =>
                      prev === c.key ? null : c.key,
                    )
                  }
                  style={styles.categoryItem}
                >
                  <View
                    style={[
                      styles.categoryIconWrap,
                      active && styles.categoryIconWrapActive,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={c.icon}
                      size={24}
                      color={active ? "white" : "#21413C"}
                    />
                  </View>

                  <Text style={styles.categoryText}>{c.label}</Text>
                </Pressable>
              );
            }}
          />
        </View>
      </View>

      {/* Magasin */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Choisissez votre magasin</Text>

        <View style={styles.storeGrid}>
          {STORES.map((s) => {
            const active = store === s.key;

            return (
              <Pressable
                key={s.key}
                onPress={() => setStore(s.key)}
                style={[styles.storeTile, active && styles.storeTileActive]}
              >
                <MaterialCommunityIcons
                  name={s.icon}
                  size={22}
                  color={active ? "#21413C" : "rgba(33,65,60,0.65)"}
                />
                <Text style={styles.storeLabel}>{s.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Recherche */}
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={
            store ? "Rechercher un produit..." : "Choisissez d'abord un magasin"
          }
          editable={!!store}
          style={[styles.search, !store && styles.searchDisabled]}
          placeholderTextColor="rgba(33,65,60,0.55)"
          autoCorrect={false}
        />
      </View>

      {/* Résultats */}
      {store && query.trim() ? (
        <View style={styles.resultsCard}>
          {results.length === 0 ? (
            <Text style={styles.hint}>Aucun produit trouvé.</Text>
          ) : (
            results.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => addItem(p)}
                style={styles.resultRow}
              >
                <Text style={styles.resultText}>{p.name}</Text>
                <View style={styles.resultAdd}>
                  <Text style={styles.resultAddText}>Ajouter</Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      ) : null}

      {/* Titre liste */}
      <View style={styles.listTitleRow}>
        <Text style={styles.sectionTitle}>Ma liste de courses</Text>
        <Text style={styles.counter}>{items.length}</Text>
      </View>
    </View>
  );

  return (
    <Screen style={styles.screen} contentStyle={styles.safe}>
      <FlatList
        data={items}
        keyExtractor={(x) => x.id}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Pressable
              onPress={() => toggleChecked(item.id)}
              style={[styles.checkbox, item.checked && styles.checkboxChecked]}
            />

            <Text
              style={[styles.itemName, item.checked && styles.itemNameChecked]}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <View style={styles.qty}>
              <Pressable onPress={() => decQty(item.id)} style={styles.qtyBtn}>
                <Text style={styles.qtyBtnText}>-</Text>
              </Pressable>
              <Text style={styles.qtyVal}>{item.qty}</Text>
              <Pressable onPress={() => incQty(item.id)} style={styles.qtyBtn}>
                <Text style={styles.qtyBtnText}>+</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => removeItem(item.id)}
              style={styles.removeBtn}
            >
              <Text style={styles.removeText}>×</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.hintEmpty}>
            Ajoute des produits via la recherche.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 18 }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 14, paddingTop: 10 },

  brandHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoImg: { width: 44, height: 44 },
  brand: { color: "#E85B4F", fontSize: 16, fontWeight: "900" },
  menuBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.10)",
  },

  categoriesOuter: { alignItems: "center" },
  categoriesRow: {
    marginTop: 12,
    marginBottom: 10,
    width: "100%", // ✅ au lieu de "92%" pour éviter un “cut” visuel
  },

  // ❌ ne pas centrer une liste scrollable
  categoriesContent: {
    paddingHorizontal: 8, // ✅ petit padding gauche/droite
    alignItems: "center",
    // supprime: justifyContent: "center",
    // supprime: width: "100%",
    // supprime: gap: 0 (optionnel)
  },

  categoryItem: {
    alignItems: "center",
    gap: 4,
    width: 60,
    paddingHorizontal: 0,
  },

  categoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.75)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.10)",
  },
  categoryIconWrapActive: {
    backgroundColor: "#21413C",
    borderColor: "rgba(33,65,60,0.25)",
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "800",
    color: theme.colors.text,
    textAlign: "center",
    lineHeight: 13,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.10)",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: theme.colors.text,
    marginBottom: 10,
  },

  storeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  storeTile: {
    width: "32%",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(33,65,60,0.05)",
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.10)",
  },
  storeTileActive: {
    backgroundColor: "rgba(33,65,60,0.10)",
    borderColor: "rgba(33,65,60,0.25)",
  },
  storeLabel: { fontSize: 11, fontWeight: "900", color: theme.colors.text },

  searchWrap: { marginTop: 10 },
  search: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.14)",
    backgroundColor: "rgba(255,255,255,0.92)",
    color: theme.colors.text,
  },
  searchDisabled: { opacity: 0.55 },

  resultsCard: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.10)",
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "rgba(33,65,60,0.05)",
    marginBottom: 8,
  },
  resultText: { fontWeight: "900", color: theme.colors.text },
  resultAdd: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#21413C",
  },
  resultAddText: { color: "white", fontWeight: "900", fontSize: 12 },

  listTitleRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counter: {
    minWidth: 28,
    textAlign: "center",
    fontWeight: "900",
    color: "#21413C",
    backgroundColor: "rgba(255,255,255,0.70)",
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.10)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  hint: { color: theme.colors.muted, fontWeight: "700" },
  hintEmpty: {
    color: theme.colors.muted,
    fontWeight: "700",
    marginTop: 10,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.80)",
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.08)",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "rgba(33,65,60,0.35)",
    backgroundColor: "transparent",
  },
  checkboxChecked: { backgroundColor: "#21413C", borderColor: "#21413C" },

  itemName: { flex: 1, fontWeight: "900", color: theme.colors.text },
  itemNameChecked: { textDecorationLine: "line-through", opacity: 0.6 },

  qty: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.16)",
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { fontWeight: "900", color: theme.colors.text, fontSize: 16 },
  qtyVal: { width: 18, textAlign: "center", fontWeight: "900" },

  removeBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "rgba(232,91,79,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: { color: "#E85B4F", fontSize: 18, fontWeight: "900" },
});
