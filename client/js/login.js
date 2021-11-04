document.getElementById('login').addEventListener('click', () => {
    location.href = "input.html";
});
async function checklogin() {
    let response = await fetch(window.location.href);
    if (response.ok) {
        let result = response.json;
        if (result.length != 2) {
            document.getElementById('errorname').innerHTML = "enter both username and password";
        }
        else {
            document.getElementById('errorname').innerHTML = "";
        }
    }
}
document.getElementById('signup').addEventListener('click', () => {
    location.href = "signup.html";
});

document.getElementById("show-password").addEventListener('change', function () {
    const password_fields = document.getElementsByName("password");
    if (this.checked) {
        for (const field of password_fields) {
            field.type = 'username';
        }
    } else {
        for (const field of password_fields) {
            field.type = 'password';
        }
    }
});
// let http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end();
// }).listen(8080);
