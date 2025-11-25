let taskData = [
    {
        toDoTasks: [
            {
                title: "Task 1",
                desc: "Lorem ipsum dolor sit amet consectetur"
            }
        ]
    },
    {
        inProgressTasks: []
    },
    {
        doneTasks: []
    }
];
// Select the main board to use Event Delegation
const board = document.querySelector(".board");
const taskColumns = document.querySelectorAll(".task-column");
const taskContainers = document.querySelectorAll(".tasks");

let draggedTask = null;

// 1. DRAG START (Event Delegation)
// Instead of looping through tasks, we listen to the document.
// This ensures NEW tasks created later are also draggable.
document.addEventListener("dragstart", (e) => {
    const targetTask = e.target.closest(".task");
    if (targetTask) {
        draggedTask = targetTask;
        // Optional: Add a class to style the dragging element (transparency)
        targetTask.classList.add("is-dragging");
    }
});

document.addEventListener("dragend", (e) => {
    const targetTask = e.target.closest(".task");
    if (targetTask) {
        targetTask.classList.remove("is-dragging");
        draggedTask = null;
    }
});

// 2. HANDLE COLUMNS (Drop & Hover Logic)
// We loop through the containers once to set up all drop logic
taskColumns.forEach((column) => {
    const taskContainer = column.querySelector(".tasks");

    // Drag Over (Allow dropping)
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
        column.classList.add("hover-column");
    });

    // Drag Leave (Remove animation)
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        // Logic to prevent flickering when dragging over child elements
        if (!column.contains(e.relatedTarget)) {
            column.classList.remove("hover-column");
        }
    });

    // Drop (Finalize move)
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.classList.remove("hover-column");

        if (draggedTask) {
            taskContainer.appendChild(draggedTask);
            // Optional: Update counts here later
        }
    });
});

// 3. DELETE TASK LOGIC (Event Delegation)
// We listen for clicks on the board. If the click was on a Delete button, remove the task.
board.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.innerText === "Delete") {
        const taskToRemove = e.target.closest(".task");
        if (taskToRemove) {
            taskToRemove.remove();
        }
    }
});

// Modal Logic
const modalBtn = document.querySelector("#active-modal-btn");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-bg");
const addNewTaskBtn = document.querySelector("#add-new-task");
const taskTitleInput = document.querySelector("#task-title-input");
const taskDescInput = document.querySelector("#task-desc-input");

modalBtn.addEventListener("click", (e) => {
    modal.classList.toggle("modal-active");
})

modalBg.addEventListener("click", () => {
    modal.classList.toggle("modal-active");
})

const addNewTask = () => {
    let title = taskTitleInput.value.trim();
    let desc = taskDescInput.value.trim();

    // let div = document.createElement("div");
    // div.classList.add("task");
    // div.setAttribute("draggable", "true");

    // div.innerHTML = `<div class="task-head">
    //                         <h3>${title}</h3>
    //                         <button>Delete</button>
    //                     </div>
    //                     <div class="task-body">
    //                         <p>${desc}</p>
    //                     </div>`;


    taskData[0].toDoTasks.push({
        title, desc
    });

    loadData();

    modal.classList.toggle("modal-active");

    taskTitleInput.value = "";
    taskDescInput.value = "";
}

addNewTaskBtn.addEventListener("click", () => {
    addNewTask();
})

const loadData = () => {
    
}

loadData();