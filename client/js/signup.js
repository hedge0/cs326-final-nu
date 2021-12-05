const storage = window.sessionStorage

document.getElementById('signup').addEventListener('click', async () => {
  if (document.getElementById('password_2').value === document.getElementById('confirm').value) {
    const response = await fetch('https://sentiment-analyzer-team-nu.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: document.getElementById('username_2').value,
        password: document.getElementById('password_2').value
      })
    })

    if (response.ok) {
      const responseJSON = await response.json()
      if (responseJSON.valid) {
        storage.setItem('username', responseJSON.username)
        location.href = 'input.html'
      } else {
        alert('Username already in use.')
      }
    }
  } else {
    alert("Passwords don't match. Try again.")
  }
})

document.getElementById('show-password').addEventListener('change', () => {
  const password = document.getElementById('password_2')
  const confirm = document.getElementById('confirm')
  if (password.type === 'password' && confirm.type === 'password') {
    password.type = 'text'
    confirm.type = 'text'
  } else {
    password.type = 'password'
    confirm.type = 'password'
  }
})
