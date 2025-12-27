import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { DataReducer, initialState } from './Reducers/DataReduces';

const initializer = (initialValue) => {
    const savedData = localStorage.getItem("kanban-data");
    return savedData ? JSON.parse(savedData) : initialValue;
}

const KanbanDataContext = createContext();

export const KanbanDataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DataReducer, initialState, initializer);

    const [openWorkspaces, setOpenWorkspaces] = useState([]);
    const [currentBoard, setCurrentBoard] = useState(null);

    const activeBoardData = currentBoard ? state.boards[currentBoard] : null;

    const toggleWorkspace = (id) => {
        setOpenWorkspaces(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    }

    const setCurrentBoardHandler = (id) => {
        setCurrentBoard(id);
    };

    const activeWorkspaceTitle = useMemo(() => {
        if (!currentBoard) return null;
        const workspace = openWorkspaces
            .map(workspaceId => state.workspaces[workspaceId])
            .find(workspace => workspace?.boardIds?.includes(currentBoard));

        return workspace?.title
    }, [currentBoard, openWorkspaces, state.workspaces]);

    useEffect(() => {
        localStorage.setItem("kanban-data", JSON.stringify(state));
    }, [state]);

    return (
        <KanbanDataContext.Provider value={{
            state,
            dispatch,
            currentBoard,
            setCurrentBoardHandler,
            openWorkspaces,
            activeBoardData,
            toggleWorkspace,
            activeWorkspaceTitle
        }}>{children}</KanbanDataContext.Provider>
    )
};

export const useKanbanData = () => {
    const context = useContext(KanbanDataContext);
    if (!context) throw new Error("useKanbanData must be used in Kanban Data Context Provider.")
    return context;
};