import { useEffect, useState } from "react";
import { BOARD_DATA } from "../data";
import Column from "./Column";

const Board = ({ activeWorkspaceTitle, activeBoardData }) => {

    const [allColumns, setAllColumns] = useState([]);

    useEffect(() => {
        setAllColumns(BOARD_DATA.columns);
    }, [BOARD_DATA]);

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
            <section className='flex-1 overflow-x-scroll overflow-y-hidden p-8 flex gap-6 custom-scrollbar block"'>
                {allColumns.map(column => <Column allColumns={allColumns} key={column.id} data={{ ...column }} />)}

                {/* Add New Column Button */}
                <button className="w-80 shrink-0 h-12 bg-zinc-900/20 hover:bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-sm font-bold transition-all">
                    + Add Column
                </button>

            </section>
        </div >
    )
}

export default Board