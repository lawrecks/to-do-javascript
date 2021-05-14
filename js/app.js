// Dummy data
let todos = [
  {
    id: 1,
    title: "Complete online javascript course",
    status: "completed",
    toggleStatus: function () {
      if (this.status == "completed") {
        this.status = "active";
      } else {
        this.status = "completed";
      }
    },
  },
  {
    id: 2,
    title: "Jog around the park 3x",
    status: "active",
    toggleStatus: function () {
      if (this.status == "completed") {
        this.status = "active";
      } else {
        this.status = "completed";
      }
    },
  },
  {
    id: 3,
    title: "10 minutes meditation",
    status: "active",
    toggleStatus: function () {
      if (this.status == "completed") {
        this.status = "active";
      } else {
        this.status = "completed";
      }
    },
  },
  {
    id: 4,
    title: "Read for 1 hour",
    status: "active",
    toggleStatus: function () {
      if (this.status == "completed") {
        this.status = "active";
      } else {
        this.status = "completed";
      }
    },
  },
  {
    id: 5,
    title: "Pick up groceries",
    status: "active",
    toggleStatus: function () {
      if (this.status == "completed") {
        this.status = "active";
      } else {
        this.status = "completed";
      }
    },
  },
  {
    id: 6,
    title: "Complete Todo App on Frontend Mentor",
    status: "active",
    toggleStatus: function () {
      if (this.status == "completed") {
        this.status = "active";
      } else {
        this.status = "completed";
      }
    },
  },
];

let todosCopy = todos;

let todoList = document.getElementById("todoList");

// Function to sort todos based on id
const sortTodos = (a, b) => {
  return a.id - b.id;
};

refresh(todos);

// Function to refresh the rendered HTML with the updated todos array
function refresh(arr, updateTodo) {
  todoList.innerHTML = "";
  if (updateTodo) {
    todos = arr;
  }
  // Sort todos
  arr.sort(sortTodos);

  // Render HTML
  for (let todo of arr) {
    todoList.innerHTML += `<div class="list-item" 
                                    draggable="true" 
                                    ondragstart="dragTodo(event, ${todo.id})" 
                                    ondrop="dropTodo(event, ${todo.id})"
                                    ondragover="allowDrop(event)">
                                    <div class="checkbox ${
                                      todo.status == "active"
                                        ? "un-checked"
                                        : "checked"
                                    }">
                                        <input type="checkbox" ${
                                          todo.status == "active"
                                            ? ""
                                            : "checked"
                                        } id="${
      todo.id
    }" onclick="changeStatus(this)">
                                        <label for="${todo.id}"><span>${
      todo.title
    }</span></label>
                                    </div>
                                    <div class="delete-to-do">
                                        <img src="images/icon-cross.svg" alt="delete" onclick="deleteTodo(${
                                          todo.id
                                        })">
                                    </div>
                                </div>`;
  }

  // Update the number of active todos rendered
  let active = arr.filter((todo) => {
    return todo.status == "active";
  });
  document.getElementById("itemsLeft").innerHTML =
    active.length + " items left";
}

// Function to change the status of a todo item
const changeStatus = (element) => {
  if (element.parentNode.classList.contains("checked")) {
    element.parentNode.removeAttribute("checked");
    element.parentNode.classList.remove("checked");
    element.parentNode.classList.add("un-checked");
  } else if (element.parentNode.classList.contains("un-checked")) {
    element.parentNode.setAttribute("checked", true);
    element.parentNode.classList.remove("un-checked");
    element.parentNode.classList.add("checked");
  }

  todos.map((todo) => {
    return todo.id == element.getAttribute("id") ? todo.toggleStatus() : "";
  });
};

// Function to create a todo item
const addTodoItem = () => {
  let input = document.getElementById("todoInput");

  // Check input value
  if (input.value == "") {
    return;
  }

  // Create new entry
  let newTodo = {
    id: todos.length + 1,
    title: input.value,
    status: "active",
    toggleStatus: function () {
      if (this.status == "completed") {
        this.status = "active";
      } else {
        this.status = "completed";
      }
    },
  };

  todos.push(newTodo);
  //Reset input
  input.value = "";

  refresh(todos);
};

// Function to delete a todo item
const deleteTodo = (id) => {
  let index = todos.findIndex((item) => {
    return item.id === id;
  });
  todos.splice(index, 1);
  refresh(todos);
};

// Function to clear all completed todos
const clearCompletedTodos = (mobile) => {
  let tabs = document.getElementsByClassName("tab");
  let tabsMobile = document.getElementsByClassName("tab-m");
  // Reset active class
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  // For mobile
  for (let i = 0; i < tabsMobile.length; i++) {
    tabsMobile[i].classList.remove("active");
  }
  // Add active class to 'All' tab
  tabs[0].classList.add("active");
  tabsMobile[0].classList.add("active");
  // Get only active todos
  let activeTodos = todos.filter((todo) => {
    return todo.status == "active";
  });
  todos = activeTodos;
  refresh(todos);
};

// Function to show active todos only
const showActiveTodos = (element, mobile) => {
  let tabs = mobile
    ? document.getElementsByClassName("tab-m")
    : document.getElementsByClassName("tab");
  // Reset active class
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  // Add active class to this tab
  element.classList.add("active");
  // Get only active todos
  let activeTodos = todos.filter((todo) => {
    return todo.status == "active";
  });

  todosCopy = activeTodos;
  refresh(activeTodos);
};

// Function to show completed todos only
const showCompletedTodos = (element, mobile) => {
  let tabs = mobile
    ? document.getElementsByClassName("tab-m")
    : document.getElementsByClassName("tab");
  // Reset active class
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  // Add active class to this tab
  element.classList.add("active");
  // Get only completed todos
  let completedTodos = todos.filter((todo) => {
    return todo.status == "completed";
  });
  todosCopy = completedTodos;
  refresh(completedTodos);
};

// Function to show all todos
const showAllTodos = (element, mobile) => {
  let tabs = mobile
    ? document.getElementsByClassName("tab-m")
    : document.getElementsByClassName("tab");
  // Reset active class
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  // Add active class to this tab
  element.classList.add("active");

  refresh(todos);
};

// Function to handle drag event
const dragTodo = (ev, id) => {
  // Store transfer data
  ev.dataTransfer.setData("todoItem", id);
};

// Function to handle drop event
const dropTodo = (ev, id) => {
  ev.preventDefault();
  // Get stored transfer data
  let data = ev.dataTransfer.getData("todoItem");
  // Find involved indices in todos array
  let todoIndex1 = todosCopy.findIndex((item) => {
    return item.id === parseInt(data);
  });
  let todoIndex2 = todosCopy.findIndex((item) => {
    return item.id === id;
  });
  // Switch the ids
  todosCopy[todoIndex1].id = id;
  todosCopy[todoIndex2].id = parseInt(data);

  refresh(todosCopy);
};

// Function to allow drop
const allowDrop = (ev) => {
  ev.preventDefault();
};

// Function to toggle the current theme
function toggleTheme(element) {
  let link = document.getElementById("todoStyle");

  // Check current theme and toggle theme and icon
  if ("styles/dark" == link.theme) {
    link.theme = "styles/light";
    element.src = "images/icon-moon.svg";
  } else {
    link.theme = "styles/dark";
    element.src = "images/icon-sun.svg";
  }

  // Append css extension
  link.href = link.theme + ".css";
}
