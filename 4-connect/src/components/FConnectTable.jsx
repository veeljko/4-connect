import FConnectCell from "./FConnectCell.jsx"
import {createBoard} from "../minmax/minMac4Connect.js";
import {useEffect, useState} from "react";
import {useScoreContext} from "../hooks/useScoreContext.jsx";

function FConnectTable({difficulty, starterPlayer, boardView, setBoardView}) {
    const [winner, setWinner] = useState(0);
    const {dispatchScore} = useScoreContext();

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
            if (winner === 1) console.log("X win");
            else console.log("O win");
            for (let i = 0; i < 6; i++) {
                console.log(i + " : " + boardView[i].join(' '));
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
                            <FConnectCell starterPlayer={starterPlayer} difficulty={difficulty} setWinner={setWinner} indRow={r} indCol={c} boardView={boardView} setBoardView={setBoardView} />
                        </>);
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default FConnectTable;
