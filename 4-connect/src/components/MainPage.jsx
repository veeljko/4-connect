import {useStateContext} from "../hooks/useStateContext.jsx";
import {createBoard, dropPiece} from "../minmax/minMaxFConnect.js";
import {useState} from "react";
import Score from "./Score.jsx";
import DifficultySelector from "./DifficultySelector.jsx";
import ChoosePlayer from "./ChosePlayer.jsx";
import FConnectTable from "./FConnectTable.jsx";


function MainPage(){
    const {state, dispatch} = useStateContext();
    const [boardView, setBoardView] = useState(createBoard());
    const [player, setPlayer] = useState("X");
    const [start, setStart] = useState(false);

    function botMove(){
        const bestMove = 3
        const botRes = dropPiece(createBoard(), bestMove, 2);
        setBoardView(createBoard());
        setBoardView(prev => {
            const newBoard = prev.map(row => [...row]);
            newBoard[botRes][bestMove] = 2;
            return newBoard;
        });
    }

    function handleStart(){

        if (player === "O") botMove();
        setStart(true);
    }

    function handleReset() {
        dispatch({type: "RESET"});
        if (player === "O") botMove();
        else setBoardView(createBoard());
    }


    return (<>
        <Score />
        {start === false ? (<>
            <DifficultySelector />
            <ChoosePlayer player={player} setPlayer={setPlayer} />
            <div className="flex justify-center p-5">
                <button
                    onClick={() => handleStart()}
                    className="flex items-center w-max px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                    Start
                </button>
            </div>
            </>) : (<div className="flex flex-col">
                <div className="flex justify-center mt-20  h-[300px] items-baseline">
                    <FConnectTable boardView={boardView} setBoardView={setBoardView} />
                </div>
                {(state.isP1Winner || state.isP2Winner) && (
                    <button
                        className="flex items-center w-max px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition mx-auto mb-4"
                        onClick={() => handleReset()}>
                        Reset
                    </button>
                )}
            </div>
        )}
        </>)
}

export default MainPage;