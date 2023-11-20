
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const username = process.env.U;
const password = process.env.P;


mongoose.connect(`mongodb+srv://${username}:${password}@testcluserno1.z3xc36s.mongodb.net/Users-DB?retryWrites=true&w=majority`)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = db;
