require("dotenv").config();
const cron = require("node-cron");
const path = require("path");
const fs = require("fs");
const sendSlackMessage = require("./slack");
const Validate = require("./validations");
const { uploadInValidFile, uploadValidFile } = require("./uploadFile");
const directoryPath = path.join(__dirname, "Uploads");

const scanDirectory = () => {
  fs.readdir(directoryPath, (error, files) => {
    if (error) {
      return console.log("Unable to scan directory: " + error);
    }

    files.forEach((fileName) => {
      fs.readFile(`${directoryPath}/${fileName}`, "utf-8", (error, data) => {
        if (error) {
          console.log(error);
        } else {
          const content = data.toString();
          if (
            Validate.validFilename(fileName) &&
            Validate.validContent(content)
          ) {
            // Move the file to S3 valid
            uploadValidFile(fileName);
            console.log(`Moving the ${fileName} file to S3 valid.`);
          } else {
            // Move the file to S3 invalid
            uploadInValidFile(fileName);
            console.log(`Moving the  ${fileName} file to S3 invalid.`);
            sendSlackMessage(
              `${fileName} format error. The file was sent to S3 invalid.`
            );
          }
        }
      });
    });
  });
};

cron.schedule("* * * * *", scanDirectory);
