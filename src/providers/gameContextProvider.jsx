import GameContext from "../contexts/gameContext.jsx";
import {useReducer} from "react";
import GameReducer from "../reducers/GameReducer.jsx";
import {initialGameState} from "../constants/GameState.js";
import {GAME_DISPATCH_ACTIONS} from "../constants/GameConstants.js";

const {
    SET_GAME_STATUS,
    SET_CHARS_PER_LINE, SET_ERRORS,
    SET_TEXT, SET_TYPED_TEXT,
    SET_TIME_SPENT, SET_TIMER, CANCEL_TIMER
}  = GAME_DISPATCH_ACTIONS;

// eslint-disable-next-line react/prop-types
const GameContextProvider = ( { children }) => {

    const [gameState, gameStateDispatch] = useReducer(GameReducer, initialGameState, undefined);

    // Helper function to create reducer actions
    const createAction = (type = '', payload = {}) => ({type, payload});

    const setGameStatus = (gameStatus) => {
        gameStateDispatch(createAction(SET_GAME_STATUS, { gameStatus }));
    }

    const setTimer = (timerId) => {
        gameStateDispatch(createAction(SET_TIMER, {timer: timerId }));
    }

    const cancelTimer = () => {
        clearInterval(gameState.timer);
        gameStateDispatch(createAction(CANCEL_TIMER, {timer: initialGameState.timer}))
    }

    const setTimeSpent = (timeSpent) => {
        gameStateDispatch(createAction(SET_TIME_SPENT, {timeSpent}))
    }

    const setText = (text) => {
        gameStateDispatch(createAction(SET_TEXT, {text}));
    }

    const setTypedText = (typedText) => {
        gameStateDispatch(createAction(SET_TYPED_TEXT, {typedText}));
    }

    const setCharsPerLine = (charsPerLine) => {
        gameStateDispatch(createAction(SET_CHARS_PER_LINE, {charsPerLine}));
    }

    const setErrors = (errors) => {
        gameStateDispatch(createAction(SET_ERRORS, {errors}));
    }

    const gameContextValue = {
        ...gameState,
        setGameStatus,
        setTimer,
        cancelTimer,
        setTimeSpent,
        setText,
        setTypedText,
        setCharsPerLine,
        setErrors
    }

    return (
        <GameContext.Provider value={gameContextValue}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider;