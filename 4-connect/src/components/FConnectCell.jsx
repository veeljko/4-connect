import {dropPiece} from "../minmax/minMaxFConnect.js";
import {getBestMove} from "../minmax/minMaxFConnect.js";
import {winningMove} from "../minmax/minMaxFConnect.js";
import {useStateContext} from "../hooks/useStateContext.jsx";

function FConnectCell({indRow, indCol, boardView, setBoardView}) {
    const {state, dispatch} = useStateContext();
    const depth = state.difficulty === "easy" ? 7 : 9;
    const player = boardView[indRow][indCol] === 0 ? "EMPTY" : boardView[indRow][indCol] === 1 ? "PLAYER" : "BOT"
    const bgColor = player === "BOT" ? "bg-red-800" : player === "PLAYER" ? "bg-blue-800" : "bg-white";

    function botMove(){
        const bestMove = getBestMove(board, depth);
        const botRes = dropPiece(board, bestMove, 2);

        setBoardView(prev => {
            const newBoard = prev.map(row => [...row]);
            newBoard[botRes][bestMove] = 2;
            return newBoard;
        });
        board[botRes][bestMove] = 2
    }

    function userMove(){
        const res = dropPiece(board, indCol, 1);
        if (res === -1) return -1;

        setBoardView(prev => {
            const newBoard = prev.map(row => [...row]);
            newBoard[res][indCol] = 1;
            return newBoard;
        });
        board[res][indCol] = 1;
        return 1;
    }

    const board = boardView;
    function handleClick(){
        if (state.isP1Winner || state.isP2Winner) return;
        if (userMove() === -1) return;
        if (winningMove(board, 1)) {
            dispatch({
                type: "P1WIN"
            });
            return;
        }

        botMove();
        if (winningMove(board, 2)) {
            dispatch({
                type: "P2WIN"
            })
        }
    }

    return (
        <td
            className={`${bgColor} rounded-4xl w-10 h-10 text-center align-middle cursor-pointer`}
            onClick={handleClick}
        >
        </td>
    );

}

export default FConnectCell;
