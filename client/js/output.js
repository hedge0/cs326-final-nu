//test array, not final
let myArray = [
    {'text':'RECORD HIGH', 'sentiment':'80', 'languages':'English', 'date':'10/14/1990'},
    {'text':'RECORD HIGH', 'sentiment':'80', 'languages':'English', 'date':'10/14/1990'},
    {'text':'RECORD HIGH', 'sentiment':'80', 'languages':'English', 'date':'10/14/1990'},
    {'text':'RECORD HIGH', 'sentiment':'80', 'languages':'English', 'date':'10/14/1990'}
]

window.addEventListener('load', async () => {
    createTable(myArray)
    $(document).ready(function() {
        $('#data').DataTable();
    } );
});

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
                        <td>${data[i].text}</td>
                        <td>${data[i].sentiment}</td>
                        <td>${data[i].languages}</td>
                        <td>${data[i].date}</td>
                  </tr>`;
        table.innerHTML += row;
    }
} 