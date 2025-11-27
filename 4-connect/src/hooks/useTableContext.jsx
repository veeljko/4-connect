import {useContext} from "react";
import {TableContext} from "../context/TableContext.jsx";


export const useTableContext = () => {
    const context = useContext(TableContext)

    if(!context) {
        throw Error('TableContext must be used inside an AuthContextProvider')
    }

    return context
}