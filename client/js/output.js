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



function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

const headers = {
    text: 'Text',
    sentiment: "Sentiment",
    language: "Language",
    date: "Date"
}

document.getElementById('download').addEventListener('click', () => {
    const response = await fetch(`https://sentiment-analyzer-team-nu.herokuapp.com/getUserLog/${storage.getItem("username")}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            var csv = JSON2CSV(json);
            var blob = new Blob(["\ufeff", csv]);
            var url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "data.csv";
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