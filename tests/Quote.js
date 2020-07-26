const FormData = require('form-data');
const { assert } = require("chai");

const teleport = require("./config/teleport");


const assertModel = (model) => assert.containsAllKeys(model, [
    'quote',
    'quote_human',
]);


describe('Quote', () => {

    describe('Teleport.quote()', () => {

        it('Downtown', done => {
            teleport.quote({
                pickup_address: '316 E 6th St, 78701',
                delivery_address: '300 bowie street, 78703',
            })
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');
                    assert.isObject(response.data);
                    assert.equal(response.data.quote, 900)
                    assertModel(response.data)
                    done();
                })
                .catch(err => done(err));
        });

        it('Austin', done => {
            teleport.quote({
                pickup_address: '316 E 6th St, 78701',
                delivery_address: '1301 S Capital of Texas Hwy, 78746',
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
