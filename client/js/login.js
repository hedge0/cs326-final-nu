document.getElementById('login').addEventListener('click', () => {
    if (true) {
        location.href = "input.html";
    }
});

document.getElementById('signup').addEventListener('click', () => {
    location.href = "signup.html";
});

document.getElementById("show-password").addEventListener('change', function() {
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