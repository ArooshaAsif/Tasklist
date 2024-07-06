document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    let tasks = [];

    window.addTask = () => {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        newTaskInput.value = '';
        renderTasks();
    };

    window.editTask = (button) => {
        const taskItem = button.parentElement.parentElement;
        const taskId = taskItem.dataset.id;
        const task = tasks.find(t => t.id == taskId);
        const newTaskText = prompt('Edit your task', task.text);
        if (newTaskText && newTaskText.trim() !== '') {
            task.text = newTaskText.trim();
            renderTasks();
        }
    };

    window.deleteTask = (button) => {
        const taskItem = button.parentElement.parentElement;
        const taskId = taskItem.dataset.id;
        tasks = tasks.filter(t => t.id != taskId);
        renderTasks();
    };

    window.markTask = (checkbox) => {
        const taskItem = checkbox.parentElement.parentElement;
        const taskId = taskItem.dataset.id;
        const task = tasks.find(t => t.id == taskId);
        task.completed = checkbox.checked;
        renderTasks();
    };

    window.filterTasks = (filter) => {
        currentFilter = filter;
        renderTasks();
    };

    let currentFilter = 'all';

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            if (currentFilter === 'pending' && task.completed) return;
            if (currentFilter === 'completed' && !task.completed) return;

            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.dataset.id = task.id;
            taskItem.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <input type="checkbox" onclick="markTask(this)" ${task.completed ? 'checked' : ''}>
                    <span class="task-text" style="text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.text}</span>
                </div>
                <div>
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="deleteTask(this)">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    renderTasks();
});
