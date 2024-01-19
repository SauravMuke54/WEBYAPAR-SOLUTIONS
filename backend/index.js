const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const userRoutes= require('./routes/user')
const authRoutes= require('./routes/auth')
require("dotenv").config();
const path = require("path");
const multer=require("multer")
const {uploadPhoto}=require("./controller/user")
const uploadFolder = path.join(__dirname, "public/uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    console.log( req.body._id+file.originalname)
    cb(null, uploadFolder); // Specify the folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    
     req.file=file
    
    console.log( req.body._id+file.originalname)
    cb(null, req.body._id+file.originalname); // Use _id as the filename
  },
});
const upload = multer({ storage });


const DB = process.env.DATABASE;
const port = 4000;

mongoose.connect(DB).then(() => {
    console.log("DB connected");
  });
  app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('*',cors());

app.use('/api',userRoutes)

app.use('/api',authRoutes)

app.post('/api/photo/upload', upload.single("image"), uploadPhoto);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

