
let tasks = [];
let taskId = 0;
let editingId = null;

// ADD TASK
function add() {

    let input = document.getElementById("input");
    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: ++taskId,
        name: task,
        completed: false
    });

    input.value = "";

    searchTasks();
}

// DISPLAY TASKS
function displayTasks(filteredTasks = tasks) {

    let list = document.getElementById("dynamiclist");
    let noResult = document.getElementById("noResult");

    list.innerHTML = "";

    if (filteredTasks.length === 0) {
        noResult.classList.remove("hidden");
        return;
    }

    noResult.classList.add("hidden");

    filteredTasks.forEach((task, index) => {

        list.innerHTML += `
            <tr class="bg-blue-600 border-b border-blue-400">

                <td class="text-center p-3">
                    ${index + 1}
                </td>

                <td class="p-3">
                    <div class="flex items-center gap-3">

                        <input
                            type="checkbox"
                            ${task.completed ? "checked" : ""}
                            onchange="completeTask(${task.id})"
                            class="w-5 h-5 cursor-pointer accent-green-500"
                        >

                        <span class="${task.completed ? 'line-through text-gray-300' : ''}">
                            ${escapeHTML(task.name)}
                        </span>

                    </div>
                </td>

                <td class="text-center p-3">

                    <div class="flex justify-center gap-2 flex-wrap">

                        <button
                            onclick="editTask(${task.id})"
                            class="bg-yellow-500 px-3 py-2 rounded-lg hover:bg-yellow-600">
                            Edit
                        </button>

                        <button
                            onclick="deleteTask(${task.id})"
                            class="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-800">
                            Delete
                        </button>

                    </div>

                </td>

            </tr>
        `;
    });
}

// EDIT TASK
function editTask(id) {

    let task = tasks.find(task => task.id === id);

    if (!task) return;

    document.getElementById("input").value = task.name;

    editingId = id;

    document.getElementById("addBtn").classList.add("hidden");

    document.getElementById("updateBtn").classList.remove("hidden");

    document.getElementById("input").focus();
}

// UPDATE TASK
function updateTask() {

    let input = document.getElementById("input");
    let newTask = input.value.trim();

    if (newTask === "") {
        alert("Please enter a task!");
        return;
    }

    let task = tasks.find(task => task.id === editingId);

    if (task) {
        task.name = newTask;
    }

    cancelEdit();

    searchTasks();
}

// CANCEL EDIT / RESET
function cancelEdit() {

    editingId = null;

    document.getElementById("input").value = "";

    document.getElementById("addBtn").classList.remove("hidden");

    document.getElementById("updateBtn").classList.add("hidden");
}

// COMPLETE TASK
function completeTask(id) {

    let task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = !task.completed;
    }

    searchTasks();
}

// SEARCH TASK
function searchTasks() {

    let search = document
        .getElementById("search")
        .value.toLowerCase().trim();

    let filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(search)
    );

    displayTasks(filteredTasks);
}

// DELETE TASK
function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    if (editingId === id) {
        cancelEdit();
    }

    searchTasks();
}

// SAFE HTML TEXT
function escapeHTML(text) {

    return text.replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    })[char]);

}
