var should = require('chai').should(),
machine = require('../index');

var softlayerUser = process.env.SL_USER;
var softlayerAPI = process.env.SL_API_KEY;

/*
var options = {
    "driver" : "softlayer",
    "softlayer-api-key" : softlayerAPI,
    "softlayer-user" : softlayerUser,
    "softlayer-domain" : "testdomain.com",
    "softlayer-region" : "ams01",
    "softlayer-hostname" : "mochatest"

}
*/

// test locally and for free using virtualbox
var options = {
    "driver" : "virtualbox"
}



var machineName = "mochatest";

describe('#ls',function() {
	it('lists out some machines', function(done) {
        machine.ls().then(
            function (output) {
                console.log(output);
                output.should.be.instanceof(Array);
                done();
            }
        ).fail(function(err){

            done(err);
        })

    });

    it('lists out some machines using a callback', function(done) {
        machine.ls(function (err,result) {

            if(err) {
                err.should.not.exist;
                done();
            }

            result.should.be.instanceof(Array);
            done();
        })

    });

});


describe('#create',function() {

	it('create a machine', function(done) {

        // no timeout, creating the machine could take a while
        this.timeout(0);

        machine.create(machineName,options).then(
            function (output) {
                console.log(output);
                output.should.have.property('Driver');
                done();
            }
        ).fail(function(err){

            done(err);
        })

    });
});



describe('#active',function() {


    it('gets the active  machine', function(done) {

        // no timeout, creating the machine could take a while
        this.timeout(0);

        machine.active().then(
            function (output) {
                console.log(output);
                output.should.be.a('string');
                done();
            }
        ).fail(function(err){
            err.should.have.string('No active host found');
            done();
        })

    });


});




describe('#inspect',function() {


    it('inspect a machine', function(done) {

        // no timeout, creating the machine could take a while
        this.timeout(0);

        machine.inspect(machineName).then(
            function (output) {

                output.should.have.property('Driver');
                done();
            }
        ).fail(function(err){

            done(err);
        })

    });

    it('inspect a non existent machine', function(done) {

        // no timeout, creating the machine could take a while
        this.timeout(0);

        machine.inspect("notarealmachine").then(
            function (output) {
                done(output);
            }
        ).fail(function(err){

            err.should.have.string('Host does not exist');
            done();
        })

    });
});



describe('#kill',function() {


    it('kill a machine ', function(done) {

        // no timeout, creating the machine could take a while
        this.timeout(0);

        machine.kill(machineName).then(
            function (output) {
                console.log(output);
                output.should.be.a('string');
                done();
            }
        ).fail(function(err){

            done(err);
        })

    });


});


describe('#rm',function() {


    it('remove a machine', function(done) {

        // no timeout, deleting the machine could take a while
        this.timeout(0);

        machine.rm(machineName).then(
            function (output) {
                console.log(output);
                output.should.be.a('string');
                done();
            }
        ).fail(function(err){

            done(err);
        })

    });


});
