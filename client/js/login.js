const storage = window.sessionStorage

document.getElementById('login').addEventListener('click', async () => {
  const response = await fetch('https://sentiment-analyzer-team-nu.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  })

  if (response.ok) {
    const responseJSON = await response.json()
    if (responseJSON.valid) {
      storage.setItem('username', responseJSON.username)
      location.href = 'input.html'
    } else {
      alert('Incorrect password or username.')
    }
  }
})

document.getElementById('signup').addEventListener('click', () => {
  location.href = 'signup.html'
})

document.getElementById('show-password').addEventListener('change', () => {
  const password = document.getElementById('password')
  if (password.type === 'password') {
    password.type = 'text'
  } else {
    password.type = 'password'
  }
})
