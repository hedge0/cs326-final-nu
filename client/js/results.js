// Get data on load to create table
window.addEventListener('load', async () => {
    let sentiment = await window.sentiment;
    let languages = await window.languages;
    createTable({ 'sentiment': sentiment, 'languages': languages });
});



document.getElementById('update_sentiment').addEventListener('click', () => {
    let table = document.getElementById('table');
    const response = await fetch('/updateSentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            sentiment: document.getElementById('update_sentiment_value')
        })
    });


});

document.getElementById('update_languages').addEventListener('click', () => {
    let table = document.getElementById('table');
    const response = await fetch('/updateLanguage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            language: document.getElementById('table')
        })
    });


});

document.getElementById('delete').addEventListener('click', () => {
    const response = await fetch('/', {//double check this later 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            language: document.getElementById('update_language_value')
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            location.href = "input.html";
        }
    }
});







document.getElementById('analyze').addEventListener('click', () => {
    location.href = "input.html";
    const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            sentiment: document.getElementById('update_sentiment_value'),
            language: document.getElementById('update_languages_value')
        })
    });
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
                    <td>${data.sentiment}</td>
                    <td>${data.languages}</td>
              </tr>`;
    table.innerHTML += row;
} 