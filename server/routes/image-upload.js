const express = require('express');
const router = express.Router();

//Include params function to take in file and return params object.
const paramsConfig = require('../config/params-config');

//Multer handles multipart/form-data
//Adds a file property on req object containing image file.
const multer = require('multer');
const AWS = require('aws-sdk');

//Create temp storage container to hold image file until ready to be uploaded to S3 bucket.
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});

//Declare upload object with storage destination and key(image)
const upload = multer({storage}).single('image');

//Initiate service object to communicate with s3.
const s3 = new AWS.S3({
    //Prevent default version changes.
    apiVersion: '2006-03-01'
});

//Upload image route.
//Upload function is used as middleware (Multer).
router.post('/image-upload', upload, (req, res) => {
    //Set up params config using incoming file.
    const params = paramsConfig(req.file);
    //Set up S3 service call using params object.
    s3.upload(params, (err, data) => {
        if(err) {
            console.log(err); 
            res.status(500).send(err);
        }
        //Send back image file metadata to client.
        res.json(data);
    });
});

module.exports = router;