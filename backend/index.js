const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const bookingsRoutes = require("./routes/bookingRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const otpRoutes = require("./routes/otpRoutes.js");
const cookieparser = require('cookie-parser');



const app = express();
require('dotenv').config();



const PORT = process.env.PORT;
const mongo_url = "mongodb+srv://21131a0581:mahith123@cluster1.zjtlgoe.mongodb.net/?retryWrites=true&w=majority&appName=cluster1";

app.use(bodyParser.json());
app.use(cookieparser());
app.use(cors({
    origin: ['https://washing-machine-mmboys.netlify.app'],
    credentials: true
}));



app.use('/', bookingsRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/otp', otpRoutes);

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
