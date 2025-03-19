import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import { GameProvider } from "./context/GameContext";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Leaderboard" component={LeaderBoardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
};

export default App;
