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
    },
    client_type: {
        type: String,
        required: false,
    },
    sales_type: {
        type: String,
        required: false,
    },
    full_name: {
        type: String,
        required: false,
    },
    preferred_name: {
        type: String,
        required: false,
    },
    birth_date: {
        type: Date,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    country_code: {
        type: String,
        required: false,
    },
    mobile_number: {
        type: String,
        required: false,
    },
    self_employed: {
        type: String,
        required: false,
    },
    nationality: {
        type: String,
        required: false,
    },
    po_box: {
        type: Boolean,
        required: false,
    },
    manual_entry: {
        type: Boolean,
        required: false,
    },
    postal_code: {
        type: String,
        required: false,
    },
    street: {
        type: String,
        required: false,
    },
    number: {
        type: String,
        required: false,
    },
    floor: {
        type: String,
        required: false,
    },
    door_number: {
        type: String,
        required: false,
    },
    mobile_number_type: {
        type: String,
        required: false,
    },
    kept_mobile_number: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: false,
    },
    use_main_address: {
        type: Boolean,
        required: false,
    },
    bank_account_owner: {
    type: String,
    required: false,
    },
    iban: {
    type: String,
    required: false,
    },
    sim_card_delivery: {
    type: String,
    required: false,
    },
    nif: {
        type: String,
        required: false,
        },
    personal_docment_type: {
        type: String,
        required: false,
        },
    personal_docment_number: {
        type: String,
        required: false,
        },
    personal_document_due_date: {
        type: Date,
        required: false,
        },
    contract_delivery_method: {
        type: String,
        required: false,
        },
    country: {
        type: String,
        required: false,
        },
    fiscal_country: {
        type: String,
        required: false,
        },
    
}
, {timestamps: true})
;

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;