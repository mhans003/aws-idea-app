const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

//Use DocumentClient class to enable use of JS objects as args and return native JS types.
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

//Read the users.js seed file and assign to allUsers.
console.log("Importing ideas into DynamoDB. Please wait.");
const allUsers = JSON.parse(fs.readFileSync('./server/seed/user.json', 'utf8'));

//For each user, create a params object with name of table and that user's attributes.
allUsers.forEach(user => {
    const params = {
      TableName: "Ideas",
      Item: {
        "username": user.username,
        "createdAt": user.createdAt,
        "idea": user.idea
      }
    };
    //Using the dynamodb interface object, place each data object inside DB.
    dynamodb.put(params, (err, data) => {
        if (err) {
          console.error("Unable to add idea", user.username, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("PutItem succeeded:", user.username);
        }
    });
});