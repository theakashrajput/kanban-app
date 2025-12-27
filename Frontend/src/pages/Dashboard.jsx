import Sidebar from '../components/Sidebar';
import Board from '../components/Board';

const Dashboard = () => {

  return (
    <div className='bg-zinc-950 text-white h-screen w-full flex overflow-hidden'>
      <Sidebar />
      <Board />
    </div>
  )
}

export default Dashboard