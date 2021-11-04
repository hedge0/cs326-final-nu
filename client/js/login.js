document.getElementById('login').addEventListener('click', () => {
    const response = await fetch('https://.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username : document.getElementById("username").value, password : document.getElementById("password").value })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            window.id = responseJSON.id;
            location.href = "input.html";
        }
    }
});

document.getElementById('signup').addEventListener('click', () => {
    location.href = "signup.html";
});

document.getElementById("show-password").addEventListener('change', function () {
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
