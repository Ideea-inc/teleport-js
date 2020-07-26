const FormData = require('form-data');
const { assert } = require("chai");

const teleport = require("./config/teleport");


const assertModel = (model) => assert.containsAllKeys(model, [
    'estimate',
    'estimate_human',
]);


describe('Estimate', () => {

    describe('Teleport.estimate()', () => {

        it('Downtown', done => {
            teleport.estimate({
                pickup_address_line_1: '316 E 6th St',
                pickup_zipcode: '78701',
                delivery_address_line_1: '300 bowie street',
                delivery_zipcode: '78703',
            })
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');
                    assert.isObject(response.data);
                    assert.equal(response.data.estimate, 900)
                    assertModel(response.data)
                    done();
                })
                .catch(err => done(err));
        });

        it('Austin', done => {
            teleport.estimate({
                pickup_address_line_1: '316 E 6th St',
                pickup_zipcode: '78701',
                delivery_address_line_1: '1301 S Capital of Texas Hwy',
                delivery_zipcode: '78746',
            })
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');
                    assert.isObject(response.data);
                    assertModel(response.data)
                    done();
                })
                .catch(err => done(err));
        });
    });
});
