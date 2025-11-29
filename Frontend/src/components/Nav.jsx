import { useState } from "react";
import profileImage from "/58509050_9434619.jpg";

const Nav = () => {
  const [option, setOption] = useState(false);
  // const toggleOption = () => {};

  return (
    <nav>
      <div className="left">
        <h2>Kanban Board</h2>
      </div>
      <div className="right">
        <div className="profile" onClick={() => setOption((state) => !state)}>
          <img src={profileImage} alt="profile-image" />
        </div>
        {option && (
          <div className="profile-options">
            <div className="option">Logout</div>
          </div>
        )}
        <button id="active-modal-btn">Add task</button>
      </div>
    </nav>
  );
};

export default Nav;
