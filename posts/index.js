const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Enables CORS for ExpressJS server, allowing it to accept cross-origin requests. By default, it allows requests from any origin.

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts', (req, res) => {
    // Generate a unique ID for the new post
    const id = randomBytes(4).toString('hex');
    
    // Extract the title of the post from the request body
    const { title } = req.body;

    // Create a new post object and save it in the posts object
    posts[id] = {
        id, title
    };

    // Respond with a status of 201 (Created) and the new post object
    res.status(201).send(posts[id]);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is up on port:${PORT}`);
})