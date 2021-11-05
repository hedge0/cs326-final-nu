let myArray = {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'};

createTable(myArray)






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
            language: document.getElementById('update_language_value')
        })
    });


});

document.getElementById('delete').addEventListener('click', () => {
    if (true) {
        location.href = "input.html";
    }
    //delete request goes here
});







document.getElementById('analyze').addEventListener('click', () => {
    location.href = "input.html";
});

document.getElementById('getlogs').addEventListener('click', () => {
    location.href = "output.html";
});

document.getElementById('signout').addEventListener('click', () => {
    location.href = "login.html";
});

function createTable(data){
    let table = document.getElementById('table');
    let row = `<tr>
                    <td>${data.Sentiment}</td>
                    <td>${data.Languages}</td>
              </tr>`;
    table.innerHTML += row;
} 