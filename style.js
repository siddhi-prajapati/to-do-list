let tasks = [];
let xp = 0;
const xpPerTask = 10;

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task === "") return;

  tasks.push({ text: task, completed: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    if (task.completed) li.classList.add("completed");

    li.textContent = task.text;
    li.onclick = () => toggleTask(index);

    taskList.appendChild(li);
  });

  updateXPBar();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    xp += xpPerTask;
    document.getElementById("complete-sound").play();
  } else {
    xp -= xpPerTask;
  }
  renderTasks();
}

function updateXPBar() {
  const xpBar = document.getElementById("xpBar");
  const totalXP = tasks.length * xpPerTask;
  const percentage = totalXP === 0 ? 0 : (xp / totalXP) * 100;

  xpBar.style.width = percentage + "%";
  xpBar.textContent = xp + " XP";
}
