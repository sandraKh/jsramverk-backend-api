const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Documents = require("./models/data.js");
const config = require("./config.json");

const dbURI = `mongodb+srv://${config.username}:${config.password}@cluster0.xfvcp.mongodb.net/database?retryWrites=true&w=majority`;
mongoose.connect(dbURI,  { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log("connected to db"))
.catch((err) => console.log(err));

const port = process.env.PORT || 1337;

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

app.use(bodyParser.json());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}


app.get('/', (req, res) => {
    
    Documents.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/:id', (req, res) => {
    
    Documents.findById(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/', (req, res) => {
    const doc = new Documents({
        title: req.body.title,
        content: req.body.content
    });

    doc.save()
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(err);
    })
});

app.delete('/:id', (req, res) => {
    
    Documents.remove({_id : req.params.id})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.patch('/:id', (req, res) => {
    
    Documents.updateOne({_id : req.params.id}, { $set: {content: req.body.content} })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});



const server = app.listen(port, () => {
    console.log('auth api listening on port ' + port);
});

module.exports = server;