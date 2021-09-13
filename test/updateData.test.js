// const   expect      = require('chai').expect,
//         request     = require('supertest'),
//         basicSetup  = require('./helper/basicSetup'),
//         app         = require('../app')


// describe('PATCH: /:id route to update data', () => {
//     basicSetup();

//     it('Updating existing data', (done) => {
//         let toSendData = { title:'test doc', content: 'test'} 
//         request(app).post('/')
//             .send(toSendData)
//             .then((res)=>{
//                 request(app).patch('/' + res.body._id)
//                 .send({ content: 'updated branch'})
//                 .then((res2) => {
//                     expect(res2.statusCode).to.equal(200)
//                     expect(res2.body).to.include({ modifiedCount: 1 })
//                     done()
//                 })
//                 .catch((err) => done(err))
//                 })
//             .catch((err) => done(err)) 
//     })

//     it('updating from non existent data', (done) => {
//         request(app).patch('/123')
//                 .then((res) => {
//                     expect(res.statusCode).to.equal(404);
//                     done()
//                 })
//                 .catch((err) => done(err))
//     })
// })