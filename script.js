let taskData = {
    toDoTasks: [],
    inProgressTasks: [],
    doneTasks: []
};

// Select elements
const board = document.querySelector(".board");
const taskColumns = document.querySelectorAll(".task-column");
const taskContainers = document.querySelectorAll(".tasks");

// Modal Elements
const modalBtn = document.querySelector("#active-modal-btn");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-bg");
const addNewTaskBtn = document.querySelector("#add-new-task");
const taskTitleInput = document.querySelector("#task-title-input"); 
const taskDescInput = document.querySelector("#task-desc-input");

let draggedTask = null;

// --- 1. CORE FUNCTIONS ---

// Load data from Object to HTML
const loadData = () => {
    // Check if we have data in LocalStorage (Optional persistence)
    if(localStorage.getItem("kanbanData")) {
        taskData = JSON.parse(localStorage.getItem("kanbanData"));
    }

    let columns = ["toDoTasks", "inProgressTasks", "doneTasks"];

    columns.forEach((colKey, idx) => {
        let container = taskContainers[idx];
        container.innerHTML = ""; // Clear current HTML
        
        taskData[colKey].forEach((task) => {
            createTaskElement(task.title, task.desc, container);
        });
    });
    updateCounts();
};

// Helper: Create HTML for a task
const createTaskElement = (title, desc, container) => {
    let div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `
        <div class="task-head">
            <h3>${title}</h3>
            <button class="delete-btn">Delete</button>
        </div>
        <div class="task-body">
            <p>${desc}</p>
        </div>`;
    container.appendChild(div);
};

// THE FIX: Sync HTML back to Data Object
const updateTaskData = () => {
    // 1. Reset data arrays
    taskData.toDoTasks = [];
    taskData.inProgressTasks = [];
    taskData.doneTasks = [];

    // 2. Loop through columns and rebuild data
    // Column 0 -> ToDo
    // Column 1 -> InProgress
    // Column 2 -> Done
    
    // Helper to extract data from a DOM column
    const extractData = (columnIndex) => {
        let tasks = taskContainers[columnIndex].querySelectorAll(".task");
        let taskArray = [];
        tasks.forEach(task => {
            taskArray.push({
                title: task.querySelector("h3").innerText,
                desc: task.querySelector("p").innerText
            });
        });
        return taskArray;
    };

    taskData.toDoTasks = extractData(0);
    taskData.inProgressTasks = extractData(1);
    taskData.doneTasks = extractData(2);

    // 3. Save to LocalStorage (So data stays after refresh)
    localStorage.setItem("kanbanData", JSON.stringify(taskData));
    
    updateCounts();
};

const updateCounts = () => {
    taskColumns.forEach((col, idx) => {
        let countSpan = col.querySelector(".h-right");
        countSpan.textContent = taskContainers[idx].children.length;
    });
};


// --- 2. EVENT LISTENERS (Drag & Drop) ---

document.addEventListener("dragstart", (e) => {
    const targetTask = e.target.closest(".task");
    if (targetTask) {
        draggedTask = targetTask;
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

taskColumns.forEach((column) => {
    const taskContainer = column.querySelector(".tasks");

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
        column.classList.add("hover-column");
    });

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        if (!column.contains(e.relatedTarget)) {
            column.classList.remove("hover-column");
        }
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.classList.remove("hover-column");

        if (draggedTask) {
            taskContainer.appendChild(draggedTask);
            // UPDATE DATA AFTER DROP
            updateTaskData(); 
        }
    });
});


// --- 3. DELETE & ADD LOGIC ---

board.addEventListener("click", (e) => {
    // Added class 'delete-btn' to button in createTaskElement
    if (e.target.tagName === "BUTTON" && e.target.innerText === "Delete") {
        const taskToRemove = e.target.closest(".task");
        if (taskToRemove) {
            taskToRemove.remove();
            // UPDATE DATA AFTER DELETE
            updateTaskData(); 
        }
    }
});

// Modal Logic
const toggleModal = () => modal.classList.toggle("modal-active");

modalBtn.addEventListener("click", toggleModal);
modalBg.addEventListener("click", toggleModal);

addNewTaskBtn.addEventListener("click", () => {
    let title = taskTitleInput.value.trim();
    let desc = taskDescInput.value.trim();

    if (!title || !desc) return;

    // Create directly in DOM first
    createTaskElement(title, desc, taskContainers[0]);
    
    // Then Sync to Data
    updateTaskData();

    toggleModal();
    taskTitleInput.value = "";
    taskDescInput.value = "";
});

// Initialize
loadData();