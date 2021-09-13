const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        app         = require('../app')

describe('GET: /:id route to get data', () => {
    
    basicSetup();

    it('Get all existing data', (done) => {
        request(app).get('/')
                .then((res)=>{
                    expect(res.statusCode).to.equal(200);
                    // expect(res.body).to.include(insertedData)
                    done()
                })
                .catch((err) => done(err))
    })

    it('Get data from specific id', (done) => {
        let toSendData = { title:'test doc', content: 'test'} 
        request(app).post('/')
            .send(toSendData)
            .then((res)=>{
                request(app).get('/' + res.body._id)
                .then((res2)=>{
                    expect(res2.statusCode).to.equal(200);
                    done()
                })
                .catch((err) => done(err))
            })
            .catch((err) => done(err)) 
    })


    it('non existent data', (done) => {
        request(app).get('/2')
                .then((res) => {
                    expect(res.statusCode).to.equal(404);
                    done()
                })
                .catch((err) => done(err))
    })
})