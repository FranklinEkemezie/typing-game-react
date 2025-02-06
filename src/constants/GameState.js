import {GAME_STATUS} from "./GameConstants.js";

export  const initialGameState = {
    gameStatus: GAME_STATUS.LOADING,
    timer: null,
    timeSpent: 0,
    charsPerLine: 0,
    text: '',
    typedText: '',
    errors: [],
}