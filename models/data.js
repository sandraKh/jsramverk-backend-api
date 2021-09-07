const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true});


const Documents = mongoose.model('documents', docSchema);

module.exports = Documents;