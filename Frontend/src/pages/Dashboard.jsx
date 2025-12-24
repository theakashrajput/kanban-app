import { useCallback, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Board from '../components/Board';

const MOCK_DATA = {
  user: { name: "Dev User", id: "u1" },
  workspaces: [
    {
      id: "w1",
      title: "Main Project",
      boards: [
        { id: 11, name: "Marketing Platform", icon: "🚀", taskCount: 12 },
        { id: 12, name: "Mobile App Refactor", icon: "📱", taskCount: 5 },
        { id: 13, name: "Q4 Strategy", icon: "📊", taskCount: 0 }
      ]
    },
    {
      id: "w2",
      title: "Engineering Team",
      boards: [
        { id: 21, name: "API Documentation", icon: "🛠️", taskCount: 3 },
        { id: 22, name: "Frontend Sprint", icon: "⚛️", taskCount: 8 },
      ]
    },
  ]
};

const Dashboard = () => {

  const [currentBoard, setCurrentBoard] = useState(11);
  const [openWorkspaces, setOpenWorkspaces] = useState(["w1"]);

  const toggleWorkspace = (id) => {
    setOpenWorkspaces(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }

  const setCurrentBoardHandler = (id) => {
    setCurrentBoard(id);
  };

  const { activeBoardData, activeWorkspaceTitle } = useMemo(() => {
    let boardMatch = null;
    let workspaceTitle = "";

    MOCK_DATA.workspaces.forEach(workspace => {
      const found = workspace.boards.find(board => board.id === currentBoard);
      if (found) {
        boardMatch = found;
        workspaceTitle = workspace.title;
      }
    });

    return {
      activeBoardData: boardMatch,
      activeWorkspaceTitle: workspaceTitle
    }
  }, [currentBoard]);

  return (
    <div className='bg-zinc-950 text-white h-screen w-full flex overflow-hidden'>
      <Sidebar MOCK_DATA={MOCK_DATA} toggleWorkspace={toggleWorkspace} currentBoard={currentBoard} openWorkspaces={openWorkspaces} onSelectBoard={setCurrentBoardHandler} />
      <Board activeWorkspaceTitle={activeWorkspaceTitle} activeBoardData={activeBoardData} />
    </div>
  )
}

export default Dashboard