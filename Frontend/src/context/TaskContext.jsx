import React, { createContext, useReducer } from 'react'

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer();

    return (
        <TaskContext.Provider >{children}</TaskContext.Provider>
    )
};
