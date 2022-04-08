const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const KEY_ID = process.env.KEY_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const Region = process.env.Region;
const Valid = process.env.Valid;
const InValid = process.env.InValid;
const directoryPath = path.join(__dirname, "Uploads");
const s3 = new AWS.S3({
  accessKeyId: KEY_ID,
  secretAccessKey: SECRET_KEY,
  region: Region,
});

module.exports = {
  uploadValidFile: (filename) => {
    const filePath = `${directoryPath}/${filename}`;
    const fileContent = fs.readFileSync(filePath);
    const params = {
      Bucket: Valid,
      Key: filePath,
      Body: fileContent,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${filename} uploaded to S3 valid-lab bucket.`);
        fs.unlinkSync(filePath);
      }
    });
  },
  uploadInValidFile: (filename) => {
    const filePath = `${directoryPath}/${filename}`;
    const fileContent = fs.readFileSync(filePath);
    const params = {
      Bucket: InValid,
      Key: filePath,
      Body: fileContent,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${filename} uploaded to S3 invalid-lab bucket.`);
        fs.unlinkSync(filePath);
      }
    });
  },
};
