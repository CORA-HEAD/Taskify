// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Task list array
const tasks = [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'flex flex-col sm:flex-row items-center justify-between p-2 border rounded-lg bg-gray-50 gap-2';

        // Task text (editable)
        const taskText = document.createElement('input');
        taskText.type = 'text';
        taskText.value = task.name;
        taskText.className = 'flex-grow border-none bg-transparent';
        taskText.readOnly = true;
        if (task.completed) taskText.classList.add('line-through', 'text-gray-500');
        taskItem.appendChild(taskText);

        // Buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'flex gap-2 task-buttons';

        // Save button for editing
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.className = 'text-sm text-green-500 hover:underline hidden';
        saveBtn.onclick = () => {
            task.name = taskText.value;
            taskText.readOnly = true;
            saveBtn.classList.add('hidden');
            editBtn.classList.remove('hidden');
        };
        buttonsContainer.appendChild(saveBtn);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'text-sm text-blue-500 hover:underline';
        editBtn.onclick = () => {
            taskText.readOnly = false;
            taskText.focus();
            saveBtn.classList.remove('hidden');
            editBtn.classList.add('hidden');
        };
        buttonsContainer.appendChild(editBtn);

        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.className = 'text-sm text-blue-500 hover:underline';
        completeBtn.onclick = () => {
            task.completed = !task.completed;
            renderTasks();
        };
        buttonsContainer.appendChild(completeBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'text-sm text-red-500 hover:underline';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };
        buttonsContainer.appendChild(deleteBtn);

        taskItem.appendChild(buttonsContainer);
        taskList.appendChild(taskItem);
    });
}

// Add a task
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
