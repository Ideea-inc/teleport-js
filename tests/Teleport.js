var FormData = require('form-data');
var { assert } = require("chai");
var fs = require("fs");

const teleport = require("./config/teleport");

const TELEPORT_ID = "28574006-5ac2-41bd-a609-986056c1ec5b";
const GROUP_ID = "00000000-9a34-4466-ba4c-46438def7d7f";

var assertModel = (model) => assert.containsAllKeys(model, [
    'id',
    'user_id',
    'group_id',
    'charge_id',
    'claimed_by',
    'claimed_at',
    'pickedup_at',
    'delivered_at',
    'status',
    'source',
    'data',
    'notifications',

    'pickup_image',
    'pickup_name',
    'pickup_phone',
    'pickup_address_line_1',
    'pickup_address_line_2',
    'pickup_address_line_3',
    'pickup_city',
    'pickup_zipcode',
    'pickup_state',
    'pickup_lat',
    'pickup_lon',

    'delivery_image',
    'delivery_name',
    'delivery_phone',
    'delivery_address_line_1',
    'delivery_address_line_2',
    'delivery_address_line_3',
    'delivery_city',
    'delivery_zipcode',
    'delivery_state',
    'delivery_lat',
    'delivery_lon',

    'created_at',
    'updated_at',
]);


describe("Teleport", () => {

    describe("Teleport.getByCurrentUser()", () => {
        it("Should return all Teleports by the current user", done => {
            teleport.getByCurrentUser()
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');
                    assert.isArray(response.data);

                    assert.isObject(response.data[0]);
                    assertModel(response.data[0]);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("Teleport.getByGroupID()", () => {
        it("Should return all Teleports by group ID", done => {
            teleport.getByGroupID(GROUP_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');
                    assert.isArray(response.data);

                    assert.isObject(response.data[0]);
                    assert.equal(response.data[0].group_id, GROUP_ID);
                    assertModel(response.data[0]);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("Teleport.get()", () => {
        it("Should return specified Teleport", done => {
            teleport.get(TELEPORT_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');
                    assert.isObject(response.data);
                    assertModel(response.data);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("Teleport.create()", () => {
        it("Should create new Teleport - Minimal", done => {

            let newTeleport = {
                group_id: GROUP_ID,
                data: '{arbitrary: "string"}',

                pickup_name: 'Anthony Budd',
                pickup_phone: '512-xxx-xxx',
                pickup_address_line_1: '300 Bowie Street',
                pickup_zipcode: '78703',
                pickup_city: "Austin",

                delivery_name: 'John Smith',
                delivery_phone: '512-xxx-xxx',
                delivery_address_line_1: '401 Brazos Street',
                delivery_zipcode: '78701',
            }

            teleport.create(newTeleport)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');
                    assert.isObject(response.data);
                    assertModel(response.data);

                    assert.equal(response.data.group_id, newTeleport.group_id)
                    assert.equal(response.data.data, newTeleport.data)
                    assert.equal(response.data.pickup_name, newTeleport.pickup_name)
                    assert.equal(response.data.pickup_phone, newTeleport.pickup_phone)
                    assert.equal(response.data.pickup_address_line_1, newTeleport.pickup_address_line_1)
                    assert.equal(response.data.pickup_zipcode, newTeleport.pickup_zipcode)
                    assert.equal(response.data.pickup_city, newTeleport.pickup_city)
                    assert.equal(response.data.delivery_name, newTeleport.delivery_name)
                    assert.equal(response.data.delivery_phone, newTeleport.delivery_phone)
                    assert.equal(response.data.delivery_address_line_1, newTeleport.delivery_address_line_1)
                    assert.equal(response.data.delivery_zipcode, newTeleport.delivery_zipcode)
                    done();
                })
                .catch(err => done(err));
        });

        it("Should create new Teleport - Full", done => {

            let newTeleport = {
                group_id: GROUP_ID,
                notifications: 'true',
                data: '{arbitrary: "string"}',

                pickup_image: fs.createReadStream('./tests/config/package.jpg'),
                pickup_name: 'Anthony Budd',
                pickup_phone: '512-xxx-xxx',
                pickup_address_line_1: '300 Bowie Street',
                pickup_address_line_2: 'abc',
                pickup_address_line_3: '123',
                pickup_zipcode: '78703',
                pickup_city: "Austin",

                delivery_name: 'John Smith',
                delivery_phone: '512-xxx-xxx',
                delivery_address_line_1: '401 Brazos Street',
                delivery_address_line_2: 'abc',
                delivery_address_line_3: '123',
                delivery_zipcode: '78701',
            }

            var form = new FormData();
            Object.keys(newTeleport).map(t => form.append(t, newTeleport[t]));

            teleport.create(form)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');
                    assert.isObject(response.data);
                    assertModel(response.data);

                    assert.equal(response.data.group_id, newTeleport.group_id)
                    assert.equal(response.data.notifications, true)
                    assert.equal(response.data.data, newTeleport.data)
                    assert.equal(response.data.pickup_name, newTeleport.pickup_name)
                    assert.equal(response.data.pickup_phone, newTeleport.pickup_phone)
                    assert.equal(response.data.pickup_address_line_1, newTeleport.pickup_address_line_1)
                    assert.equal(response.data.pickup_address_line_2, newTeleport.pickup_address_line_2)
                    assert.equal(response.data.pickup_address_line_3, newTeleport.pickup_address_line_3)
                    assert.equal(response.data.pickup_zipcode, newTeleport.pickup_zipcode)
                    assert.equal(response.data.pickup_city, newTeleport.pickup_city)
                    assert.equal(response.data.delivery_name, newTeleport.delivery_name)
                    assert.equal(response.data.delivery_phone, newTeleport.delivery_phone)
                    assert.equal(response.data.delivery_address_line_1, newTeleport.delivery_address_line_1)
                    assert.equal(response.data.delivery_address_line_2, newTeleport.delivery_address_line_2)
                    assert.equal(response.data.delivery_address_line_3, newTeleport.delivery_address_line_3)
                    assert.equal(response.data.delivery_zipcode, newTeleport.delivery_zipcode)
                    done();
                })
                .catch(err => done(err));
        });
    });
});
