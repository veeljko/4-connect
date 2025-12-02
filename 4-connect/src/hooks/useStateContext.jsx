import {useContext} from "react";
import {StateContext} from "../context/./StateContext.jsx";


export const useStateContext = () => {
    const context = useContext(StateContext)

    if(!context) {
        throw Error('StateContext must be used inside an StateProvider')
    }

    return context
}