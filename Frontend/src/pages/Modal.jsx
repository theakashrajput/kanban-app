const Modal = () => {
  return (
    <div class="modal">
      <div class="modal-bg">
        <i title="close" class="ri-close-large-line"></i>
      </div>
      <div class="modal-input">
        <h4>Add new task</h4>
        <input id="task-title-input" type="text" placeholder="Task title" />
        <textarea
          name="task-desc"
          id="task-desc-input"
          placeholder="Task description"
        ></textarea>
        <button id="add-new-task">Add task</button>
      </div>
    </div>
  );
};

export default Modal;
