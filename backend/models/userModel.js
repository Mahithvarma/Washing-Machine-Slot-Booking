const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    mobile:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    token:{
        type: 'string'
    }
});

module.exports = mongoose.model("users", userSchema, "users");