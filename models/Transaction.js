
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0.01
    },

    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },

    category: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    note: {
        type: String
    }

}, { timestamps: true });

const Transaction = mongoose.model(
    "Transaction",
    transactionSchema
);

module.exports = Transaction;
