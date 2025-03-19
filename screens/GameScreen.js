import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Board from "../components/Board";

const GameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={40} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>
        <Text>Tic </Text>
        <Text style={{ color: "#476bed" }}>Tac</Text>
        <Text style={{ color: "#FF6347" }}> Toe</Text>
      </Text>
      <Board />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F8FF",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    bottom: 35,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    padding: 8,
    borderRadius: 8,
  },
});

export default GameScreen;
