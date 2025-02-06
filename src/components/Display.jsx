import React, {useContext, useEffect} from 'react';
import displayStyles from '../assets/styles/display.module.css';
import useTypewriter from "../hooks/useTypewriter.js";
import GameContext from "../contexts/gameContext.jsx";

function Display() {

    const {
        breakTextIntoLines,
        getCharacterWidth, getCharsPerLine,
        getEndOfLineIndexes, encodeToHTMLEntities
    } = useTypewriter();

    const {
        text, typedText, charsPerLine, setCharsPerLine, errors
    } = useContext(GameContext);

    const displayContainerRef = React.createRef();
    const scrollTargetRef = React.createRef();
    const textToTypeDisplayRef = React.createRef();
    const typingCursorRef = React.createRef();
    const fakeTypingAreaRef = React.createRef();

    // - determine the number of characters to display per line
    // - handle window resize
    useEffect(() => {

        /*** @type HTMLElement */
        const textToTypeDisplayEl = textToTypeDisplayRef.current;
        setCharsPerLine(getCharsPerLine(textToTypeDisplayEl, getCharacterWidth('W')));

        const handleWindowResize = () => {
            setCharsPerLine(getCharsPerLine(textToTypeDisplayEl, getCharacterWidth('W')));
        }

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }

    }, []);

    // Run effect when ever the text typed changes
    useEffect(() => {

        // scroll the "scrollContainer" if the text to be typed goes out of view
        scrollTargetRef.current.scrollIntoView({behavior: "smooth", block: "end"});

    }, [typedText]);

    const textIntoLines = breakTextIntoLines(text, charsPerLine);

    return (
        <div className={displayStyles.displayContainer} ref={displayContainerRef}>
            <div className={displayStyles.scrollContainer}>
                <div className={displayStyles.textToTypeDisplay} ref={textToTypeDisplayRef}>
                    {
                        textIntoLines
                            .map(({line}, index) => (
                                <div key={index}>{line}</div>
                            ))
                    }
                </div>
                <div className={displayStyles.typingAreaContainer}>
                    <div className={displayStyles.fakeTypingArea} ref={fakeTypingAreaRef}>
                        {
                            [...typedText].map(line => line).map((char, index) => (
                                <span
                                    key={index}
                                    className={errors.includes(index) ? displayStyles.error : ''}
                                >
                                {
                                    // highlight errors
                                    errors.includes(index) && char === ' ' ? (
                                        <span className={displayStyles.whitespace}>&nbsp;</span>
                                    ) : encodeToHTMLEntities(char)
                                }
                                {
                                    // add "end of line" if the character is at the end of line
                                    getEndOfLineIndexes(textIntoLines).includes(index) && (
                                        <br id={index.toString()}/>
                                    )
                                }
                            </span>
                            ))
                        }
                        <div className={displayStyles.typingCursor} ref={typingCursorRef}></div>
                        <div className={displayStyles.scrollTarget} ref={scrollTargetRef}></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Display;