const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());


app.post('/events', (req, res) => {
    const event = req.body

    axios.post('http://localhost:4000/events', event) // Posts Service
    axios.post('http://localhost:4001/events', event) // Comments Service
    axios.post('http://localhost:4002/events', event) // Client Service
})

const PORT = 4005;

app.listen(PORT, (req, res) => {
    console.log("Server is up onr port:" + PORT)
})