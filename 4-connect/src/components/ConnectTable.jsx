import ConnectCell from "./ConnectCell.jsx";
import { useTableContext } from "../hooks/useTableContext.jsx";
import {useEffect, useState} from "react";

function ConnectTable({difficulty, player}) {
    const { cells, dispatch } = useTableContext();
    const [moveCount, setMoveCount] = useState(player === "X" ? 0 : 1);

    useEffect(() => {
        if (moveCount === 16) {
            dispatch({
                type: "RESET"
            })
            setMoveCount(0);
        }
    }, [moveCount])

    return (
        <table className="border-collapse border-2">
            <tbody>
            {[0, 1, 2, 3].map((r) => (
                <tr key={r}>
                    {[0, 1, 2, 3].map((c) => {
                        const cell = cells[r * 4 + c];
                        return (
                            <ConnectCell
                                key={c}
                                indRow={r}
                                indCol={c}
                                cell={cell}
                                setMoveCount={setMoveCount}
                                difficulty={difficulty}
                                player={player}
                            />
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ConnectTable;
