const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  title: String, 
  creator: String,
  access: {
    type: Array, default: []
  },
  comments: Object,
  data: Object,
})

module.exports = model("Document", Document)