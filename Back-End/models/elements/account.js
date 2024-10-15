// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tariff: {
        type: String,
        required: true
    },
    loyalty: {
        type: String,
        required: true
    },
    addons: {
        type: String,
        required: false
    },
    invoice: {
        type: String,
        required: false
    },
    payment: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false,
    }
}
, {timestamps: true})
;

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;