import {useContext, useEffect, useRef} from "react";
import GameContext from "../contexts/gameContext.jsx";
import useTypewriter from "../hooks/useTypewriter.js";
import {GAME_STATUS} from "../constants/GameConstants.js";
import {initialGameState} from "../constants/GameState.js";
import {TEXTS} from "../assets/data/texts.js";

// eslint-disable-next-line react/prop-types
const GameControlCentre = ({ children }) => {

    const { isKeyAccepted } = useTypewriter();

    const {
        gameStatus, setGameStatus,
        text, setText,
        typedText, setTypedText,
        timer, setTimer, cancelTimer,
        timeSpent, setTimeSpent,
        errors, setErrors
    } = useContext(GameContext);

    // Context Refs

    const gameStatusRef = useRef(gameStatus);
    const textRef= useRef(text);
    const typedTextRef = useRef(typedText);
    const timerRef = useRef(timer);
    const timeSpentRef = useRef(timeSpent);
    const errorsRef = useRef(errors);

    gameStatusRef.current = gameStatus;
    textRef.current = text;
    typedTextRef.current = typedText;
    timerRef.current = timer;
    timeSpentRef.current = timeSpent;
    errorsRef.current = errors;

    const prevGameStatusRef = useRef(gameStatus);

    const handleKeyDown = (event) => {

        const gameStatus = gameStatusRef.current;
        const { LOADED, STARTED } = GAME_STATUS;

        // get the key pressed
        const keyPressed = event.key;

        const shouldHandleKeyDown = [LOADED, STARTED].includes(gameStatus);

        // check if the key pressed is accepted or the keydown should be handled
        if (! shouldHandleKeyDown || ! isKeyAccepted(keyPressed)) {
            event.preventDefault();
            return;
        }

        // set up game if not started
        if (gameStatus === LOADED && gameStatus !== STARTED) {

            // start the game
            setGameStatus(GAME_STATUS.STARTED);

            // start the timer
            setTimer(setInterval(() => {
                // only increment timer when game is ON
                if (timerRef.current === initialGameState.timer || gameStatusRef.current === STARTED) {
                    setTimeSpent(timeSpentRef.current + 1);
                }
            }, 1000));
        }

        // update the text typed so far
        setTypedText(`${typedTextRef.current}${keyPressed}`);

        // check if the key pressed was correct
        if (keyPressed !== textRef.current[typedTextRef.current.length]) {

            // add the index of the incorrect character
            setErrors([...errorsRef.current, typedTextRef.current.length]);
        }

    }

    const handleWindowBlur = () => {
        prevGameStatusRef.current = gameStatusRef.current;
        setGameStatus(GAME_STATUS.PAUSED);
    }

    const handleWindowFocus = () => {
        setGameStatus(prevGameStatusRef.current);
    }

    // Run on first render
    useEffect(() => {

        // set the text: select a text randomly
        const randomTextId = Math.floor(Math.random() * (TEXTS.length - 1));
        setText(TEXTS[randomTextId]);

        setGameStatus(GAME_STATUS.LOADED);

        // attach event listeners
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('blur', handleWindowBlur);
        window.addEventListener('focus', handleWindowFocus);

        return () => {

            // unregister event listeners
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('blur', handleWindowBlur);
            window.removeEventListener('focus', handleWindowFocus)
        }
    }, []);

    // Run this effect when a character is typed
    useEffect(() => {

        // end game if text has been typed completed
        if (gameStatus === GAME_STATUS.STARTED && text.length === typedText.length) {

            // update the game status
            setGameStatus(GAME_STATUS.ENDED);

            // cancel the timer the game
            cancelTimer(null);
        }
    }, [typedText]);

    return <>{children}</>;
}

export default GameControlCentre;
