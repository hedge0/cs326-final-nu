const storage = window.sessionStorage;
const port = 5500;


window.addEventListener('load', async () => {
    let sentiment = storage.getItem("sentiment");
    let languages = storage.getItem("language");
    createTable({ 'sentiment': sentiment, 'languages': languages });
});


document.getElementById('update_sentiment').addEventListener('click', async () => {
    const updateVal = document.getElementById('update_sentiment_value').value;

    if (updateVal !== "Update Sentiment") {
        const response = await fetch(`http://localhost:${port}/updateSentiment/${storage.getItem("username")}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: storage.getItem("text"),
                sentiment: updateVal
            })
        });

        if (response.ok) {
            const responseJSON = await response.json();
            if (responseJSON.valid) {
                let val = document.getElementById('sentiment_value');
                val.innerText = updateVal;
            }
        }
    }
});


document.getElementById('update_languages').addEventListener('click', async () => {
    const updateVal = document.getElementById('update_languages_value').value;

    if (updateVal !== "Update Language") {
        const response = await fetch(`http://localhost:${port}/updateLanguage/${storage.getItem("username")}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: storage.getItem("text"),
                language: updateVal
            })
        });
        
        if (response.ok) {
            const responseJSON = await response.json();
            if (responseJSON.valid) {
                let val = document.getElementById('languages_value');
                val.innerText = updateVal;
            }
        }
    }
});


document.getElementById('delete').addEventListener('click', async () => {
    const response = await fetch(`http://localhost:${port}/delete/${storage.getItem("username")}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: storage.getItem("text")
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            storage.removeItem("text");
            storage.removeItem("sentiment");
            storage.removeItem("language");
            location.href = "input.html";
        }
    }
});


document.getElementById('analyze').addEventListener('click', () => {
    storage.removeItem("text");
    storage.removeItem("sentiment");
    storage.removeItem("language");
    location.href = "input.html";
});


document.getElementById('getlogs').addEventListener('click', () => {
    storage.removeItem("text");
    storage.removeItem("sentiment");
    storage.removeItem("language");
    location.href = "output.html";
});


document.getElementById('signout').addEventListener('click', () => {
    storage.clear();
    location.href = "login.html";
});


function createTable(data) {
    let table = document.getElementById('table');
    let row = `<tr>
                    <td id = "sentiment_value">${data.sentiment}</td>
                    <td id = "languages_value">${data.languages}</td>
              </tr>`;
    table.innerHTML += row;
} 