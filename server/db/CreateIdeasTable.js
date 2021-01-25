const AWS = require('aws-sdk');

//Configure AWS for connection
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

//Create DynamoDB service interface object using DynamoDB class.
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

//Create schema for idea in a params object (we only need to define/declare the key attributes).
const params = {
    TableName : "Ideas",
    KeySchema: [
        //Partition key       
        { AttributeName: "username", KeyType: "HASH"}, 
        //Sort key (having this as sort key helps for retrieving data by most recent).
        { AttributeName: "createdAt", KeyType: "RANGE" } 
    ],
    AttributeDefinitions: [       
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

//Create table using the params object.
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});