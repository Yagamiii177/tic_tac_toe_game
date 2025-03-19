import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GameContext } from "../context/GameContext";
import { useNavigation } from "@react-navigation/native";

const LeaderboardScreen = () => {
  const { player1Name, player2Name, scoreX, scoreO, resetScores } =
    useContext(GameContext);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.playerText}>
        {player1Name} (X): {scoreX}
      </Text>
      <Text style={styles.playerText}>
        {player2Name} (O): {scoreO}
      </Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetButtonText}>Reset Scores</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  playerText: {
    fontSize: 20,
    marginVertical: 5,
  },
  backButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#476bed",
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LeaderboardScreen;
