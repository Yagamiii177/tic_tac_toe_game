import React, { createContext, useState } from "react";
import { Alert } from "react-native";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [lastWinner, setLastWinner] = useState(null);
  const [leaderboard, setLeaderboard] = useState({});

  const updateLeaderboard = (player) => {
    setLeaderboard((prevLeaderboard) => ({
      ...prevLeaderboard,
      [player]: (prevLeaderboard[player] || 0) + 1,
    }));
  };

  const resetLeaderboard = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to reset the leaderboard? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: () => {
            setLeaderboard({});
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <GameContext.Provider
      value={{
        player1Name,
        player2Name,
        scoreX,
        scoreO,
        setPlayer1Name,
        setPlayer2Name,
        setScoreX,
        setScoreO,
        lastWinner,
        setLastWinner,
        leaderboard,
        updateLeaderboard,
        resetLeaderboard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
