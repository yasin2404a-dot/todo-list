function add() {
    var list = document.getElementById("dynamiclist");
    var task = document.getElementById("input").value.trim();

    if (task === "") {
        alert('Please Enter Task!');
        return;
    }

    var row = document.createElement('tr');
    row.className = 'bg-slate-500';

    row.innerHTML = `
        <td class="text-start p-2 number">${list.children.length + 1}</td>
        <td class="text-start p-2 task">${task}</td>
        <td class="text-start p-2">
            <button type="button" onclick="edittask(this)" class="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                Edit
            </button>
            <button type="button" onclick="this.closest('tr').remove(); updatnumber();" class="bg-red-500 text-white px-3 py-1 rounded">
                X
            </button>
        </td>
    `;

    list.appendChild(row);
    document.getElementById('input').value = '';
    document.getElementById('input').focus();
}

function edittask(btn) {
    var row = btn.closest('tr');
    var taskCell = row.querySelector('.task');
    var currentTask = taskCell.textContent;
    var newTask = prompt('Edit Your Task', currentTask);

    if (newTask !== null && newTask.trim() !== '') {
        taskCell.textContent = newTask.trim();
    }
}

function updatnumber() {
    var rows = document.querySelectorAll('#dynamiclist tr');
    rows.forEach(function (row, i) {
        var numberCell = row.querySelector('.number');
        if (numberCell) {
            numberCell.textContent = i + 1;
        }
    });
}