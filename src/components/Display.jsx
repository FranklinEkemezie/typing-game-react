import React, {useEffect, useState} from 'react';
import displayStyles from '../assets/styles/display.module.css';
import {TEXTS} from "../assets/data/texts.js";
function Display() {

    const charsPerLine = 50;

    const breakTextIntoLines = (text, charsPerLine) => {
        const chunks = text.split(' ');

        const lines = [];

        let line = []; // temporarily store chunks for a line
        for (const chunk of chunks) {
            line.push(chunk);

            if (line.join(' ').length > charsPerLine) {
                const lastInsertedChunk = line.pop();

                lines.push(line.join(' ').padEnd(charsPerLine, '_'));

                line = [lastInsertedChunk];
            }
        }

        // Add the remaining ones
        lines.push(line.join(' ').padEnd(charsPerLine, '_'));

        return lines;
    };

    const [text, setText] = useState('');
    useEffect(() => {
        const textId = Math.floor(Math.random() * (TEXTS.length - 1));
        const text = TEXTS[textId];

        setText(text);

        // console.log(text);
        console.log(
            breakTextIntoLines(text, charsPerLine)
                .map(e => ({
                    e: e,
                    l: e.length
                }))
        );
    }, []);

    const handleTyping = (e) => {
        e.preventDefault();


    }

    return (
        <div className={displayStyles.container}>
            <div className={displayStyles.textToTypeDisplay}>
                {
                    breakTextIntoLines(text, charsPerLine)
                        .map((line, index) => (
                            <div key={index}>{line}</div>
                        ))
                }
            </div>
            <div className={displayStyles.typingAreaContainer}>
                <textarea
                    className={displayStyles.typingArea}
                    onInput={handleTyping}
                >
                </textarea>
            </div>
        </div>
    );
}

export default Display;