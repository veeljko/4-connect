import { useStateContext } from "../hooks/useStateContext.jsx";
import { Trophy } from "lucide-react";

function Score() {
    const {state} = useStateContext();

    const xLeading = state.scoreP1 > state.scoreP2;
    const oLeading = state.scoreP2 > state.scoreP1;

    return (
        <div className="flex justify-center gap-12 p-4 bg-gray-100 rounded-md shadow-md">
            <div className="flex items-center gap-2 text-center">
                <h2 className="text-lg font-semibold text-blue-600">P1</h2>
                {xLeading && <Trophy className="w-5 h-5 text-yellow-500" />}
                <p className="text-2xl font-bold">{state.scoreP1}</p>
            </div>
            <div className="flex items-center gap-2 text-center">
                <h2 className="text-lg font-semibold text-red-600">P2</h2>
                {oLeading && <Trophy className="w-5 h-5 text-yellow-500" />}
                <p className="text-2xl font-bold">{state.scoreP2}</p>
            </div>
        </div>
    );
}

export default Score;
