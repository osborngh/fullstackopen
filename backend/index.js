const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors())


let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser likes JS",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are HTTP",
        important: true
    }
];

const reqLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Body', res.body)
    next();
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(n => n.id === id);
    console.log(`Note here: `, note.content);

    if (note) {
        res.json(note);
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(n => n.id !== id);

    res.status(204).end()
})

const genId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0;
    return String(maxId + 1);
}

app.post('/api/notes', (req, res) => {
    const body = req.body;
    if (!body.content) {
        res.status(400).json({
            error: 'Content Missing'
        })
    }

    const note = {
        id: genId(),
        content: body.content,
        important: body.important || false
    }

    notes = notes.concat(note)
    res.json(note)
})

const unknownEndpoint = (req, res) => {
    res.status(404).json({
        error: 'Unknown Endpoint'
    })
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});