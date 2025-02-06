import {GAME_DISPATCH_ACTIONS, GAME_STATUS} from "../constants/GameConstants.js";

const {
    SET_GAME_STATUS,
    SET_CHARS_PER_LINE, SET_ERRORS,
    SET_TEXT, SET_TYPED_TEXT,
    SET_TIME_SPENT, SET_TIMER, CANCEL_TIMER,
} = GAME_DISPATCH_ACTIONS;

const GameReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {

        case SET_GAME_STATUS:
            return {...state, gameStatus: payload.gameStatus}

        case SET_TIMER:
            return {...state, timer: payload.timer}

        case CANCEL_TIMER:
            return {...state, timer: payload.timer}

        case SET_TIME_SPENT:
            return {...state, timeSpent: payload.timeSpent}

        case SET_TEXT:
            return {...state, text: payload.text}

        case SET_TYPED_TEXT:
            return {...state, typedText: payload.typedText}

        case SET_CHARS_PER_LINE:
            return {...state, charsPerLine: payload.charsPerLine}

        case SET_ERRORS:
            return {...state, errors: payload.errors}

        default:
            return state

    }

}

export default GameReducer;