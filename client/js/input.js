document.getElementById('analyze').addEventListener('click', () => {
    const response = await fetch('/analyze', {    //THIS MUST BE THE ENTIRE URL, NOT JUST THE ENDPOINT
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: document.getElementById("input").value
        })
    });

    if (response.ok) {
        const responseJSON = await response.json();
        window.text = responseJSON.text;
        window.sentiment = responseJSON.sentiment;
        window.languages = responseJSON.languages;
        location.href = "results.html";
    }
});

document.getElementById('signout').addEventListener('click', () => {
    location.href = "login.html";
});