const express = require('express');
const router = express.Router();

//Configure AWS interface object.
const AWS = require("aws-sdk");
const awsConfig = {
    region: "us-east-2",
    endpoint: "http://localhost:8000",
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Ideas";

//Access all stored ideas.
router.get('/users', (req, res) => {
    const params = {
        TableName: table
    };
    //Scan/Return all items in the table
    dynamodb.scan(params, (err, data) => {
        if (err) {
            res.status(500).json(err); 
        }else {
            res.json(data.Items)
        }
    });
});

module.exports = router;

