document.getElementById("show-password-2").addEventListener('change', function() {
    const password_fields = document.getElementsByName("password-2");
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