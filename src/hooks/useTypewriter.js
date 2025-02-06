
const useTypewriter = () => ({

   breakTextIntoLines: (text, charsPerLine) => {
       const chunks = text.split(' ');

       const summariseLine = (line=[], addLastWhitespace=false) => {
           const lineText = line.join(' ') + (addLastWhitespace ? ' ' : '');
           const lineTextPadded = lineText.padEnd(charsPerLine, ' ');
           const padding = lineTextPadded.length - lineText.length;

           return { line: lineTextPadded, padding };
       }

       /**@type {{line: string, padding: number}[]} */
       let lines = [];

       let line = []; // temporarily store chunks for a line
       for (const chunk of chunks) {
           line.push(chunk);

           if ((line.join(' ') + ' ').length > charsPerLine) {
               const lastInsertedChunk = line.pop();

               lines.push({...summariseLine(line, true)});

               line = [lastInsertedChunk];
           }
       }

       // Add the remaining ones
       lines.push({...summariseLine(line)});

       return lines;
   },

    isKeyAccepted: (key) => {
        const
            alphabets = /^[a-zA-Z]$/,
            numbers = /^[0-9]$/,
            specialChars = /^[!@#$%^&*(),.<>/?\\;[\]':"{}|_\-+=]$/,
            whitespaceChars = /^ $/,
            specialKeys = /^ $/
        ;
        const acceptKeys = [alphabets, numbers, specialChars, whitespaceChars, specialKeys];

        return acceptKeys.some(regex => regex.test(key));
    },

    getCharacterWidth: (char, font='1.6rem Consolas') => {
        // Create an invisible span element
        const spanEl = document.createElement('span');
        spanEl.style.font = font;
        spanEl.style.visibility = 'hidden';
        spanEl.style.whiteSpace = 'nowrap';
        spanEl.textContent = char;

        // Append to the body temporarily
        document.body.appendChild(spanEl);

        // Measure the width of the character
        const elWidth = spanEl.getBoundingClientRect().width;

        // Remove the span element from the document
        document.body.removeChild(spanEl);

        return elWidth;
    },
    
    getCharsPerLine: (containerEl, charWidth) => {
        const containerElStyles = window.getComputedStyle(containerEl);
        const textSpaceWidth = (
            containerEl.clientWidth -
            parseFloat(containerElStyles.paddingLeft) -
            parseFloat(containerElStyles.paddingRight)
        );

        return Math.floor(textSpaceWidth / charWidth);
    },

    formatTime: (timeInSecs) => {
        let timeStr = "";

        const secsInHr = 60 * 60;
        const hrsInTime = Math.floor(timeInSecs / secsInHr);

        const hrs = hrsInTime.toString().padStart(2, "0");

        timeInSecs -= hrsInTime * secsInHr;
        const mins = Math.floor(timeInSecs / 60).toString().padStart(2, "0");
        const secs = (timeInSecs % 60).toString().padStart(2, "0");

        timeStr = `${hrs}:${mins}:${secs}`;

        return timeStr;

    },

    getWordsPerMinute: (textTyped, timeSpent, noOfErrors=0, avgWordsPerText=5.5) => {
       timeSpent = ! timeSpent || timeSpent <= 0 ? Infinity : timeSpent;

       const avgCorrectWordsTyped = (textTyped.length - noOfErrors) / avgWordsPerText;
       const timeSpentInMins = timeSpent / 60;

       return Math.round(Math.max(avgCorrectWordsTyped, 0) / timeSpentInMins);
    },

    getEndOfLineIndexes: (textLines) => {
        return textLines.map(({line, padding}) => line.length - 1 - padding)
            .reduce(({lastEndOfLineIndex, indexesArr}, currentValue) => {
                let newEndOfLineIndex = lastEndOfLineIndex + currentValue + 1;
                return {
                    lastEndOfLineIndex: newEndOfLineIndex,
                    indexesArr: [...indexesArr, newEndOfLineIndex]
                };
            }, {lastEndOfLineIndex: -1, indexesArr: []}).indexesArr
        ;
    },

    encodeToHTMLEntities: (text) => {
       const tempDiv = document.createElement('div');
       tempDiv.textContent = text;

       return tempDiv.innerHTML;
    }
});

export default useTypewriter;