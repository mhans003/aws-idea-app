//Return a configured params object (used for image upload route).
//Uuid will be used to generate unique alpha-numeric string.
const { v4: uuidv4 } = require('uuid');

const params = fileName => {
    //Using the file name passed, in also retrive the file type from end.
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
  
    //Image params objet will contain the bucket name, unique filename, and buffer(temp storage).
    const imageParams = {
        Bucket: 'user-images-254cf12b-a4b7-4f84-b06a-701c9876ac2b',
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer,
        //Access-Control List will allow read permissions to view this file.
        ACL: 'public-read'
    };
  
    return imageParams;
};

module.exports = params;