import {dropPiece} from "../minmax/minMac4Connect.js";
import {getBestMove} from "../minmax/minMac4Connect.js";
import {winningMove} from "../minmax/minMac4Connect.js";

function FConnectCell({starterPlayer ,difficulty, indRow, indCol, boardView, setBoardView, setWinner}) {
    const depth = difficulty === "easy" ? 7 : 9;
    let player = boardView[indRow][indCol] === 0 ? "EMPTY" : boardView[indRow][indCol] === 1 ? "PLAYER" : "BOT"

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
        if (userMove() === -1) return;
        if (winningMove(board, 1)) {
            setWinner(1);
            return;
        }

        botMove();
        if (winningMove(board, 2)) {
            setWinner(2);
        }
    }

    return (<>
        {player === "BOT" ?
            <td className="bg-red-800 rounded-4xl  w-10 h-10 text-center align-middle cursor-pointer"
            onClick={handleClick}>
                <p></p>
            </td>
            :
        player === "PLAYER" ?
            <td className="bg-blue-800 rounded-4xl  w-10 h-10 text-center align-middle cursor-pointer"
            onClick={handleClick}>
                <p></p>
            </td>
        :
            <td className="bg-white rounded-4xl  w-10 h-10 text-center align-middle cursor-pointer"
            onClick={handleClick}>
                <p></p>
            </td>}
    </>);
}

export default FConnectCell;
