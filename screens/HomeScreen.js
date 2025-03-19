import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text>Tic </Text>
        <Text style={{ color: "#476bed" }}>Tac</Text>
        <Text style={{ color: "#FF6347" }}> Toe</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Game")}
        >
          <Ionicons name="play" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Leaderboard")}
        >
          <Ionicons name="trophy" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 25,
    width: 250,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    marginLeft: 8,
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 10,
    bottom: 40,
  },
  icon: {
    marginRight: 5,
  },
});

export default HomeScreen;
