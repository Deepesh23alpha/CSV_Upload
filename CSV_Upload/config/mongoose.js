// ---Importing Packages---
const mongoose = require('mongoose');

// ---Making Connection---
const DB = 'mongodb+srv://deepeshb24:YWkhSutcbLETxlC7@cluster0.kcqg45a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB).then(()=>{
    console.log('Connection Successful!');
}).catch((err) => console.log("No Connection! " + err));

// Setting it to db.
const db = mongoose.connection;

// ---Checking Connection---
// If error occurs.
db.on("error", console.error.bind(console, "Error connecting to DB!"));
// When db connects successsfully
db.once("open", function(){
    console.log("Successfully Connected to DB!");
});

// ---Exporting DB---
module.exports = db;