

function ChoosePlayer({ player, setPlayer }) {

    const handleSelect = (symbol) => {
        setPlayer(symbol);
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md shadow-md justify-center">
            {/*<span className="font-semibold text-gray-700">Choose Player:</span>*/}

            <button
                className={`px-4 py-2 rounded-md font-bold text-lg
                    ${player === "X"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700"}
                `}
                onClick={() => handleSelect("X")}
            >
                Play First
            </button>

            <button
                className={`px-4 py-2 rounded-md font-bold text-lg
                    ${player === "O"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"}
                `}
                onClick={() => handleSelect("O")}
            >
                Play Second
            </button>
        </div>
    );
}

export default ChoosePlayer;
