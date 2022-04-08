const fs = require("fs");
const AWS = require("aws-sdk");
const KEY_ID = process.env.KEY_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const Region = process.env.Region;
const Valid = process.env.Valid;
const InValid = process.env.InValid;
const s3 = new AWS.S3({
  accessKeyId: KEY_ID,
  secretAccessKey: SECRET_KEY,
  region: Region,
});
module.exports = {
  uploadValidFile: (filename) => {
    const fileContent = fs.readFileSync(filename);
    const params = {
      Bucket: Valid,
      Key: filename,
      Body: fileContent,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file upload Succesfuly");
      }
    });
  },
  uploadInValidFile: (filename) => {
    const fileContent = fs.readFileSync(filename);
    const params = {
      Bucket: InValid,
      Key: filename,
      Body: fileContent,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file upload Succesfuly");
      }
    });
  },
};
