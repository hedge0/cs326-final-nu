
window.addEventListener('load', async () => {

    const response = await fetch("http://localhost:3000/getUserLogs", {//double check this later 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: window.username,
            text: window.text
        })
    });

    if (response.ok) {
        if (response.valid) {
            let data = response.json();
            createTable(data);
            $(document).ready(function () {
                $('#data').DataTable();
            });
        }
        else {
            console.log('user history not found');
        }
    }

});

document.getElementById('analyze').addEventListener('click', () => {
    location.href = "input.html";
});

document.getElementById('signout').addEventListener('click', () => {
    location.href = "login.html";
});


function createTable(data) {
    let table = document.getElementById('table');
    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
                        <td>${data[i].text}</td>
                        <td>${data[i].sentiment}</td>
                        <td>${data[i].languages}</td>
                        <td>${data[i].date}</td>
                  </tr>`;
        table.innerHTML += row;
    }
} 