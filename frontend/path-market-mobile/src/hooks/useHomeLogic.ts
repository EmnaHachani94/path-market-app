import { useMemo, useState } from "react";

export type StoreKey =
  | "auchan"
  | "leclerc"
  | "carrefour"
  | "intermarche"
  | "casino"
  | "monoprix";

export type CategoryKey =
  | "fruits_legumes"
  | "boulangerie"
  | "boissons"
  | "produits_laitiers"
  | "viandes"
  | "pates"
  | "epicerie";

export type Product = {
  id: string;
  name: string;
  category?: CategoryKey;
};

export type ListItem = {
  id: string;
  name: string;
  qty: number;
  checked: boolean;
  category?: CategoryKey;
};

// Mock temporaire
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

export function useHomeLogic() {
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

  return {
    store,
    setStore,
    selectedCategory,
    setSelectedCategory,
    query,
    setQuery,
    items,
    results,
    addItem,
    toggleChecked,
    incQty,
    decQty,
    removeItem,
  };
}
