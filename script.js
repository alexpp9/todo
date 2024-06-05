// URL to API
const apiURL = 'https://jsonplaceholder.typicode.com/todos';

// Get todos;
const getTodos = () => {
  // concatinate "?_limit=10" to give us only 10 todos
  fetch(apiURL + '?_limit=10')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todo) => addTodoToDOM(todo));
    });
};

// addTodoToDOM
const addTodoToDOM = (todo) => {
  const div = document.createElement('div');
  //   For the toggle
  div.classList.add('todo');
  // Adds text to the div in the form of a textNode,
  // using the title of the todo returned;
  div.appendChild(document.createTextNode(todo.title));
  // Add ID for later use;
  div.setAttribute('data-id', todo.id);
  // Adds a class of "done" to those todos that
  // have a property of completed: true;
  // To differentiate between completed todos & not yet...
  if (todo.completed) {
    div.classList.add('done');
  }
  // Add to DOM
  document.getElementById('todo-list').appendChild(div);
};

// create todo
const createTodo = (e) => {
  e.preventDefault();
  //   Create new todo with value of input
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };
  // Make the POST request to the API
  fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    //   With the Promise returned, take the data and add it to the DOM
    // Using the addTodoToDOM function
    .then((response) => response.json())
    .then((data) => addTodoToDOM(data));
};
// Toggle completed
const toggleCompleted = (e) => {
  if (e.target.classList.contains('todo')) {
    e.target.classList.toggle('done');

    // To API
    updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
  }
};

// updateTodo
const updateTodo = (id, completed) => {
  // We get id from "data-id" added in addTodoToDOM
  fetch(`${apiURL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Dev
      console.log(data);
    });
};

// Delete todo
const deleteTodo = (e) => {
  if (e.target.classList.contains('todo')) {
    const id = e.target.dataset.id;

    fetch(`${apiURL}/${id}`, {
      method: 'DELETE',
    })
      .then((reponse) => reponse.json())
      // Removes from DOM
      .then(() => e.target.remove());
  }
};

// Init on load
const init = () => {
  // Get todos on DOM load
  document.addEventListener('DOMContentLoaded', getTodos);
  // Create new todo
  document.querySelector('#todo-form').addEventListener('submit', createTodo);
  // Toggle todo completed
  document
    .querySelector('#todo-list')
    .addEventListener('click', toggleCompleted);
  // Delete
  document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo);
};

// Execute
init();
