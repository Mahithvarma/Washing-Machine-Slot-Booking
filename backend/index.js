const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const bookingsRoutes = require("./routes/bookingRoutes.js");

const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const mongo_url = "mongodb+srv://21131a0581:mahith123@cluster1.zjtlgoe.mongodb.net/wsb?retryWrites=true&w=majority&appName=cluster1";

app.use(bodyParser.json());
app.use(cors());


app.use('/', bookingsRoutes);

mongoose
    .connect(mongo_url)
    .then(() => {
        console.log("DB Connected succesfully");
    })
    .catch((err) => {
        console.log(err.message);
    });



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
