const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const { request } = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// mongodb+srv://dbUser:P@ssword@budgettracker.moaba.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb://heroku_jwcnxtsp:f3gdot37rl25o9vdk54c55iede@ds259528.mlab.com:59528/heroku_jwcnxtsp
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget"
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(()=>console.log("MongoDb is connected"))
.catch((err)=>console.log(err));

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});