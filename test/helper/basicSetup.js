const mongooseConnect = require('../../helpers/dbConnect');
const mongoose = require('mongoose');
const { after, before } = require('mocha');

process.env.NODE_ENV = 'dev';

let basicSetup = () => {
    before ((done)=>{
        process.env.NODE_ENV = 'dev';
        mongooseConnect.dbconnect()
                .once('open', ()=>done())
                .on('error',(error) => done(error))
    })
    beforeEach((done)=>{
        mongoose.connection.db.listCollections({name: "test"})
            .next((error,collection)=>{
                if(collection){
                    mongoose.connection.db.dropCollection("test")
                    .then(() => done())
                    .catch((err) => done(err))
                }
                else{
                    done(error)
                }
            })
        
        
    })

    after ((done)=>{
        mongooseConnect.dbclose()
                .then(()=>done())
                .catch((err)=>done(err))
    })
}

module.exports = basicSetup;