const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    cardNumber: {
        type:String,
        required: true
    },
    cardType: {
        type: String,
        required: true,
        enum: ["REGULAR", "SPECIAL"]
    },
    customerName: String,
    status: {
        type: String,
        required: true,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },
    vision: String,
    customerID: {
        type: String,
        required: true,
        ref: "Customer"
    }
}, { timestamps: true })

module.exports = mongoose.model('Card', cardSchema)