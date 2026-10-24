function add(){
    var list = document.getElementById("dynamiclist");
    var task = document.getElementById("input").value;

    if(task === ""){
        alert('Please Enter Task!');
       }else {
    list.innerHTML += `
        <tr class="bg-slate-500">
            <td class="text-start p-2">${task}</td>
            <td class="text-start p-2">
                <button onclick="this.closest('tr').remove()"
                    class="bg-red-500 text-white px-3 py-1 rounded">
                    X
                </button>
            </td>
        </tr>
    `;

    document.getElementById('input').value = '';
}
}