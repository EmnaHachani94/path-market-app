import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppFooter() {
  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.item}
          accessibilityRole="button"
          accessibilityLabel="Retour à l'accueil"
        >
          <Ionicons name="home-outline" size={24} color="#21413C" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const FOOTER_HEIGHT = 64;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    height: FOOTER_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: "rgba(33,65,60,0.12)",
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: 52,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});