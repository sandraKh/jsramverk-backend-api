// const   expect      = require('chai').expect,
//         request     = require('supertest'),
//         basicSetup  = require('./helper/basicSetup'),
//         app         = require('../app');


// describe('POST: / route to insert data', ()=>{
    
//     basicSetup();

//     it('Data is posted and is valid', (done)=>{
//         let toSendData = { title:'jemmy doe', content: 'computer science'} 
//         request(app).post('/')
//             .send(toSendData)
//             .then((res)=>{
//                 expect(res.statusCode).to.equal(200);
//                 expect(res.body).to.include(toSendData);
//                 done();
//             })
//             .catch((err) => done(err))
//     })

//     it('no content field given', (done)=>{
//         request(app).post('/')
//             .send({title:'john doe'})
//             .then((res)=>{
//                 expect(res.statusCode).to.equal(404)
//                 done()
//             })
//             .catch((err) => done(err))
//     })
// })