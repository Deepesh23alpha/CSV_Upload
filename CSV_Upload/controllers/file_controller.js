// ---Importing Packages---
const fs = require('fs');
const csvParser = require('csv-parser');
const CSV = require('../models/csv');
const path = require('path');


// ---Exporting function to upload a file---
module.exports.upload = async function(req, res) {
    try {
        // If file is not present.
        if(!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        // If file is not csv.
        if(req.file.mimetype != "text/csv") {
            return res.status(400).send('Select CSV files only.');
        }
       
        let file = await CSV.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            file: req.file.filename
        });
        return res.redirect('/');
    } catch (error) {
        console.log('Error in fileController/upload', error);
        res.status(500).send('Internal server error');
    }
}

// ---Exporting function to open file viewer page---
module.exports.view = async function(req, res) {
    try {
      
        let csvFile = await CSV.findOne({file: req.params.id});
        const results = [];
        const header =[];

        //Setting up the path for file upload.

        fs.createReadStream(csvFile.filePath) 
        .pipe(csvParser())
        .on('headers', (headers) => {
            headers.map((head) => {
                header.push(head);
            });
           
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            
            res.render("file_viewer", {
                title: "File Viewer",
                fileName: csvFile.fileName,
                head: header,
                data: results,
                length: results.length
            });
        });


    } catch (error) {
        console.log('Error in fileController/view', error);
        res.status(500).send('Internal server error');
    }
}


// ---Exporting functionn to delete the file
module.exports.delete = async function(req, res) {
    try {
        
        let isFile = await CSV.findOne({file: req.params.id});

        if(isFile){
            await CSV.deleteOne({file: req.params.id});            
            return res.redirect("/");
        }else{
            console.log("File not found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log('Error in fileController/delete', error);
        return;
    }
}