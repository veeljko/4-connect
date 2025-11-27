import { useScoreContext } from "../hooks/useScoreContext.jsx";
import { Trophy } from "lucide-react";

function Score() {
    const { score } = useScoreContext();

    const xLeading = score.x > score.o;
    const oLeading = score.o > score.x;

    return (
        <div className="flex justify-center gap-12 p-4 bg-gray-100 rounded-md shadow-md">
            <div className="flex items-center gap-2 text-center">
                <h2 className="text-lg font-semibold text-red-600">X</h2>
                {xLeading && <Trophy className="w-5 h-5 text-yellow-500" />}
                <p className="text-2xl font-bold">{score.x}</p>
            </div>
            <div className="flex items-center gap-2 text-center">
                <h2 className="text-lg font-semibold text-blue-600">O</h2>
                {oLeading && <Trophy className="w-5 h-5 text-yellow-500" />}
                <p className="text-2xl font-bold">{score.o}</p>
            </div>
        </div>
    );
}

export default Score;
