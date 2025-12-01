import { createContext, useReducer } from "react";

export const StateContext = createContext(undefined);

const initialState = {
    isP1Winner: false,
    isP2Winner: false,
    scoreP1 : 0,
    scoreP2 : 0,
    difficulty : "easy"
};

function scoreReducer(state, action) {
    switch (action.type) {
        case "P1WIN":
            return {...state, isP1Winner: true, scoreP1 : state.scoreP1 + 1};
        case "P2WIN":
            return {...state, isP2Winner: true, scoreP2 : state.scoreP2 + 1};
        case "RESET":
            return {...state, isP1Winner: false, isP2Winner: false};
        case "DIFFICULTY":
            return {...state, difficulty: action.difficulty};
        default:
            return state;
    }
}

export function StateProvider({ children }) {
    const [state, dispatch] = useReducer(scoreReducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
}

