import React from 'react';
import dashboardStyles from '../assets/styles/dashboard.module.css';

function Dashboard(props) {
    return (
        <div className={dashboardStyles.container}>
            <div className={dashboardStyles.progressDisplayContainer}>
                <progress className={dashboardStyles.progressBar} value={75} max={100}>
                    Hello
                </progress>
            </div>

            <div className={dashboardStyles.metricsDisplayContainer}>
                <div>
                    <h4>Time Spent</h4>
                    <div>00:00:00</div>
                </div>

                <div>
                    <h4>Mistakes</h4>
                    <div>21</div>
                </div>

                <div>
                    <h4>WPM</h4>
                    <div>19</div>
                </div>
            </div>
        </div>
    )
    ;
}

export default Dashboard;