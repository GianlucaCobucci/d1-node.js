const express = require('express')
const router = express.Router()
const PostsModel = require('../models/posts')

router.get('/posts', async(req, res) =>{
    try {
        const post = await  PostsModel.find();
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server"
        })
    }
})

router.post('/posts/new', async (req, res)=>{
    const newPost = new PostsModel({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        rate: req.body.rate
    })

    try {
        const post = await newPost.save()
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server"
        })
    }
})

module.exports = router