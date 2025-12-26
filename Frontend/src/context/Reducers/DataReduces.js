export const initialState = {
    data: []
};

export const DataReducer = (state, action) => {
    switch (action.type) {
        case "MOVE_TASK": {
            const { taskId, sourceColId, destColId } = action.payload;
            const newSourceTaskIds = state.columns[sourceColId].taskIds.filter(task => task !== taskId);

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

            const updatedColumnTasksList = [...state.columns[columnId].taskId, newTask.id];

            const updatedTasks = {
                ...state.tasks, [newTask.id]: newTask
            };

            return {
                ...state,
                tasks: updatedTasks,
                columns: { ...state.columns, [columnId]: { ...state.columns[columnId], taskIds: updatedColumnTasksList } }
            };
        }

        default:
            return state
    }
};