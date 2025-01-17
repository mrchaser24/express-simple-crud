const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json())

let items = []

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Express CRUD API!')
})

app.post('/items', (req, res)=> {
    const newItem = req.body
    if (!newItem.hasOwnProperty('name')) return res.status(400).json({message: "No property 'name'"})
    if (newItem.name == null || newItem.name == '') return res.status(400).json({message: "Name should not be empty or null"})
    items.push(newItem)
    res.status(201).json({
        data:newItem, 
        message: "Post Item"
    })
})

app.get('/items', (req, res)=>{
    res.status(200).json({
        data:items,
        message: "Get Item"
    })
})

app.put('/items/:id', (req, res)=>{
    const { id } = req.params
    const updatedItem = req.body
    if (id >= 0 && id < items.length) {
        items[id] = updatedItem
        res.status(200).json({
            data:updatedItem,
            message: "Update Item"
        })
    } else {
        res.status(404).json({ message: 'Item not found' })
    }
})

app.delete('/items/:id', (req, res)=>{
    const { id } = req.params
    if (id >= 0 && id < items.length) {
        const deletedItem = items.splice(id, 1)
        res.status(200).json({
            data:deletedItem,
            message: "Delete Item"
        })
    } else {
        res.status(404).json({ message: 'Item not found' })
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})