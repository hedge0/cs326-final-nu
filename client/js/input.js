const storage = window.sessionStorage

window.addEventListener('load', async () => {
  const user = storage.getItem('username')
  if(!user) {
    storage.clear()
    location.href = 'login.html'
  }
});

document.getElementById('analyze').addEventListener('click', async () => {
  const response = await fetch(`https://sentiment-analyzer-team-nu.herokuapp.com/analyze/${storage.getItem('username')}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: document.getElementById('input').value
    })
  })

  if (response.ok) {
    const responseJSON = await response.json()
    if (responseJSON.valid) {
      storage.setItem('text', responseJSON.text)
      storage.setItem('sentiment', responseJSON.sentiment)
      storage.setItem('language', responseJSON.language)
      location.href = 'results.html'
    } else {
      alert('This text has already been analyzed.')
    }
  }
})

document.getElementById('signout_1').addEventListener('click', () => {
  storage.clear()
  location.href = 'login.html'
})
