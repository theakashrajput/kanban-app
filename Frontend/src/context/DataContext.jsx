import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { INITIAL_DATA } from '../data';
import { DataReducer } from './Reducers/DataReduces';

const KanbanDataContext = createContext();

export const KanbanDataContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(DataReducer, INITIAL_DATA);

    const [openWorkspaces, setOpenWorkspaces] = useState([]);
    const [currentBoard, setCurrentBoard] = useState();

    const toggleWorkspace = (id) => {
        setOpenWorkspaces(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    }

    const activeBoardData = state.boards[currentBoard];

    const setCurrentBoardHandler = (id) => {
        setCurrentBoard(id);
    };

    const activeWorkspaceTitle = useMemo(() => {
        const workspace = openWorkspaces
            .map(workspaceId => state.workspaces[workspaceId])
            .find(workspace => workspace.boardIds.includes(currentBoard));

        return workspace?.title
    }, [currentBoard]);

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