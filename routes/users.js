const express = require('express')
const router = express.Router()
const usersModel = require('../models/users')

router.get('/users', async (req, res) => {
    try {
        const users = await usersModel.find();
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({message: "Errore interno server"})
    }
})

router.post('/users/new', async (req, res)=> {
    const user = new usersModel ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.age,
        age: req.body.age
    })

    try {
        const newUser = await user.save()
        res.status(200).send({
            message: "Utente salvato con successo nel database", 
            payload: newUser
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno server"
        })
    }
})

router.patch('/users/:id', async(req, res) => {
    const {id} = req.params;
    const userExist = await usersModel.findById(id)
    
    if (!userExist) {
        return res.status(404).send({
            message: "Utente inesistente"
        })
    }

    try {
        const userId = id;
        const dataUpdated = req.body
        const options = {new: true}

        const result = await usersModel.findByIdAndUpdate(userId, dataUpdated, options)
        res.status(200).send({
            message: "Utente aggiornato",
            payload: result
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno server"
        })
    }
})

router.delete('/users/delete/:id', async(req, res) => {
    const {id} = req.params;
    

    try {
        const user = await usersModel.findByIdAndDelete(id);

             
        if (!user) {
            return res.status(404).send({
                message: "Attenzione nessun utente con questo id"
            })
        }  
        
        res.status(200).send({
            message: `Utente con id ${id} cancellato dal database`,
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Errore interno server"
        })
    }
})


module.exports = router;