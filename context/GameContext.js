import React, { createContext, useState } from "react";

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
