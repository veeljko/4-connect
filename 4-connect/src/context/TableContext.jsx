import { createContext, useReducer, useContext } from "react";

export const TableContext = createContext(undefined);

const initialState = Array(16).fill({ value: "" });

function tableReducer(state, action) {
    switch (action.type) {
        case "USER_TURN":
            return state.map((cell, i) =>
                i === action.index ? { value: "X" } : cell
            );
        case "BOT_TURN":
            return state.map((cell, i) =>
                i === action.index ? { value: "O" } : cell
            );
        case "RESET":
            return Array(16).fill({ value: "" });
        default:
            return state;
    }
}

export function TableProvider({ children }) {
    const [cells, dispatch] = useReducer(tableReducer, initialState);
    return (
        <TableContext.Provider value={{ cells, dispatch }}>
            {children}
        </TableContext.Provider>
    );
}

