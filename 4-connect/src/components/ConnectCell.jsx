import { getBestMove, checkWinner} from "../minmax/minMax.js";
import { useTableContext } from "../hooks/useTableContext.jsx";
import {useScoreContext} from "../hooks/useScoreContext.jsx";

// Convert 1D cells to 2D board for Minimax
export function convertToTable(cells) {
    const board = [[], [], [], []];
    cells.forEach((cell, i) =>
        board[Math.floor(i / 4)].push(
            cell.value === "X" ? 1 : cell.value === "O" ? -1 : 0
        )
    );
    return board;
}

export function cordToIndex(r, c) {
    return r * 4 + c;
}

function ConnectCell({ indRow, indCol, cell, setMoveCount, difficulty, player }) {
    const { cells, dispatch } = useTableContext();
    const {dispatchScore} = useScoreContext();

    function handleSelect() {
        const userIndex = cordToIndex(indRow, indCol);

        if (cells[userIndex].value !== "") return;

        dispatch({ type: player === "X" ? "USER_TURN" : "BOT_TURN", index: userIndex });

        const board = convertToTable(cells);
        board[indRow][indCol] = player === "X" ? 1 : -1;

        if (checkWinner(board) !== 0) {
            dispatchScore({
                type: player === "X" ? "X_WIN" : "O_WIN",
            })
            dispatch({
                type: "RESET",
            })
            setMoveCount(0);
            return;
        }
        else setMoveCount((prev) => prev + 1);

        const depth = difficulty === "easy" ? 1 : 5;
        console.log(depth);
        const { r, c } = getBestMove(board, player === "X" ? -1 : 1, depth);

        const botIndex = cordToIndex(r, c);

        dispatch({ type: player === "X" ? "BOT_TURN" : "USER_TURN", index: botIndex });
        board[r][c] = player === "X" ? -1 : 1;;
        if (checkWinner(board) !== 0) {
            dispatchScore({
                type: player === "X" ? "O_WIN" : "X_WIN",
            })
            dispatch({
                type: "RESET",
            });
            setMoveCount(0);
            return
        }
        else setMoveCount((prev) => prev + 1);
    }

    return (<>
        {cell.value === "X" ? (
                <td
                    className="bg-red-600 border-1 w-16 h-16 text-center align-middle cursor-pointer"
                    onClick={handleSelect}
                >
                    {cell.value}
                </td>
            ) :
        cell.value === "O" ? (
            <td
                className="bg-blue-600 border-1 w-16 h-16 text-center align-middle cursor-pointer"
                onClick={handleSelect}
            >
                {cell.value}
            </td>
        ) :
            <td
                className="border-1 w-16 h-16 text-center align-middle cursor-pointer"
                onClick={handleSelect}
            >
                {cell.value}
            </td>
        }
    </>);
}

export default ConnectCell;
