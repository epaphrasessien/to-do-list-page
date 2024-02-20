// Get the elements from the HTML document
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const saveTaskButton = document.getElementById("save-task");
const saveIndex = document.getElementById("save-index");
const taskList = document.getElementById("task-list");

// Load the tasks from the local storage
loadTasks();

// Add a click event listener to the add task button
addTaskButton.addEventListener("click", function() {
  // Get the value of the input field
  const task = taskInput.value;

  // Check if the input is not empty
  if (task) {
    // Create a new list item element
    const li = document.createElement("li");

    // Set the text content of the list item to the task
    li.textContent = task;

    // Create a new span element for the delete icon
    const span = document.createElement("span");

    // Set the text content of the span to a cross symbol
    span.textContent = "\u00D7";

    // Add a click event listener to the span
    span.addEventListener("click", function() {
      // Remove the list item from the list
      taskList.removeChild(li);

      // Update the local storage
      updateStorage();
    });

    // Append the span to the list item
    li.appendChild(span);

    // Add a click event listener to the list item
    li.addEventListener("click", function() {
      // Toggle the done class on the list item
      li.classList.toggle("done");

      // Update the local storage
      updateStorage();
    });

    // Add a double-click event listener to the list item
    li.addEventListener("dblclick", function() {
      // Get the index of the list item
      const index = Array.from(taskList.children).indexOf(li);

      // Call the edit function with the index
      edit(index);
    });

    // Append the list item to the list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";

    // Update the local storage
    updateStorage();
  }
});

// Add a click event listener to the save task button
saveTaskButton.addEventListener("click", function() {
  // Call the save function
  save();
});

// Define a function to load the tasks from the local storage
function loadTasks() {
  // Get the tasks from the local storage as a JSON string
  const tasks = localStorage.getItem("tasks");

  // Check if the tasks are not null
  if (tasks) {
    // Parse the JSON string to an array of objects
    const tasksArray = JSON.parse(tasks);

    // Loop through the array of objects
    for (const task of tasksArray) {
      // Create a new list item element
      const li = document.createElement("li");

      // Set the text content of the list item to the task text
      li.textContent = task.text;

      // Check if the task is done
      if (task.done) {
        // Add the done class to the list item
        li.classList.add("done");
      }

      // Create a new span element for the delete icon
      const span = document.createElement("span");

      // Set the text content of the span to a cross symbol
      span.textContent = "\u00D7";

      // Add a click event listener to the span
      span.addEventListener("click", function() {
        // Remove the list item from the list
        taskList.removeChild(li);

        // Update the local storage
        updateStorage();
      });

      // Append the span to the list item
      li.appendChild(span);

      // Add a click event listener to the list item
      li.addEventListener("click", function() {
        // Toggle the done class on the list item
        li.classList.toggle("done");

        // Update the local storage
        updateStorage();
      });

      // Add a double-click event listener to the list item
      li.addEventListener("dblclick", function() {
        // Get the index of the list item
        const index = Array.from(taskList.children).indexOf(li);

        // Call the edit function with the index
        edit(index);
      });

      // Append the list item to the list
      taskList.appendChild(li);
    }
  }
}

// Define a function to update the local storage
function updateStorage() {
  // Get all the list items from the list
  const listItems = taskList.querySelectorAll("li");

  const tasksArray = [];

  for (const listItem of listItems) {
    const taskObject = {};

    let taskText = listItem.textContent;

    taskText = taskText.slice(0, -1);

    taskObject.text = taskText;

    if (listItem.classList.contains("done")) {
      taskObject.done = true;
    } else {
      taskObject.done = false;
    }

    tasksArray.push(taskObject);
  }

  const tasks = JSON.stringify(tasksArray);

  localStorage.setItem("tasks", tasks);
}

function edit(index) {
  const listItem = taskList.children[index];

  let taskText = listItem.textContent;

  taskText = taskText.slice(0, -1);

  const input = document.createElement("input");

  input.value = taskText;

  taskList.replaceChild(input, listItem);

  saveIndex.value = index;

  addTaskButton.style.display = "none";

  saveTaskButton.style.display = "block";
}

function save() {
  const index = saveIndex.value;

  const input = taskList.children[index];

  const taskText = input.value;

  const listItem = document.createElement("li");

  listItem.textContent = taskText;

  const span = document.createElement("span");

  span.textContent = "\u00D7";

  span.addEventListener("click", function() {
    taskList.removeChild(listItem);

    updateStorage();
  });

  listItem.appendChild(span);

  listItem.addEventListener("click", function() {
    listItem.classList.toggle("done");

    updateStorage();
  });


  listItem.addEventListener("dblclick", function() {
    const index = Array.from(taskList.children).indexOf(listItem);

    edit(index);
  });

  taskList.replaceChild(listItem, input);

  saveIndex.value = "";

  saveTaskButton.style.display = "none";

  addTaskButton.style.display = "block";

  updateStorage();
}