import {ScoreProvider} from "./context/ScoreContext.jsx";
import Score from "./components/Score.jsx";
import DifficultySelector from "./components/DifficultySelector.jsx";
import {useState} from "react";
import ChoosePlayer from "./components/ChosePlayer.jsx";
import {getBestMove} from "./minmax/minMaxFConnect.js";
import FConnectTable from "./components/FConnectTable.jsx";
import {createBoard, dropPiece} from "./minmax/minMaxFConnect.js";

function App() {
      const board = createBoard();
      const [boardView, setBoardView] = useState(board);
      const [difficulty, setDifficulty] = useState("easy");
      const [player, setPlayer] = useState("X");
      // const { cells, dispatch } = useTableContext();
      const [start, setStart] = useState(false);
      //
      function handleStart(){
          if (player === "O"){
              const depth = difficulty === "easy" ? 7 : 9;
              const bestMove = getBestMove(board, depth);
              const botRes = dropPiece(board, bestMove, 2);
              console.log(bestMove);
              setBoardView(prev => {
                  const newBoard = prev.map(row => [...row]);
                  newBoard[botRes][bestMove] = 2;
                  return newBoard;
              });
          }
          setStart(true);
      }

      return (
          <ScoreProvider>
              <Score />
              {start === false ? (<>
                  <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
                  <ChoosePlayer player={player} setPlayer={setPlayer} />
                  <div className="flex justify-center p-5">
                      <button
                          onClick={() => handleStart()}
                          className="flex items-center w-max px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                          Start
                      </button>
                  </div>
              </>) : (<>
                  <div className="flex justify-center sm:items-baseline mt-20 sm:h-0 h-screen items-baseline pb-">
                      <FConnectTable boardView={boardView} setBoardView={setBoardView} starterPlayer={player}  difficulty={difficulty} />
                  </div>
              </>)}

          </ScoreProvider>
  )
}

export default App
