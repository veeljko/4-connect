import {useContext} from "react";
import {ScoreContext} from "../context/ScoreContext.jsx";


export const useScoreContext = () => {
    const context = useContext(ScoreContext)

    if(!context) {
        throw Error('ScoreContext must be used inside an AuthContextProvider')
    }

    return context
}