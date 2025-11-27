import { createContext, useReducer, useContext } from "react";

export const ScoreContext = createContext(undefined);

const initialState = {x: 0, o: 0};

function soreReducer(state, action) {
    switch (action.type) {
        case "X_WIN":
            return {x : state.x + 1, o: state.o};
        case "O_WIN":
            return {x : state.x, o: state.o + 1};
        case "RESET":
            return {x : 0, o : 0};
        default:
            return state;
    }
}

export function ScoreProvider({ children }) {
    const [score, dispatchScore] = useReducer(soreReducer, initialState);
    return (
        <ScoreContext.Provider value={{ score, dispatchScore }}>
            {children}
        </ScoreContext.Provider>
    );
}

