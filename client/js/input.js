const storage = window.sessionStorage;
const port = process.env.PORT || 5500;


document.getElementById('analyze').addEventListener('click', async () => {
    const response = await fetch(`http://localhost:${port}/analyze/${storage.getItem("username")}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: document.getElementById("input").value
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            storage.setItem("text", responseJSON.text);
            storage.setItem("sentiment", responseJSON.sentiment);
            storage.setItem("language", responseJSON.language);
            location.href = "results.html";
        }
    }
});


document.getElementById('signout').addEventListener('click', () => {
    storage.clear();
    location.href = "login.html";
});