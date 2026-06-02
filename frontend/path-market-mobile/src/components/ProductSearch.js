import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductSearch({
  value,
  onChange,
  results,
  loading,
  onAdd,
}) {
  return (
    <View>
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
        Rechercher un produit à ajouter :
      </Text>
      <TextInput
        style={styles.input}
        placeholder="J'ai besoin..."
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#bbb"
      />
      {loading && <ActivityIndicator />}

      {value.length >= 2 && (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)} // ou le bon identifiant de produit
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultLine}
              onPress={() => onAdd(item.id)}
              activeOpacity={0.6}
            >
              <Text style={styles.resultName}>{item.nomProduit}</Text>
              {/* Si tu veux l'affichage de quantité/dispo/autre info, rajoute ici */}
            </TouchableOpacity>
          )}
          scrollEnabled={false}
          nestedScrollEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 15,
    backgroundColor: "#fafbfb",
    width: "100%",
    minWidth: 200,
    alignSelf: "center",
  },
  resultLine: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#f6fbf9",
  },
  resultName: {
    fontSize: 16,
    color: "#325553",
    fontWeight: "500",
    flex: 1,
  },
});
