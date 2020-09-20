const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Coupons API', () => {

    describe("GET /api/displayCoupons", () => {
        it("It should GET all the coupons for merchant host", (done) => {
            chai.request(server)
                .get("/api/displayCoupons?apikey=ZX6ZFHM-CJKMBYC-PZ0H54E-NBMS3XW&lat=39.889484&long=-77.035279")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    //response.body.length.should.be.eq(3);
                done();
                })
        }).timeout(10000);


        it("It should Not GET all the coupons for merchant host", (done) => {
            chai.request(server)
                .get("/api/displayCoupons?apikey=ZX6ZFHM-CJKMBYC-PZ0H54E-NBMS3XW&lat=13.067439&long=80.237617")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.eql([]);
                    //response.body.length.should.be.eq(3);
                done();
                })
        }).timeout(10000);


        it("It should return status code 400 for missing API key", (done) => {
            chai.request(server)
                .get("/api/displayCoupons?apikey=&lat=13.067439&long=80.237617")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('err');
                    response.body.should.have.property('err').eq('Apikey missing in the request');
                done();
                })
        }).timeout(10000);


        it("It should return status code 400 for missing location credentials", (done) => {
            chai.request(server)
                .get("/api/displayCoupons?apikey=ZX6ZFHM-CJKMBYC-PZ0H54E-NBMS3XW&lat=&long=80.237617")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('err');
                    response.body.should.have.property('err').eq('Location credentials missing in request');
                done();
                })
        }).timeout(10000);

        it("It should return status code 401 for invalid api key", (done) => {
            chai.request(server)
                .get("/api/displayCoupons?apikey=ZX6FHM-CJKMBYC-PZ0H54E-NBMS3XW&lat=13.067439&long=80.237617")
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    response.body.should.have.property('err');
                    response.body.should.have.property('err').eq('Invalid API key');
                done();
                })
        }).timeout(10000);
    })





    describe("GET /api/getProducts", () => {
        it("It should GET all the products for merchant api", (done) => {
            chai.request(server)
                .get("/api/getProducts")
                .set('x-api-key', 'VHHR154-SXBMDMS-QS31NCP-C6124MZ')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    //response.body.length.should.be.eq(3);
                done();
                })
        }).timeout(10000);

        it("It should not GET all the products for merchant api", (done) => {
            chai.request(server)
                .get("/api/getProducts")
                .set('x-api-key', '')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        }).timeout(10000);

        it("It should Not GET all the coupons for merchant host", (done) => {
            chai.request(server)
                .get("/api/displayCoupons?apikey=ZX6ZFHM-CJKMBYC-PZ0H54E-NBMS3XW&lat=13.067439&long=80.237617")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.eql([]);
                    //response.body.length.should.be.eq(3);
                done();
                })
        }).timeout(10000);


        it("It should return status code 400 for missing API key", (done) => {
            chai.request(server)
                .get("/api/displayCoupons?apikey=&lat=13.067439&long=80.237617")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('err');
                    response.body.should.have.property('err').eq('Apikey missing in the request');
                done();
                })
        }).timeout(10000);



        it("It should return status code 401 for invalid api key", (done) => {
            chai.request(server)
                .get("/api/displayCoupons?apikey=ZX6FHM-CJKMBYC-PZ0H54E-NBMS3XW&lat=13.067439&long=80.237617")
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    response.body.should.have.property('err');
                    response.body.should.have.property('err').eq('Invalid API key');
                done();
                })
        }).timeout(10000);
    })

})