const storage = window.sessionStorage

window.addEventListener('load', async () => {
  const user = storage.getItem('username')
  if(!user) {
    storage.clear()
    location.href = 'login.html'
  }
  
  const response = await fetch(`https://sentiment-analyzer-team-nu.herokuapp.com/getUserLog/${storage.getItem('username')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    const responseJSON = await response.json()
    if (responseJSON.valid) {
      createTable(responseJSON.data)
      $(document).ready(function () {
        $('#data').DataTable()
      })
    }
    else {

    }
  }
})

document.getElementById('analyze_again').addEventListener('click', () => {
  location.href = 'input.html'
})

document.getElementById('signout_2').addEventListener('click', () => {
  storage.clear()
  location.href = 'login.html'
})

function JSON2CSV (objArray) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray

  let str = ''
  let line = ''

  if ($('#labels').is(':checked')) {
    const head = array[0]
    if ($('#quote').is(':checked')) {
      for (const index in array[0]) {
        const value = index + ''
        line += '"' + value.replace(/"/g, '""') + '",'
      }
    } else {
      for (const index in array[0]) {
        line += index + ','
      }
    }

    line = line.slice(0, -1)
    str += line + '\r\n'
  }

  for (let i = 0; i < array.length; i++) {
    line = ''
    let value = ''
    if ($('#quote').is(':checked')) {
      for (const index in array[i]) {
        value = array[i][index] + ''
        line += '"' + value.replace(/"/g, '""') + '",'
      }
    } else {
      for (const index in array[i]) {
        value = array[i][index].replace(/\n/g, ' ')
        value = value.replace(/,/g, '')
        line += value + ','
      }
    }

    line = line.slice(0, -1)
    str += line + '\r\n'
  }
  return str
}

document.getElementById('download').addEventListener('click', async () => {
  const response = await fetch(`https://sentiment-analyzer-team-nu.herokuapp.com/getUserLog/${storage.getItem('username')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    const responseJSON = await response.json()
    if (responseJSON.valid) {
      const headers = {
        date: 'Date',
        username: 'Username',
        text: 'Text',
        sentiment: 'Sentiment',
        language: 'language'
      }
      const json = responseJSON.data
      json.unshift(headers)
      const csv = JSON2CSV(json)
      console.log(csv)
      const downloadLink = document.createElement('a')
      const blob = new Blob(['\ufeff', csv])
      const url = URL.createObjectURL(blob)
      downloadLink.href = url
      downloadLink.download = 'data.csv'

      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }
})

function createTable (data) {
  const table = document.getElementById('table')
  for (let i = 0; i < data.length; i++) {
    const row = `<tr>
                        <td>${data[i].text}</td>
                        <td>${data[i].sentiment}</td>
                        <td>${data[i].language}</td>
                        <td>${data[i].date}</td>
                  </tr>`
    table.innerHTML += row
  }
}
