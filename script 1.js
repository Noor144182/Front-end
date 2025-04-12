const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const clearTasksBtn = document.getElementById('clear-tasks-btn');

// Event: Add Task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    li.addEventListener('click', () => li.classList.toggle('completed'));

    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
});

clearTasksBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    saveTasks();
});

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((li) => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) li.classList.add('completed');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);
        li.addEventListener('click', () => li.classList.toggle('completed'));

        taskList.appendChild(li);
    });
}

// Load tasks on page load
loadTasks();