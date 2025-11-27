import ConnectTable from "./components/ConnectTable.jsx";
import {ScoreProvider} from "./context/ScoreContext.jsx";
import Score from "./components/Score.jsx";
import DifficultySelector from "./components/DifficultySelector.jsx";
import {useState} from "react";
import ChoosePlayer from "./components/ChosePlayer.jsx";
import {useTableContext} from "./hooks/useTableContext.jsx";
import {getBestMove} from "./minmax/minMax.js";
import {cordToIndex} from "./components/ConnectCell.jsx";

function App() {
      const [difficulty, setDifficulty] = useState("easy");
      const [player, setPlayer] = useState("X");
      const { cells, dispatch } = useTableContext();
      const [start, setStart] = useState(false);

      function handleStart(){
          if (player === "O"){
              const depth = difficulty === "easy" ? 1 : 5;

              dispatch({ type: "USER_TURN", index: Math.floor(Math.random() * 4) * Math.floor(Math.random() * 4) });
          }
          console.log(player);
          setStart(true);
      }

      return (
          <ScoreProvider>
              {start === true ? (
                  <>
                      <Score />
                      <div className="flex justify-center sm:items-baseline mt-20 sm:h-0 h-screen items-baseline pb-">
                          <ConnectTable difficulty={difficulty} player={player} />
                      </div>
                  </>
              ) : (<>
                      <ChoosePlayer player={player} setPlayer={setPlayer} />
                      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
                      <div className="flex justify-center p-5">
                          <button
                              onClick={() => handleStart()}
                              className="flex items-center w-max px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                              Start
                          </button>
                      </div>
                  </>
              )}

          </ScoreProvider>
  )
}

export default App
