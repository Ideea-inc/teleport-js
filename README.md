<p align="center">
    <img width="192" src="https://ideea.io/static/img/teleport.png" alt="Teleport">
</p>

---

### [Teleport](https://ideea.io/teleport) &nbsp;&nbsp;|&nbsp;&nbsp; [Ideea.io](https://ideea.io) &nbsp;&nbsp;|&nbsp;&nbsp; [User Guide](https://ideea.io/docs/teleport/user-guide) &nbsp;&nbsp;|&nbsp;&nbsp; [OpenAPI Spec](https://ideea.io/docs/teleport/openapi-spec) &nbsp;&nbsp;|&nbsp;&nbsp; [NPM](https://www.npmjs.com/package/@ideea-inc/teleport-js)

---

# Teleport JS SDK

Instantly Courier Anything in Austin in 1 hour from just $9.

## Installation

```
$ npm install @ideea-inc/teleport-js
```

## Example

```js
const Teleport = require('@ideea-inc/teleport-js')
const teleport = new Teleport('API_KEY')

teleport.create({
    group_id: 'e0ab5d2c-5bce-4076-a128-64c6467e914a',
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
}).then((teleport) => {
    console.log(teleport)
})
```

## Methods

Please refer to the [full documentation](https://ideea.io/docs/teleport/user-guide) for the full list of methods.

### Teleport.create(teleport)
A Teleport represents a physical item being moved from point A to point B. When you create a Teleport, you will be charged $9 and a courier will be dispatched to pick-up your item from the pick-up address and the item will be taken to the delivery address.

```js
teleport.create({
    group_id: 'e0ab5d2c-5bce-4076-a128-64c6467e914a',
    data: '{arbitrary: "string"}',                          // Arbitrary user data (optional)
    notifications: false,                                   // Email Notifications

    pickup_image: fs.createReadStream('./package.jpg'),     // Image of the item for courier (optional)
    pickup_name: 'Anthony Budd',
    pickup_address_line_1: '300 Bowie Street',
    pickup_zipcode: '78703',
    
    delivery_name: 'John Smith',
    delivery_phone: '512-982-1776',                         // Phone number of recipient
    delivery_address_line_1: '401 Brazos Street',
    delivery_zipcode: '78701',
}).then((teleport) => {
	console.log(teleport)
})
```

### Teleport.quote(teleport)
To get a quote the cost of a teleport before you make a teleport use the .quote() method.

```js
teleport.quote({
    pickup_address: '300 Bowie Street, 78703',
    delivery_address: '401 Brazos Street, 78701',
}).then((quote) => {
	console.log(quote)
})
```

### Teleport.get(teleportID)
The .get(teleportID) method will return a single Teleport by ID.

```js
teleport.get('00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b')
    .then((teleport) => {
	console.log(teleport)
})
```

### Teleport.getByGroupID(groupID)
To get all of the Teleports created by a group use the method getByGroupID(groupID)

```js
teleport.getByGroupID('00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b')
.then((teleports) => {
	console.log(teleports)
})
```

### Teleport.getByCurrentUser()
To get all of the Teleports created by the current user call the method getByCurrentUser()

```js
teleport.getByCurrentUser().then((teleports) => {
	console.log(teleports)
})
```
