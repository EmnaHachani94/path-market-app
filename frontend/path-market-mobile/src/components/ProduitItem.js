import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

// Props : ligne, onIncrement, onDecrement, onToggleAchete, onDelete
export default function ProduitItem({
  ligne,
  onIncrement,
  onDecrement,
  onToggleAchete,
  onDelete,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
        marginVertical: 4,
        gap: 6,
        minHeight: 32,
      }}
    >
      {/* Case à cocher */}
      <Pressable
        style={{
          width: 22,
          height: 22,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "#007A5C",
          marginRight: 7,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: ligne.statut ? "#c6edce" : "#fff",
        }}
        onPress={onToggleAchete}
      >
        {ligne.statut ? (
          <MaterialCommunityIcons name="check-bold" size={14} color="#007A5C" />
        ) : null}
      </Pressable>
      <Text style={{ fontSize: 15, flex: 1 }}>{ligne.nomProduit}</Text>
      <Pressable style={qtBtn} onPress={onDecrement}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>-</Text>
      </Pressable>
      <Text style={{ minWidth: 18, textAlign: "center" }}>
        {ligne.quantite}
      </Text>
      <Pressable style={qtBtn} onPress={onIncrement}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>+</Text>
      </Pressable>
      <Pressable
        style={{
          marginLeft: 7,
          padding: 4,
          borderRadius: 5,
          backgroundColor: "#ef9797",
        }}
        onPress={onDelete}
      >
        <MaterialCommunityIcons name="close" size={17} color="#fff" />
      </Pressable>
    </View>
  );
}

const qtBtn = {
  backgroundColor: "#e0f3eb",
  borderRadius: 6,
  paddingHorizontal: 7,
  paddingVertical: 2,
  marginHorizontal: 2,
  borderWidth: 1,
  borderColor: "#007A5C80",
  minWidth: 26,
  alignItems: "center",
};
