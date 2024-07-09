const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

app.use(bodyParser.json()); 
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res) => {
    // Generate a unique ID for the new comment
    const commentId = randomBytes(4).toString('hex');
    
    // Extract the content of the comment from the request body
    const { content } = req.body;

    // Retrieve the comments array for the given post ID, or initialize an empty array if none exists
    const comments = commentsByPostId[req.params.id] || [];

    // Add the new comment to the comments array
    comments.push({ id: commentId, content });

    // Save the updated comments array back to the commentsByPostId object
    commentsByPostId[req.params.id] = comments;

    // Respond with a status of 201 (Created) and the updated comments array
    res.status(201).send(comments);
});

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Server is up on port:${PORT}`);
})