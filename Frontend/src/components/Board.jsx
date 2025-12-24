

const Board = ({ activeWorkspaceTitle, activeBoardData }) => {

    return (
        <div className='h-screen flex-1 bg-zinc-950 flex flex-col overflow-hidden'>
            <header className='flex items-center justify-between p-6 bg-zinc-900/50 border-b border-white/5'>
                <div className='flex items-center gap-4'>
                    <span className='text-3xl'>{activeBoardData?.icon}</span>
                    <div>
                        <h2 className='text-xl font-bold text-white'>{activeBoardData?.name}</h2>
                        <p className='text-xs text-zinc-500'>{activeWorkspaceTitle} / {activeBoardData?.name}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='relative'>
                        <input
                            className='bg-zinc-800 border border-zinc-700 text-sm rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500/70'
                            placeholder='Search tasks...'
                            type="text" />
                    </div>
                </div>
                <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors">
                        ⚙️
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                        + New Task
                    </button>
                </div>
            </header >
            <section className='flex-1 overflow-x-auto overflow-y-hidden p-8 flex gap-6 custom-scrollbar"'>
                {/* To Do Column */}
                <div className="w-80 shrink-0 flex flex-col h-full bg-zinc-900/30 rounded-xl border border-white/5">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <h3 className="font-bold text-zinc-200 text-sm uppercase tracking-tight">To Do</h3>
                            <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full font-bold">3</span>
                        </div>
                        <button className="text-zinc-600 hover:text-zinc-400 text-lg">•••</button>
                    </div>

                    {/* Task Cards Container */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-3">
                        {/* Card Design Reference */}
                        <div className="bg-zinc-800/50 border border-white/5 p-4 rounded-lg shadow-sm hover:border-blue-500/30 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold uppercase">Development</span>
                            </div>
                            <h4 className="text-sm font-medium text-zinc-200 mb-3 group-hover:text-white">Design Board Header Layout</h4>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-700"></div>
                                </div>
                                <span className="text-[10px] text-zinc-500 font-medium">Dec 25</span>
                            </div>
                        </div>
                    </div>

                    {/* Add Card Footer */}
                    <button className="p-3 m-2 rounded-lg border border-dashed border-zinc-800 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/20 text-sm font-medium transition-all text-left">
                        + Add Card
                    </button>
                </div>

                {/* Add New Column Button */}
                <button className="w-80 shrink-0 h-12 bg-zinc-900/20 hover:bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-sm font-bold transition-all">
                    + Add Column
                </button>

            </section>
        </div >
    )
}

export default Board