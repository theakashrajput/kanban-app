import { createContext, useReducer, useState } from 'react'
import { INITIAL_DATA } from '../data';
import { DataReducer } from './Reducers/DataReduces';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(DataReducer, INITIAL_DATA);

    useEffect(() => {
        localStorage.setItem("kanban-data", JSON.stringify(state));
    }, [state]);

    return (
        <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>
    )
};
