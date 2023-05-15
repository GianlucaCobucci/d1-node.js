const express = require('express') 
const mongoose = require('mongoose')
//specificare una porta d'ascolto 
const PORT = 5050;

/*  per avere accesso a express e i metodi che contiene si fa... */
const app = express() /* tutti i metodi di express sono dentro app */

//routers import
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')



//middleware
app.use(express.json())


//routes
app.use('/', usersRoute)
app.use('/', postsRoute)



/* app.get('/users', (req, res) => {//primo parametro path, ovvero indirizzo
    res.status(200).send({
        firstname: 'Gianluca',
        lastName: 'Cobucci',
        age: 30,
    })
}) 
//https://localhost:5050/users */


mongoose.connect('mongodb+srv://gianlucacobucci330:Y9H4sZY8ZgEzoBvu@cluster0.66aycqq.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al database')) //on sta per "cosa devo ascoltare?"
db.once('open', () => {
    console.log('Database connesso correttamente')
})

//mettiamo in scolto il server. ascolta tutti gli eventi sulla port
app.listen(PORT, () => console.log(`Server avviato su porta ${PORT}`))