export const initialState = {
    tasks: {},
    columns: {},
    boards: {},
    workspaces: {}
};

export const DataReducer = (state, action) => {
    switch (action.type) {
        case "MOVE_TASK": {
            const { taskId, sourceColId, destColId } = action.payload;
            const newSourceTaskIds = state.columns[sourceColId].taskIds.filter(id => id !== taskId);
            const newDestTaskIds = [...state.columns[destColId].taskIds, taskId];

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [sourceColId]: { ...state.columns[sourceColId], taskIds: newSourceTaskIds },
                    [destColId]: { ...state.columns[destColId], taskIds: newDestTaskIds }
                }
            };
        }

        case "ADD_NEW_TASK": {
            const { newTask, columnId } = action.payload;
            const updatedColumnTasksList = [...state.columns[columnId]?.taskIds || [], newTask.id];

            return {
                ...state,
                tasks: { ...state.tasks, [newTask.id]: newTask },
                columns: { ...state.columns, [columnId]: { ...state.columns[columnId], taskIds: updatedColumnTasksList } }
            };
        }

        default:
            return state
    }
};