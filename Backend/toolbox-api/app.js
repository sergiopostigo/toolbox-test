const express = require('express')
const app = express()
const cors = require('cors')


/**
 *  Permisos CORS
 */
 app.use(cors())
 app.options('*', cors())

/**
 *  Endpoint
 */
app.get('/iecho', (req, res) => {
  if (req.query.text) {
    const text = req.query.text.split('').reverse().join('')
    // Analizamos si es o no un palíndromo
    if (req.query.text === text) {
      return res.status(200).json({
        text: text,
        palindrome: true
      })
    } else {
      return res.status(200).json({
        text: text,
        palindrome: false
      })
    }
  } else {
    return res.status(400).json({
      error: 'no text'
    })
  }
})

app.listen(3000, () => {
  console.log('El servidor está corriendo en http://localhost:3000')
})

module.exports = app
