// Get data on load to create table
window.addEventListener('load', async () => {
    let sentiment = await window.sentiment;
    let languages = await window.languages;
    createTable({ 'sentiment': sentiment, 'languages': languages });
});


document.getElementById('update_sentiment').addEventListener('click', async () => {
    let table = document.getElementById('table');
    const response = await fetch('http://localhost:5500/updateSentiment', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: await window.username,
            sentiment: document.getElementById('update_sentiment_value'),
            text: window.text
        })
    });

    if (response.ok) {
        window.alert("Sentiment updated");
    }
});

document.getElementById('update_languages').addEventListener('click', async () => {
    let table = document.getElementById('table');
    const response = await fetch('http://localhost:5500/updateLanguage', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: await window.username,
            text: await window.text,
            language: document.getElementById('table')
        })
    });
    
    if (response.ok) {
        window.alert("Language updated");
    }
});

document.getElementById('delete').addEventListener('click', async () => {
    const response = await fetch('http://localhost:5500/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: await window.username,
            text: await window.text
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            location.href = "input.html";
        }
    }
});

document.getElementById('getlogs').addEventListener('click', () => {
    location.href = "output.html";
});

document.getElementById('signout').addEventListener('click', () => {
    location.href = "login.html";
});

function createTable(data) {
    let table = document.getElementById('table');
    let row = `<tr>
                    <td id = "tablesentiment" >${data.sentiment}</td>
                    <td id = "tablelanguages">${data.languages}</td>
              </tr>`;
    table.innerHTML += row;
} 