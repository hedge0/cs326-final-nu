const storage = window.sessionStorage;


document.getElementById('signup').addEventListener('click', async () => {
    if (document.getElementById("password").value === document.getElementById("confirm").value) {
        const response = await fetch('http://localhost:5500/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        });

        if (response.ok) {
            const responseJSON = await response.json();
            if (responseJSON.valid) {
                storage.setItem("username", responseJSON.username);
                location.href = "input.html";
            }
        }
    }
    else {
        alert("Passwords don't match. Try again.")
    }
});


document.getElementById("show-password").addEventListener('change', () => {
    let password = document.getElementById("password");
    let confirm = document.getElementById("confirm");
    if (password.type === "password" && confirm.type === "password") {
        password.type = "text";
        confirm.type = "text";
    }
    else {
        password.type = "password";
        confirm.type = "password";
    }
});
