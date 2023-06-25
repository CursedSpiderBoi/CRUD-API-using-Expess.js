const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data
let items = [
    { id: 1, name: 'Item 1', working: 0 },
    { id: 2, name: 'Item 2', working: 1 },
    { id: 3, name: 'Item 3', working: 0 }
];

//demonstrating GET functionalities
app.get('/api/items', (req, res) => {
    res.status(200).json(items);
});

// GET using a specific id
app.get('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find((item) => item.id === itemId);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
});

// demonstrating POST functionalities
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };

    items.push(newItem);

    res.status(201).json(newItem);
});

// demonstrating PUT functionalities
app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;

    items = items.map((item) => {
        if (item.id === itemId) {
            return {...item, ...updatedItem };
        }
        return item;
    });

    res.status(200).json(updatedItem);
});

// demonstrating Delete functionalities
app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = items.findIndex((item) => item.id === itemId);

    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const deletedItem = items.splice(index, 1)[0];

    res.status(200).json(deletedItem);
});


const port = 3000; //port for accessing
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});