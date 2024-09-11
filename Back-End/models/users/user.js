// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    environment: {
        type: String,
        required: true
    }
}
, {timestamps: true})
;

const User = mongoose.model('User', userSchema);

module.exports = User;