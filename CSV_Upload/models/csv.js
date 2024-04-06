// ---Importing Mongoose---
const mongoose = require('mongoose');

// ---Creating Schema---
const fileSchema = new mongoose.Schema({
    fileName: {
      type: String
    },
    filePath : {
      type:String
    },
    file: {
      type: String
    }
  }, {
    timestamps: {
      options: { timeZone: 'Asia/Kolkata' }
    }
  });


// ---Creating Model---
const files = mongoose.model("files", fileSchema);

// ---Exporting Model---
module.exports = files;
