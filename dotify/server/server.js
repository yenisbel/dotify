const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("../config/keys");
const db = keys.MONGO_URI;
const expressGraphQL = require("express-graphql");
const Models = require("./models/index.js");
const schema = require("./schema/schema");
const cors = require("cors");

// used for aws s3 files
const multer = require("multer");
// const { graphqlUploadExpress } = require("graphql-upload");
const { singleFileUpload } = require("./services/s3")

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(cors());

app.use(
  "/graphql",
  // graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// // below is used to configure uploading to aws buckets

// configuring the DiscStorage engine.
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

//POST method route for uploading file
app.post('/upload', upload.single("file"), function (req, res) {
  //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
  //req.file is the demo_file
  singleFileUpload(req.file.path, req.file.filename, res);
  // return res.send({ key: singleFileUpload(req.file) });
});

module.exports = app;
