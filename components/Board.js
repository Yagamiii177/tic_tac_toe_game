import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PlayerNameModal from "./PlayerNameModal";
import { GameContext } from "../context/GameContext";

const Board = () => {
  const {
    player1Name,
    player2Name,
    scoreX,
    scoreO,
    setScoreX,
    setScoreO,
    setPlayer1Name,
    setPlayer2Name,
  } = useContext(GameContext);

  const { lastWinner, setLastWinner } = useContext(GameContext);
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
        Alert.alert(`${player1Name} Wins! 🎉`);
      } else {
        setScoreO((prevScore) => prevScore + 1);
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

      <View style={styles.scoreContainer}>
        <View style={styles.playerScoreX}>
          <Text style={styles.scoreText}>
            {player1Name} (X): {scoreX}
          </Text>
        </View>
        <View style={styles.playerScoreO}>
          <Text style={styles.scoreText}>
            {player2Name} (O): {scoreO}
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
  },
  scoreContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
    top: 500,
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
    bottom: 514.3,
    right: 20,
    padding: 10,
  },
});

export default Board;
