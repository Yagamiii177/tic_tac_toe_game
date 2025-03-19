import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PlayerNameModal from "./PlayerNameModal";
import { GameContext } from "../context/GameContext";

const Board = () => {
  const {
    player1Name,
    player2Name,
    leaderboard,
    updateLeaderboard,
    setPlayer1Name,
    setPlayer2Name,
    setLastWinner,
  } = useContext(GameContext);

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [currentMatchWinsX, setCurrentMatchWinsX] = useState(0);
  const [currentMatchWinsO, setCurrentMatchWinsO] = useState(0);

  useEffect(() => {
    const player1Score = leaderboard[player1Name] || 0;
    const player2Score = leaderboard[player2Name] || 0;

    setScoreX(player1Score);
    setScoreO(player2Score);
  }, [player1Name, player2Name, leaderboard]);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard) => {
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handlePress = (index) => {
    if (board[index] !== null || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const gameWinner = checkWinner(updatedBoard);

    if (gameWinner) {
      setWinner(gameWinner);

      if (gameWinner === "X") {
        setScoreX((prevScore) => prevScore + 1);
        setCurrentMatchWinsX((prevWins) => prevWins + 1);
        updateLeaderboard(player1Name);
        Alert.alert(`${player1Name} Wins! 🎉`);
      } else {
        setScoreO((prevScore) => prevScore + 1);
        setCurrentMatchWinsO((prevWins) => prevWins + 1);
        updateLeaderboard(player2Name);
        Alert.alert(`${player2Name} Wins! 🎉`);
      }

      setLastWinner(currentPlayer);
      setTimeout(() => restartGame(currentPlayer), 100);
    } else if (!updatedBoard.includes(null)) {
      setLastWinner(null);
      Alert.alert("It's a Draw! 🤝");
      setTimeout(() => restartGame(null), 100);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const renderSquare = (index) => (
    <TouchableOpacity
      style={[
        styles.square,
        board[index] === "X"
          ? styles.squareX
          : board[index] === "O"
          ? styles.squareO
          : null,
      ]}
      onPress={() => handlePress(index)}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const restartGame = (lastWinningPlayer) => {
    setBoard(Array(9).fill(null));
    setWinner(null);

    if (lastWinningPlayer === "X") {
      setCurrentPlayer("O");
    } else if (lastWinningPlayer === "O") {
      setCurrentPlayer("X");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleSaveNames = (p1, p2) => {
    setPlayer1Name(p1);
    setPlayer2Name(p2);
  };

  const newGame = (resetNames = true) => {
    Alert.alert(
      "Start New Game",
      "Are you sure you want to start a new game?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setBoard(Array(9).fill(null));
            setWinner(null);
            setCurrentPlayer("X");
            setCurrentMatchWinsX(0);
            setCurrentMatchWinsO(0);

            if (resetNames) {
              setIsModalVisible(true);
              setScoreX(0);
              setScoreO(0);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.board}>
      <PlayerNameModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveNames}
      />

      <View style={styles.currentMatchContainer}>
        <Text style={styles.currentMatchHeader}>Current Match Score:</Text>
        <Text style={styles.currentMatchText}>
          <Text style={{ color: "#476bed" }}>
            {player1Name} (X): {currentMatchWinsX}
          </Text>{" "}
          |{" "}
          <Text style={{ color: "#FF6347" }}>
            {player2Name} (O): {currentMatchWinsO}
          </Text>
        </Text>
      </View>

      <Text style={styles.leaderboardHeader}>Leaderboard Score</Text>
      <View style={styles.scoreContainer}>
        <View style={styles.playerScoreX}>
          <Text style={styles.scoreText}>
            {player1Name} : {scoreX}
          </Text>
        </View>
        <View style={styles.playerScoreO}>
          <Text style={styles.scoreText}>
            {player2Name} : {scoreO}
          </Text>
        </View>
      </View>

      <Text style={styles.playerIndicator}>
        Your Turn:{" "}
        <Text
          style={{
            fontWeight: "bold",
            color: currentPlayer === "X" ? "#476bed" : "#FF6347",
          }}
        >
          {currentPlayer === "X" ? `${player1Name} (X)` : `${player2Name} (O)`}
        </Text>
      </Text>

      <View style={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>

      <TouchableOpacity style={styles.newGameButton} onPress={newGame}>
        <Text style={styles.restartText}>
          <Ionicons name="refresh-outline" size={40} color="black" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    marginTop: 20,
    alignItems: "center",
    bottom: 75,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    bottom: 25,
  },
  squareX: {
    backgroundColor: "#476bed",
  },
  squareO: {
    backgroundColor: "#FF6347",
  },
  squareText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
  playerIndicator: {
    fontSize: 24,
    marginBottom: 30,
    marginTop: 10,
    bottom: 25,
  },
  scoreContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
    top: 520,
    marginLeft: 44,
    marginRight: 44,
  },
  playerScoreX: {
    backgroundColor: "#476bed",
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  playerScoreO: {
    backgroundColor: "#FF6347",
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  newGameButton: {
    position: "absolute",
    bottom: 588,
    right: 20,
    padding: 10,
  },
  scoreHeader: {
    fontSize: 20,
    fontWeight: "bold",
    top: 500,
    textAlign: "center",
  },
  currentMatchContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 20,
    top: 70,
  },
  currentMatchHeader: {
    fontSize: 26,
    marginBottom: 5,
  },
  currentMatchText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  leaderboardHeader: {
    fontWeight: "bold",
    fontSize: 18,
    top: 510,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Board;
