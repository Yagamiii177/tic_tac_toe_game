import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [lastWinner, setLastWinner] = useState(null);

  return (
    <GameContext.Provider
      value={{
        player1Name,
        setPlayer1Name,
        player2Name,
        setPlayer2Name,
        scoreX,
        setScoreX,
        scoreO,
        setScoreO,
        lastWinner,
        setLastWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
