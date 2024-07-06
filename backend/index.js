const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const bookingsRoutes = require("./routes/bookingRoutes.js");

const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

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
