import { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Board from '../components/Board';
import { MOCK_DATA } from '../data';

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