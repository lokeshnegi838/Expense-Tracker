
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;


const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
