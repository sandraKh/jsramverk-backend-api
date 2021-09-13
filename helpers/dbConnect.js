const mongoose  = require('mongoose');
const config = require("../config.json")

function dbconnect() {
  if ( process.env.NODE_ENV == 'dev'  ) {
    mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
    return mongoose.connection

  } else  {
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