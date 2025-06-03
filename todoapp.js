const addButton = document.getElementById("add-task-button"); // Add Task button
const taskInput = document.getElementById("task-input"); // Task input field
const taskList = document.getElementById("task-list"); // Task list container

function createTaskElement(taskText) {
  // Create the list item element
  const li = document.createElement("li");
  li.classList.add("todo-item");

  li.innerHTML = `
        <span class="todo-task-text">${taskText}</span>
        <div class="todo-actions">
            <button class="todo-delete-btn">Delete</button>
            <button class="todo-edit-btn">Edit</button>
        </div>
    `;

  // Append the new task to the list
  taskList.appendChild(li);

  // Remove the task item when Delete is clicked
  li.querySelector(".todo-delete-btn").addEventListener("click", () => {
    li.remove();
  });

  // Toggle between Edit and Save modes for the task
  const editButton = li.querySelector(".todo-edit-btn");
  let isEditing = false; // Track whether the task is in edit mode

  editButton.addEventListener("click", () => {
    // Get the current task text or the input field if in edit mode
    const taskSpanOrInput =
      li.querySelector(".todo-task-text") ||
      li.querySelector('input[type="text"].todo-task-text');

    if (!isEditing) {
      // Switch to Edit Mode
      const currentText = taskSpanOrInput.textContent;
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = currentText;
      inputField.className = "todo-task-text";
      inputField.style.flex = "1";
      taskSpanOrInput.replaceWith(inputField);

      editButton.textContent = "Save";
      isEditing = true;
      inputField.focus();

      // Allow saving the task by pressing Enter
      inputField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          editButton.click();
        }
      });
    } else {
      //Save the Edited Task
      const inputField = li.querySelector('input[type="text"].todo-task-text');
      const newTaskText = inputField.value.trim();
      if (newTaskText !== "") {
        const newTaskSpan = document.createElement("span");
        newTaskSpan.textContent = newTaskText;
        newTaskSpan.className = "todo-task-text";
        inputField.replaceWith(newTaskSpan);

        editButton.textContent = "Edit";
        isEditing = false;
      } else {
        // Show a toast notification if the input is empty
        Toastify({
          text: "Task name cannot be empty!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "#f44336",
          stopOnFocus: true,
        }).showToast();
      }
    }
  });
}

// Add a new task when the button is clicked
addButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    // Show a toast notification if the input is empty
    Toastify({
      text: "Please enter a task!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "#f44336",
      stopOnFocus: true,
    }).showToast();
    return;
  }

  // Create and append the new task
  createTaskElement(taskText);

  // Clear the input field after adding the task
  taskInput.value = "";
});

//Add task on Enter key
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addButton.click();
  }
});
