import {useContext} from 'react';
import dashboardStyles from '../assets/styles/dashboard.module.css';
import GameContext from "../contexts/gameContext.jsx";
import useTypewriter from "../hooks/useTypewriter.js";
import {GAME_STATUS} from "../constants/GameConstants.js";

function Dashboard() {

    const { gameStatus, text, typedText, errors, timeSpent} = useContext(GameContext);

    const { formatTime, getWordsPerMinute } = useTypewriter();

    const maxProgress = 100;
    const progress = gameStatus >= GAME_STATUS.LOADED ? (typedText.length / text.length) * 100 : 0;

    return (
        <div className={dashboardStyles.container}>
            <div className={dashboardStyles.progressDisplayContainer}>
                <progress 
                    className={dashboardStyles.progressBar}
                    value={progress}
                    max={maxProgress}
                >
                    Sorry, we can&#39;t display the progress bar because your browser does not support it
                </progress>
            </div>

            <div className={dashboardStyles.metricsDisplayContainer}>
                <div>
                    <h4>Time Spent</h4>
                    <div>{formatTime(timeSpent)}</div>
                </div>

                <div>
                    <h4>Mistakes</h4>
                    <div>{errors.length}</div>
                </div>

                <div>
                    <h4>WPM</h4>
                    <div>{getWordsPerMinute(typedText, timeSpent, errors.length)}</div>
                </div>
            </div>
        </div>
    )
    ;
}

export default Dashboard;