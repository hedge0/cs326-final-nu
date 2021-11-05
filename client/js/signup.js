document.getElementById('signup').addEventListener('click', () => {
    const response = await fetch('https://.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            confirmpassword: document.getElementById("confirmpassword").value
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            if (password === confirmpassword) {
                window.id = responseJSON.id;
                location.href = "login.html";
            }
            else {
                alert("these passwords don't match. try again.")
            }
        }
    }
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
