const storage = window.sessionStorage;
import JSON2CSV from json2csv

window.addEventListener('load', async () => {
    const response = await fetch(`https://sentiment-analyzer-team-nu.herokuapp.com/getUserLog/${storage.getItem("username")}`, {
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




document.getElementById('download').addEventListener('click', async () => {
    const response = await fetch(`https://sentiment-analyzer-team-nu.herokuapp.com/getUserLog/${storage.getItem("username")}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            const headers = {
                text: 'Text',
                sentiment: "Sentiment",
                language: "Language",
                date: "Date"
            }
            let json = responseJSON.data;
            json.unshift(headers);
            let csv = JSON2CSV(json);
            let downloadLink = document.createElement("a");
            let blob = new Blob(["\ufeff", csv]);
            let url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "data.csv";
            
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }
})


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