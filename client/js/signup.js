document.getElementById('signup').addEventListener('click', () => {
    location.href = "input.html";
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