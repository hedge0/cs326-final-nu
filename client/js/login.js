document.getElementById('login').addEventListener('click', async () => {
    const response = await fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8;*'
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            window.username = responseJSON.username;
            location.href = "input.html";
        }
        else {
            window.alert("Invalid Username or Password")
        }
    }
});

document.getElementById('signup').addEventListener('click', () => {
    location.href = "signup.html";
});

document.getElementById("show-password").addEventListener('change', () => {
    let password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    }
    else {
        password.type = "password";
    }
});