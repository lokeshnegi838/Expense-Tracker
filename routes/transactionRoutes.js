
const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");

// CREATE transaction
router.post("/", async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE transaction
router.put("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE transaction
router.delete("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(
            req.params.id
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
