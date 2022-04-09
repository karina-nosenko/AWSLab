require("dotenv").config();
const cron = require("node-cron");
const path = require("path");
const fs = require("fs");
const sendSlackMessage = require("./slack");
const Validate = require("./validations");
const { uploadInValidFile, uploadValidFile } = require("./uploadFile");
const directoryPath = path.join(__dirname, "Uploads");

const scanDirectory = () => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    files.forEach((filename) => {
      fs.readFile(`${directoryPath}/${filename}`, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const content = data.toString();
          if (
            Validate.validFilename(filename) &&
            Validate.validContent(content)
          ) {
            // Move the file to S3 valid
            uploadValidFile(filename);
          } else {
            // Move the file to S3 invalid
            uploadInValidFile(filename);
            sendSlackMessage(
              `${filename} format error. The file should start from the word 'Lab' and have a '.csv' extension.`
            );
          }
        }
      });
    });
  });
};

cron.schedule("* * * * *", scanDirectory);
