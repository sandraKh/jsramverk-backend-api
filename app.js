const router = require('./routes/users.js')


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Documents = require('./models/data.js')
const { graphqlHTTP } = require('express-graphql');
const visual = false;
const pdf = require('html-pdf');
const auth = require('./middleware/auth.js');
process.env.NODE_ENV = 'ci' 



const mongooseConnect = require('./helpers/dbConnect');

mongooseConnect.dbconnect()
                .on('error', () => console.log("connection to db failed"))

const app = express();

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use(bodyParser.json());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

const {
    GraphQLSchema
  } = require("graphql");
  
  const RootQueryType = require("./graphql/root.js");
  
  const schema = new GraphQLSchema({
      query: RootQueryType
  });


const pdfTemplate = require('./documents');

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual, // Visual är satt till true under utveckling
}));

app.get('/', (req, res) => {

    Documents.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send(result);
    })
    .catch(() => {
        res.status(500).send('Data not found')

    });
    
});

app.get('/:id', (req, res) => {
    
    Documents.findById(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch(() => {
        res.status(404).send('data not found')
    });
});


app.post('/', (req, res) => {
    const doc = new Documents({
        title: req.body.title,
        content: req.body.content
    });

    doc.save()
    .then(result => {
        res.send(result);
    })
    .catch(() => {
        res.status(404).send('Could not save to database.')
    })
});

app.delete('/:id', (req, res) => {

        Documents.remove({_id : req.params.id})
        .then((result) => {
            res.send(result);
        })
        .catch(() => {
            res.status(404).send('Could not delete from database.')
        });
});

app.put('/:id', (req, res) => {
    
    Documents.updateOne({_id : req.params.id}, { $addToSet: {access: req.body.access } })
    .then((result) => {
        res.send(result);
    })
    .catch(() => {
        res.status(404).send('Could not update database. Make sure _ID is correct.')
    });
});

app.put('/setCreator/:id', (req, res) => {
    
    Documents.updateOne({_id : req.params.id}, { $set: {creator: req.body.creator } })
    .then((result) => {
        res.send(result);
    })
    .catch(() => {
        res.status(404).send('Could not update database. Make sure _ID is correct.')
    });
});

app.use('/user', router);


// const server = app.listen(port, () => {
//     console.log('api listening on port ' + port);
// });

module.exports = app;