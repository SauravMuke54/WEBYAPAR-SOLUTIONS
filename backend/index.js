const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes= require('./routes/user')

require("dotenv").config();

const DB = process.env.DATABASE;
const port = 4000;

mongoose.connect(DB).then(() => {
    console.log("DB connected");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api',userRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });