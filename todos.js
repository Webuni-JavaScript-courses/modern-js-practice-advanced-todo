import { calculateProgess } from "./calculator.js";

const todo1 = {
    name: 'Clean bathroom',
    isCompleted: false,
    difficulty: 2
};

const todo2 = {
    name: 'Laundry',
    isCompleted: false,
    difficulty: 4
};

const todo3 = {
    name: 'Dishes',
    isCompleted: false,
    difficulty: 3
};

const todos = [
    todo1,
    todo2,
    todo3
];

let maxDifficulty;

export const initTodos = () => {
    initSaveButton();
    initOrderButtons();

    updateTodos();
};

const updateProgress = () => {
    document.querySelector('#progess').textContent = `${Math.round(calculateProgess(todos) * 100)}%`;
};

const displayTodos = () => {
    const container = document.querySelector('#todos');
    container.innerHTML = '';
    todos.forEach((todo, index) => displayTodo(todo, index));
};

const displayTodo = (todo, index) => {
    const container = document.querySelector('#todos');
    container.insertAdjacentHTML('beforeend', `
            <div id="todo${index}" class="${todo.isCompleted ? 'complete' : 'incomplete'}">
              <input id="checkbox${index}" ${todo.isCompleted ? 'checked' : ''} type="checkbox">
              ${index + 1}. ${todo.name} - ${todo.difficulty}
              <button id="delete${index}" class="delete">X</button>
            </div>`
        );
    addEventListener(index);
};

const addEventListener = index => {
    const checbox = document.querySelector(`#checkbox${index}`);
    checbox.addEventListener('change', () => {
        todos[index].isCompleted = checbox.checked;
        updateTodos();
    });

    const button = document.querySelector(`#delete${index}`);
    button.addEventListener('click', () => {
        todos.splice(index, 1);
        updateTodos();
    });
};

const initOrderButtons = () => {
    document.querySelector('#order-asc').addEventListener('click', () => {
        todos.sort((t1, t2) => t1.difficulty < t2.difficulty ? -1 : (t1.difficulty === t2.difficulty ? 0 : 1));
        updateTodos();
    });

    document.querySelector('#order-desc').addEventListener('click', () => {
        todos.sort((t1, t2) => t1.difficulty < t2.difficulty ? 1 : (t1.difficulty === t2.difficulty ? 0 : -1));
        updateTodos();
    });
};

const initSaveButton = () => {
    document.querySelector('#save').addEventListener('click', () => {
        const name = document.querySelector('#name').value;
        const difficulty = Number(document.querySelector('#difficulty').value);
        document.querySelector('#name').value = '';
        document.querySelector('#difficulty').value = '';
        const todo = {name, difficulty};
        todos.push(todo);
        displayTodo(todo, todos.length - 1);
        updateProgress();
        updateMaxDifficulty();
        updateHardestTodo();
    });
};

const updateMaxDifficulty = () => {
    maxDifficulty = Math.max(...todos.map(t => t.difficulty));
    document.querySelector('#max-difficulty').textContent = maxDifficulty;
};

const updateHardestTodo = () => {
    document.querySelector('#hardest-todo').textContent = todos.find(t => t.difficulty === maxDifficulty).name;
};

const updateTodos = () => {
    displayTodos();
    updateProgress();
    updateMaxDifficulty();
    updateHardestTodo();
};