// const   expect      = require('chai').expect,
//         request     = require('supertest'),
//         basicSetup  = require('./helper/basicSetup'),
//         app         = require('../app')


// describe('DELETE: /:id route to delete data', () => {
//     basicSetup();

//     it('Deleting existing data', (done) => {
//         let toSendData = { title:'test doc', content: 'test'} 
//         request(app).post('/')
//             .send(toSendData)
//             .then((res)=>{
//                 request(app).delete('/' + res.body._id)
//                 .then((res2)=>{
//                     expect(res2.statusCode).to.equal(200);
//                     expect(res2.body).to.not.include(toSendData);
//                     done()
//                 })
//                 .catch((err) => done(err))
//             })
//             .catch((err) => done(err)) 
//     })

//     it('deleting from non existent data', (done) => {
//         request(app).delete('/123')
//                 .then((res) => {
//                     expect(res.statusCode).to.equal(404);
//                     done()
//                 })
//                 .catch((err) => done(err))
//     })
// })