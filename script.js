$(document).ready(function () {
  const $todoList = $('#todo-list');  //ul= to-do list
  const $todoInput = $('#todo-input');  //selects the input field where i can type my task
//load tasks from localstorage and display
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];  //json parse for converting froms string to array
    $todoList.empty();    //clear the current list
    todos.forEach((todo, index) => {  //loop over each task and gets its text and completed status
      const completedClass = todo.completed ? 'completed' : ''; //adds the css class completed, that it applies strikethrough
      //creates new list item using jQuery which includes the complete and delete button
      const $item = $(`  
        <li class="${completedClass}">
          <span>${todo.text}</span>
          <div class="actions">
            <button class="complete-btn" data-index="${index}">✅</button>
            <button class="delete-btn" data-index="${index}">🗑️</button>
          </div>
        </li>
      `);
      $todoList.append($item);  //adds new item to list
    });
  }

  function saveTodos(todos) {  //converts task list to json string and saves in local storage
    localStorage.setItem('todos', JSON.stringify(todos));
  }
//adds new task
  $('#todo-form').on('submit', function (e) {
    e.preventDefault();  //prevent from loading
    const text = $todoInput.val().trim();  //gets input value and remove the extra spaces
    //adds new task to array, saves and reloads the list and then clears the input field
    if (text !== '') {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.push({ text, completed: false });
      saveTodos(todos);
      loadTodos();
      $todoInput.val('');
    }
  });
//deleting a task
  $todoList.on('click', '.delete-btn', function () {
    const index = $(this).data('index');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];   //removes item from array using splice and saves the updated array nd reloads UI
    todos.splice(index, 1);
    saveTodos(todos);
    loadTodos();
  });
//completing a task
//when tick button is clicked, it toggles completed boolean, saves the updated array and refreshes list to a new state
  $todoList.on('click', '.complete-btn', function () {
    const index = $(this).data('index');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    loadTodos();
  });

  // when page loads it will display any task saved in local storage
  loadTodos();
});
