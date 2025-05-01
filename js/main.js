document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('add-task');
  const taskInput = document.getElementById('add-task-input');
  const tasksList = document.getElementById('tasks-list');
  const clearCompletedBtn = document.getElementById('clear-completed');
  const clearAllBtn = document.getElementById('clear-all');
  const modal = document.getElementById('confirmation-modal');
  
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render tasks on page load
  renderTasks();

  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (taskInput.value.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: taskInput.value.trim(),
      completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  });

  function renderTasks() {
    tasksList.innerHTML = '';
    
    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <div>
          <button class="complete-btn" data-id="${task.id}">✓</button>
          <button class="delete-btn" data-id="${task.id}">✕</button>
        </div>
      `;
      tasksList.appendChild(taskItem);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.complete-btn').forEach(btn => {
      btn.addEventListener('click', toggleComplete);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', deleteTask);
    });
  }

  function toggleComplete(e) {
    const id = parseInt(e.target.dataset.id);
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(e) {
    const id = parseInt(e.target.dataset.id);
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Clear buttons functionality
  clearCompletedBtn.addEventListener('click', function() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
  });

  clearAllBtn.addEventListener('click', function() {
    tasks = [];
    saveTasks();
    renderTasks();
  });
});
