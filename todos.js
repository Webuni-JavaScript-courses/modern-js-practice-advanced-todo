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
    todos.forEach((todo, index) => {
        container.innerHTML = container.innerHTML + `
            <div class="${todo.isCompleted ? 'complete' : 'incomplete'}">
                <input ${todo.isCompleted ? 'checked' : ''} type="checkbox">
                ${index + 1}. ${todo.name} - ${todo.difficulty}
                <button class="delete">X</button>
            </div>
        `;
    });
};

const addEventListeners = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((checbox, index) => {
        checbox.addEventListener('change', () => {
            todos[index].isCompleted = checbox.checked;
            updateTodos();
        });
    });

    document.querySelectorAll('.delete').forEach((button, index) => {
        button.addEventListener('click', () => {
            todos.splice(index, 1);
            updateTodos();
        });
    });
}

const initOrderButtons = () => {
    document.querySelector('#order-asc').addEventListener('click', () => {
        // todos.sort((t1, t2) => t1.difficulty < t2.difficulty ? -1 : (t1.difficulty === t2.difficulty ? 0 : 1));
        todos.sort((t1, t2) => t1.difficulty - t2.difficulty);
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
        todos.push({name, difficulty});
        updateTodos();
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
    addEventListeners();
    updateProgress();
    updateMaxDifficulty();
    updateHardestTodo();
};