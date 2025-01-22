import React from 'react';
import typewriterStyles from '../assets/styles/typewriter.module.css';
import Display from "./Display.jsx";
import Dashboard from "./Dashboard.jsx";

function Typewriter(props) {
    return (
        <div className={typewriterStyles.container}>
            <Display />
            <Dashboard />
        </div>
    );
}

export default Typewriter;