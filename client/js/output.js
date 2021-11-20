const storage = window.sessionStorage;
const port = process.env.PORT || 5500;


window.addEventListener('load', async () => {
    const response = await fetch(`http://localhost:${port}/getUserLog/${storage.getItem("username")}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            createTable(responseJSON.data);
            $(document).ready(function () {
                $('#data').DataTable();
            });
        }
    }
});


document.getElementById('analyze').addEventListener('click', () => {
    location.href = "input.html";
});


document.getElementById('signout').addEventListener('click', () => {
    storage.clear();
    location.href = "login.html";
});


function createTable(data) {
    let table = document.getElementById('table');
    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
                        <td>${data[i].text}</td>
                        <td>${data[i].sentiment}</td>
                        <td>${data[i].language}</td>
                        <td>${data[i].date}</td>
                  </tr>`;
        table.innerHTML += row;
    }
} 