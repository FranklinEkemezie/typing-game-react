import './App.css';
import Typewriter from "./components/Typewriter.jsx";
import GameContextProvider from "./providers/gameContextProvider.jsx";
import GameControlCentre from "./components/GameControlCentre.jsx";

function App() {
    return (
        <div className="App">
            <GameContextProvider>
                <GameControlCentre>
                    <Typewriter />
                </GameControlCentre>
            </GameContextProvider>
        </div>
    )
}

export default App
