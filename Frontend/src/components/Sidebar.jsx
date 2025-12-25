import { useEffect, useRef, useState } from 'react'
import ProfileImage from "/icons8-customer-96.png"

const Sidebar = ({ openWorkspaces, currentBoard, toggleWorkspace, MOCK_DATA, onSelectBoard }) => {
    const [openSetting, setOpenSetting] = useState(false);

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpenSetting(false);
            }
        };

        if (openSetting) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSetting]);

    const toggleSetting = () => setOpenSetting(prev => !prev);

    return (
        <aside className='bg-zinc-900 h-screen w-64 shadow-2xl flex flex-col border-r border-white/5 text-zinc-400 font-sans'>

            {/* 1. BRANDING & LOGO */}
            <div className='p-6 mb-2'>
                <h1 className='text-xl font-bold text-white tracking-tighter flex items-center gap-2'>
                    <div className='w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-[12px]'>K</div>
                    KANBAN <span className='text-blue-500'>.</span>
                </h1>
            </div>

            {/* 2. NAVIGATION (Workspaces & Boards) */}
            <div className='flex-1 px-3 overflow-y-auto custom-scrollbar space-y-2'>

                <p className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-4'>
                    Workspaces ({MOCK_DATA.workspaces.length})
                </p>

                {MOCK_DATA.workspaces.map(workspace => (
                    <div key={workspace.id} className="mb-2">
                        {/* Workspace Header */}
                        <button
                            onClick={() => toggleWorkspace(workspace.id)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-all group"
                        >
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] transition-transform duration-200 ${openWorkspaces.includes(workspace.id) ? 'rotate-90' : ''}`}>
                                    ▶
                                </span>
                                <span className={`text-sm font-semibold transition-colors ${openWorkspaces.includes(workspace.id) ? 'text-zinc-200' : 'text-zinc-500'}`}>
                                    {workspace.title}
                                </span>
                            </div>
                            <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 group-hover:text-zinc-300">
                                {workspace.boards.length}
                            </span>
                        </button>

                        {/* Collapsible Boards List */}
                        {openWorkspaces.includes(workspace.id) && (
                            <nav className="mt-1 space-y-0.5 ml-3 border-l border-zinc-800">
                                {workspace.boards.map(board => (
                                    <button
                                        key={board.id}
                                        onClick={() => onSelectBoard(board.id)}
                                        className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-r-md transition-all group
                                            ${currentBoard === board.id
                                                ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 shadow-[inset_10px_0_15px_-10px_rgba(37,99,235,0.2)]"
                                                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`transition-transform duration-300 ${currentBoard === board.id ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
                                                {board.icon}
                                            </span>
                                            <span className="truncate max-w-[120px]">{board.name}</span>
                                        </div>

                                        {board.taskCount > 0 && (
                                            <span className={`text-[10px] font-medium ${currentBoard === board.id ? 'text-blue-400' : 'text-zinc-600'}`}>
                                                {board.taskCount}
                                            </span>
                                        )}
                                    </button>
                                ))}

                                <button className='w-full py-2 pl-4 flex items-center gap-2 text-[11px] font-medium text-zinc-600 hover:text-blue-400 transition-colors'>
                                    <span>+</span> Add Board
                                </button>
                            </nav>
                        )}
                    </div>
                ))}
            </div>

            {/* 3. USER PROFILE SECTION */}
            <div className='p-4 border-t border-white/5 bg-zinc-900/80 mt-auto relative'>
                <div
                    onClick={toggleSetting}
                    className='flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-lg cursor-pointer group transition-colors'>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-700 group-hover:ring-blue-500 transition-all">
                            <img src={ProfileImage} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-xs font-bold text-zinc-200 truncate w-24'>{MOCK_DATA.user.name}</span>
                            <span className='text-[10px] text-zinc-500'>Pro Plan</span>
                        </div>
                    </div>
                    <span className="text-zinc-600 group-hover:text-zinc-400 text-xs">⚙️</span>


                </div>
                {openSetting && (
                    <div
                        ref={modalRef}
                        className='setting-modal absolute bottom-18 left-6 w-56 bg-zinc-800 border border-white/10 text-zinc-400 font-medium rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200'>

                        <div className="px-4 py-3 border-b border-white/5">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Account Settings</p>
                        </div>

                        <div className="p-1.5">
                            {[
                                { label: "Change Profile Image", icon: "🖼️" },
                                { label: "Change Password", icon: "🔑" },
                            ].map((option, idx) => (
                                <button
                                    key={idx}
                                    className='w-full flex items-center gap-3 rounded-lg hover:text-zinc-100 hover:bg-white/5 text-left px-3 py-2.5 cursor-pointer transition-colors text-sm'
                                >
                                    <span className="text-base">{option.icon}</span>
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        <div className="p-1.5 border-t border-white/5 bg-zinc-800/50">
                            <button
                                className='w-full flex items-center gap-3 rounded-lg text-red-400 hover:bg-red-500/10 text-left px-3 py-2.5 cursor-pointer transition-colors text-sm font-semibold'
                            >
                                <span className="text-base">🚪</span>
                                Logout User
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar