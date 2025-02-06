import React from "react";
import {initialGameState} from "../constants/GameState.js";

const GameContext = React.createContext(initialGameState);

export default GameContext;