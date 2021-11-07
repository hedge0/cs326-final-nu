document.getElementById('login').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/login', {    //THIS MUST BE THE ENTIRE URL, NOT JUST THE ENDPOINT
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            text: window.text
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
    const password_fields = document.getElementsByName("password");
    if (this.checked) {
        for (const field of password_fields) {
            field.type = 'username';
        }
    }
    else {
        for (const field of password_fields) {
            field.type = 'password';
        }
    }
});