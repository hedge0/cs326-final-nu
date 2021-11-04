//test array, not final
let myArray = [
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'90', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'50', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'70', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'90', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'50', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'70', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'90', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'50', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'70', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'90', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'50', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'70', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'90', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'50', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'70', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'90', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'50', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'70', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'80', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'90', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'50', 'Languages':'English', 'Date':'10/14/1990'},
    {'Text':'RECORD HIGH', 'Sentiment':'70', 'Languages':'English', 'Date':'10/14/1990'}
]

createTable(myArray)
$(document).ready(function() {
    $('#data').DataTable();
} );

document.getElementById('analyze').addEventListener('click', () => {
    location.href = "input.html";
});

document.getElementById('signout').addEventListener('click', () => {
    location.href = "login.html";
});


function createTable(data){
    let table = document.getElementById('table');
    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
                        <td>${data[i].Text}</td>
                        <td>${data[i].Sentiment}</td>
                        <td>${data[i].Languages}</td>
                        <td>${data[i].Date}</td>
                  </tr>`;
        table.innerHTML += row;
    }
} 