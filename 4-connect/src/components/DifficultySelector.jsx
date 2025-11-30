

function DifficultySelector({ difficulty, setDifficulty }) {

    const handleSelect = (level) => {
        setDifficulty(level);
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md shadow-md justify-center">
            {/*<span className="font-semibold text-gray-700">Difficulty:</span>*/}
            <button
                className={`px-4 py-2 rounded-md font-medium ${
                    difficulty === "easy"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleSelect("easy")}
            >
                Easy
            </button>
            <button
                className={`px-4 py-2 rounded-md font-medium ${
                    difficulty === "hard"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleSelect("hard")}
            >
                Hard
            </button>
        </div>
    );
}

export default DifficultySelector;
