const express = require('express')
const app = express()
const port = 3001

app.get('/zdravo', (req, res) => {
  res.send('Zdravo!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})