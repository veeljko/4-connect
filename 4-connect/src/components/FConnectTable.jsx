import FConnectCell from "./FConnectCell.jsx"
import {createBoard} from "../minmax/minMaxFConnect.js";
import {useEffect, useState} from "react";
import {useStateContext} from "../hooks/useStateContext.jsx";

function FConnectTable({starterPlayer, boardView, setBoardView}) {
    const [winner, setWinner] = useState(0);
    const {dispatchScore} = useStateContext();

    useEffect( () => {
        //console.log(boardView)
        if (winner !== 0) {
            if (winner === 1) {
                dispatchScore({
                    type: "X_WIN"
                })
            } else {
                dispatchScore({
                    type: "O_WIN",
                })
            }

            setBoardView(createBoard());
            setWinner(0);

        }
    }, [boardView, winner]);


    let player = 0;
    return (
        <table className="border-collapse border-2 border-t-0 bg-blue-500">
            <tbody>
            {[0, 1, 2, 3, 4, 5].map((r) => (
                <tr key={r}>
                    {[0, 1, 2, 3, 4, 5, 6].map((c) => {
                        return (<>
                            <FConnectCell starterPlayer={starterPlayer} indRow={r} indCol={c} boardView={boardView} setBoardView={setBoardView} />
                        </>);
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default FConnectTable;
