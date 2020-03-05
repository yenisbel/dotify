const AWS = require("aws-sdk");
const fs = require("fs");

if (process.env.NODE_ENV !== "production") {
  AWS.config.loadFromPath("./credentials.json");
}
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

//The uploadFile function
function singleFileUpload(source, targetName, res) {
  console.log('preparing to upload...');
  fs.readFile(source, function (err, filedata) {
    if (!err) {
      const putParams = {
        Bucket: 'dotify-aa-dev',
        Key: targetName,
        Body: filedata
      };
      s3.putObject(putParams, (err, data) => {
        if (err) {
          console.log('Could nor upload the file. Error :', err);
          return res.send({ success: false });
        }
        else {
          fs.unlink(source, (err) => {
            if (err) throw err;
            console.log("path/file.txt was deleted");
          });// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
          console.log('Successfully uploaded the file');

          // get the signed url for the uploaded file
          const url = getUrl(targetName);
          return res.send({ url });
        }
      });
    }
    else {
      console.log({ 'err': err });
    }
  });
}

const getUrl = (targetName) => {
  const params = { Bucket: "dotify-aa-dev", Key: targetName };
  const url = s3.getSignedUrl("getObject", params);
  return url;
}

// const singleFileUpload = async file => {
//   const { filename, mimetype, createReadStream } = await file;
//   const fileStream = createReadStream();
//   const path = require("path");
//   // name of the file in your S3 bucket will be the date in ms plus the extension name
//   const Key = new Date().getTime().toString() + path.extname(filename);
//   const uploadParams = {
//     // name of your bucket here
//     Bucket: "aws-graphql-dev-testing",
//     Key,
//     Body: fileStream
//   };
//   const result = await s3.upload(uploadParams).promise();

//   // save the name of the file in your bucket as the key in your database to retrieve for later
//   return result.Key;
// };

module.exports = { s3, singleFileUpload }