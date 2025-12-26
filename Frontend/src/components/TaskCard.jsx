import { useKanbanData } from "../context/DataContext"

const TaskCard = ({ taskId, currentColumnId }) => {

  const { state, dispatch, activeBoardData } = useKanbanData();
  const task = state.tasks[taskId];
  const boardColumnsIds = activeBoardData?.columnIds || [];

  return (
    <div className="bg-zinc-800/50 border border-white/5 p-4 rounded-xl shadow-sm hover:border-blue-500/40 transition-all cursor-pointer group mb-3">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold uppercase tracking-wider">
          {task.label}
        </span>
      </div>
      <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
        {task.content}
      </h4>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-zinc-700 border border-zinc-600"></div>
          <span className="text-[10px] text-zinc-500 font-medium">{task.date}</span>
        </div>
        <span className={`text-[10px] font-bold ${task.priority === 'High' ? 'text-red-500' : 'text-zinc-500'}`}>
          ●
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1">
        <span className="text-[9px] text-zinc-500 uppercase font-bold w-full mb-1">Move to:</span>
        {
          boardColumnsIds
            .filter(columnId => columnId !== currentColumnId)
            .map(columnId => {
              const targetColumn = state.columns[columnId];
              return (
                <button
                  key={targetColumn.id}
                  onClick={() => dispatch({
                    type: "MOVE_TASK",
                    payload: { taskId, sourceColId: currentColumnId, destColId: targetColumn.id }
                  })}
                  className="text-[9px] px-1.5 py-0.5 bg-zinc-700 hover:bg-blue-600 rounded transition-colors text-zinc-300"
                >
                  {targetColumn.title}
                </button>
              )
            })
        }
      </div>
    </div >
  )
}

export default TaskCard