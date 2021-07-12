//sellectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');


// Event Listeners
window.addEventListener('load',getTodo);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

// functions
function addTodo(event){
    // prevent form upload
    event.preventDefault();

    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // adding Li to the div
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveTodos(todoInput.value);
    // adding completed Button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML ='<i class = "fas fa-check "></i>';
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);

    // adding trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML ='<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);
    
    //Clear Todo Input value
    todoInput.value = ""; 
    
}

// programming the delete and complete buttons
function deleteCheck(e){
    const item = e.target;
    
    // Delete The todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
        todo.remove();

        });
        
    }
    
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('todo-item-complete');
        
        
        
        
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('todo-item-complete')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('todo-item-complete')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            default:
                todo.style.display = "flex";
        }
    });
    
}

function saveTodos(todo){
    // checking for previous todos
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodo(){
    // checking for previous todos
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        // adding Li to the div
        todoDiv.appendChild(newTodo);
        // adding completed Button 
        const completedButton = document.createElement('button');
        completedButton.innerHTML ='<i class = "fas fa-check "></i>';
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);

        // adding trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML ='<i class="fas fa-trash-alt"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // append to list
        todoList.appendChild(todoDiv);
    });

    
}

function removeLocalTodos(todo){
    // checking for previous todos
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todo.children[0].innerText);
    todos.splice(todos.indexOf(todo.children[0].innerText),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}