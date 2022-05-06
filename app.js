//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#filter-todo');
console.log(filterOption);

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions 
function addTodo(e) {
    e.preventDefault();
    //create div container - will contain: li, complete-btn, trash-btn
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add to local storage
    saveLocalTodos(todoInput.value);
    //checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append div to list
    todoList.appendChild(todoDiv);
    //clear input 
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    // delete todo
    if (item.classList.value === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocaltodos(todo);
        todo.addEventListener('transitioned', function() {
            todo.remove();
        })
        
    }
    // check todo
    if (item.classList.value === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
} 
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                } break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                } break;
        }
    })
}
function saveLocalTodos(todo){
    //check if there is already 
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}
function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    //create div container - will contain: li, complete-btn, trash-btn
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append div to list
    todoList.appendChild(todoDiv);
    })
}
function removeLocaltodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}