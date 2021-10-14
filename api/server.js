const express = require("express")
const Cats = require('./cats/cats-model.js')
const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ message: "Cats API" })
})

server.get("/cats", (req, res) => {
    Cats.getAll()
        .then(cats => {
            res.status(200).json(cats)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.get("/cats/:id", (req, res) => {
    Cats.getById(req.params.id)
        .then(cat => {
            res.status(200).json(cat)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.post("/cats", (req, res) => {
    Cats.add(req.body)
        .then(cat => {
            res.status(201).json(cat)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.put("/cats/:id", (req, res) => {
    Cats.update(req.params.id, req.body)
        .then(cat => {
            res.status(200).json(cat)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.delete("/cats/:id", (req, res) => {
    Cats.remove(req.params.id)
        .then(cats => {
            res.status(200).json(cats)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = server;