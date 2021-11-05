//STILL NEED TO ADD RIGHT ENDPOINT AND TEST THIS FUNCTION, ALSO "id" AND "valid" MIGHT CHANGE DEPENDING ON ANDREWS RESPONSE
document.getElementById('login').addEventListener('click', async () => {
    const response = await fetch('https://.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ 
            username : document.getElementById("username").value, 
            password : document.getElementById("password").value 
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            window.id = responseJSON.id;
            location.href = "input.html";
        }
    }
    else{
        window.alert("Username and/or password does not match")
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