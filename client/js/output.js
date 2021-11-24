const storage = window.sessionStorage;

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


function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if ($("#quote").is(':checked')) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[i]) {
                value = array[i][index].replace(/\n/g, ' ');
                line += value + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}


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
                date: "Date",
                username: "Username",
                text: "Text",
                sentiment: "Sentiment",
                language: "language"
            }
            let json = responseJSON.data;
            json.unshift(headers);
            let csv = JSON2CSV(json);
            console.log(csv);
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