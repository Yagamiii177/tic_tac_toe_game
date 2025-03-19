import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GameContext } from "../context/GameContext";
import { useNavigation } from "@react-navigation/native";

const LeaderboardScreen = () => {
  const { leaderboard, resetScores } = useContext(GameContext);
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Text style={styles.name}>{item[0]}</Text>
      <Text style={styles.score}>{item[1]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Leaderboard</Text>
        <Ionicons name="trophy" size={30} color="#FFD700" style={styles.icon} />
      </View>

      {/* Labels */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>Rank</Text>
        <Text style={styles.label}>Wins</Text>
      </View>

      <FlatList
        data={Object.entries(leaderboard).sort((a, b) => b[1] - a[1])}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetButtonText}>Reset Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    marginTop: 20,
  },
  title: {
    marginTop: 15,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#476bed",
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  resetButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FF6347",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default LeaderboardScreen;
