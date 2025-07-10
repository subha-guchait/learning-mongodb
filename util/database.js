require("dotenv").config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

exports.mongoConnect = (callback) => {
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGODB_APPNAME}`;

  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected to mongodb successfully!");
      _db = client.db(process.env.MONGODB_DBNAME); // use DB name from env
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

exports.getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};
