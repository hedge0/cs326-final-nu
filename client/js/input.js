document.getElementById('analyze').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/analyze', {    //THIS MUST BE THE ENTIRE URL, NOT JUST THE ENDPOINT
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: await window.username,
            text: document.getElementById("input").value
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.valid) {
            window.text = responseJSON.text;
            window.sentiment = responseJSON.sentiment;
            window.language = responseJSON.language;
            location.href = "results.html";
        }
        else {
            console.log("An error has occured");s
        }
    }
});

document.getElementById('signout').addEventListener('click', () => {
    location.href = "login.html";
});