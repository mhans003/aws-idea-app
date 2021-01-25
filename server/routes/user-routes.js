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

//Get all ideas for one user.
router.get('/users/:username', (req, res) => {
    console.log(`Querying for idea(s) from ${req.params.username}.`);

    //Create params object to query Ideas table for one user's data.
    const params = {
        TableName: table,
        KeyConditionExpression: "#un = :user",
        //Define aliases.
        ExpressionAttributeNames: {
            "#un": "username",
            "#ca": "createdAt",
            "#ia": "idea"
        },
        ExpressionAttributeValues: {
            ":user": req.params.username
        },
        //Determine which fields will be returned (ideas and createdAt).
        ProjectionExpression: "#ia, #ca",
        //Ensure descending order.
        ScanIndexForward: false
    };

    //Perform query.
    dynamodb.query(params, (err, data) => {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.status(500).json(err);
        } else {
            console.log("Query succeeded.");
            res.json(data.Items)
        }
    });
});

module.exports = router;

