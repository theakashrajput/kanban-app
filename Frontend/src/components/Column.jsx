import TaskCard from './TaskCard'

const Column = ({ data, allColumns }) => {

    return (
        <div className="w-80 shrink-0 flex flex-col h-full bg-zinc-900/30 rounded-xl border border-white/5">
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${data.color}`}></div>
                    <h3 className="font-bold text-zinc-200 text-sm uppercase tracking-tight">{data.title}</h3>
                    <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full font-bold">{data.tasks.length}</span>
                </div>
                <button className="text-zinc-600 hover:text-zinc-400 text-lg">•••</button>
            </div>

            {/* Task Cards Container */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar">
                {/* Card Design Reference */}
                {
                    data.tasks.map(task => <TaskCard allColumns={allColumns} key={task.id} taskData={{ ...task }} />)
                }
            </div>

            {/* Add Card Footer */}
            <button className="p-3 m-2 rounded-lg border border-dashed border-zinc-800 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/20 text-sm font-medium transition-all text-left">
                + Add Card
            </button>
        </div>
    )
}

export default Column