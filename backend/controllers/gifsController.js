const express = require('express')
const router = express.Router()
const Gifs = require('../models/Gifs')

// Index: GET all the bookmarks
router.get('/', async (req, res, next) => {
    try {
        const gifs = await Gifs.find({}) // 1. Get all of the gifs from the DB
	    res.json(gifs)// 2. Send them back to the client as JSON
    } catch(err) {
        next(err) // 3. If there's an error pass it on!
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const gif = await Gifs.findById(req.params.id) 
	if(gif) {
        res.json(gif)
    } else {
        res.sendStatus(404)
    }
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newGif = await Gifs.create(req.body)
        res.status(201).json(newGif)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try { 
        const gifToUpdate = await Gifs.findOneAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        if (gifToUpdate) {
            res.json(gifToUpdate)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        next(err)
    }
	
})

router.delete('/:id', async (req, res, next) => {
    try {
        const gifToDelete = await Gifs.findOneAndDelete(req.params.id)
        console.log(gifToDelete)
        if (gifToDelete) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    } catch(err){
        next(err)
    }
})

module.exports = router
