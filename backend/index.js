const express = require('express')

const app = express()
app.set('port', process.env.PORT || 8000)

const cors = require('cors')
app.use(cors())

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//routes

//redirect 
app.get('/', (req, res) => {
    res.redirect('/gifs')
})

// controllers

const gifsController = require('./controllers/gifsController')
app.use('/gifs/', gifsController)


// start server

app.listen(app.get('port'), () => {
    console.log(`Connected to port ${app.get('port')}`)
})