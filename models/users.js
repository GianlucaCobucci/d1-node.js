const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true, 
        max: 255
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        password: {
            type: String,
            requred: true,
        }
    },
    role: {
        type: String,
        required: false,
        default: 'user' //farà parte del gruppo utenti normali
    },
    age: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true, 
    strict: true
})



module.exports = mongoose.model('userModel', UserSchema, 'users')