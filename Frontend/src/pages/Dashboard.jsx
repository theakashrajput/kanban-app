import Sidebar from '../components/Sidebar';
import Board from '../components/Board';
import { useKanbanData } from '../context/DataContext';

const Dashboard = () => {

  const { state } = useKanbanData();

  return (
    <div className='bg-zinc-950 text-white h-screen w-full flex overflow-hidden'>
      <Sidebar />
      <Board />
    </div>
  )
}

export default Dashboard