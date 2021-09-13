const mongoose  = require('mongoose');
// const { optionalRequire } = require("optional-require");
// const config = optionalRequire("./config.json", { require }) || {};
// const config = require("../config.json")

let config;



function dbconnect() {
  if ( process.env.NODE_ENV == 'dev'  ) {
    mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
    return mongoose.connection

  } else  if ( process.env.NODE_ENV == 'ci'  ) {

    try {
      config = require('../config.json');
    } catch (error) {
      console.error(error);
    }
    
    const dbURI = `mongodb+srv://${config.username}:${config.password}@cluster0.xfvcp.mongodb.net/database?retryWrites=true&w=majority`;
    mongoose.connect(dbURI,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
    return mongoose.connection
  }

  }
  
  function dbclose() {
    return mongoose.disconnect();
  }

module.exports = {dbconnect, dbclose};