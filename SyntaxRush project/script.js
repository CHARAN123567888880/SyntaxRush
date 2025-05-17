// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/typing-practice', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a simple User model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    progress: Array,
});

const User = mongoose.model('User', UserSchema);

// API endpoint to register a new user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User registered');
});

// API endpoint to fetch text snippets
app.get('/api/snippets', (req, res) => {
    const snippets = [
        "The quick brown fox jumps over the lazy dog.",
        "To be or not to be, that is the question.",
        "A journey of a thousand miles begins with a single step."
    ];
    res.json(snippets);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
