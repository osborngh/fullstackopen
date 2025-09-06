const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.static('dist'));
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


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(n => n.id === id);

    if (note) {
        console.log(`Note here: `, note.content);
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
        return res.status(400).json({
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

app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const note = notes.find(n => n.id === id);
    if (!note) return res.status(404).end();
    
    const updated = { 
        ...note, 
        content: body.content ?? note.content, 
        important: body.important !== undefined ? !!body.important : note.important 
    };
    notes = notes.map(n => (n.id === id ? updated : n));
    res.json(updated);
})

const unknownEndpoint = (req, res) => {
    res.status(404).json({
        error: 'Unknown Endpoint'
    })
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
});