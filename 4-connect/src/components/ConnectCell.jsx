import { getBestMove } from "../minmax/minMax.js";
import { useTableContext } from "../hooks/useTableContext.jsx";

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

function ConnectCell({ indRow, indCol, cell }) {
    const { cells, dispatch } = useTableContext();

    function handleSelect() {
        const userIndex = cordToIndex(indRow, indCol);

        if (cells[userIndex].value !== "") return;

        dispatch({ type: "USER_TURN", index: userIndex });


        const board = convertToTable(cells);
        board[indRow][indCol] = 1;

        const { r, c } = getBestMove(board);
        const botIndex = cordToIndex(r, c);

        dispatch({ type: "BOT_TURN", index: botIndex });
    }

    return (
        <td
            className="border-1 w-16 h-16 text-center align-middle cursor-pointer"
            onClick={handleSelect}
        >
            {cell.value}
        </td>
    );
}

export default ConnectCell;
