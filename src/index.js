const axios = require('axios');

/**
 * Teleport
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Teleport = function (apiKey, opts = {}) {
    Object.assign(
        this,
        {
            hostname: "https://teleport.ideea.io/api/v1",
            accessToken: false,
            apiKey: apiKey
        },
        opts
    );


    var base = {
        hostname: this.hostname,
        accessToken: this.accessToken,
        apiKey: this.apiKey,
        getHeaders: function (form) {
            var headers = {};
            if (this.apiKey) headers["X-Api-Token"] = this.apiKey;

            if (this.accessToken)
                headers["Authorization"] = "Bearer " + this.accessToken;

            if (form && typeof form === 'object' && form.constructor.name === 'FormData')
                Object.assign(headers, form.getHeaders());

            return headers;
        }
    }

    Object.assign(this, base);
};


// -----------------------------------------------------
// Methods
// -----------------------------------------------------

/**
 * GET /teleports
 *
 * @returns {Promise}
 */
Teleport.prototype.getByCurrentUser = function () {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/teleports`, {
            headers: this.getHeaders(),
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * GET /teleports/group/{groupID}
 *
 * @param {String} groupID
 * @returns {Promise}
 */
Teleport.prototype.getByGroupID = function (groupID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/teleports/group/${groupID}`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * GET /teleports/{teleportID}
 *
 * @param {String} teleportID
 * @returns {Promise}
 */
Teleport.prototype.get = function (teleportID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/teleports/${teleportID}`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * POST /teleports/create
 * 
 * @param {FormData} teleport
 *   @param {String} [teleport.group_id]
 *   @param {Boolean} [teleport.notifications]
 *   @param {String} [teleport.data]
 * 
 *   @param {File}   [teleport.pickup_image]
 *   @param {String} [teleport.pickup_name]
 *   @param {String} [teleport.pickup_phone]
 *   @param {String} [teleport.pickup_address_line_1]
 *   @param {String} [teleport.pickup_address_line_2]
 *   @param {String} [teleport.pickup_address_line_3]
 *   @param {String} [teleport.pickup_zipcode]
 *   @param {String} [teleport.pickup_city]
 * 
 *   @param {String} [teleport.delivery_name]
 *   @param {String} [teleport.delivery_phone]
 *   @param {String} [teleport.delivery_address_line_1]
 *   @param {String} [teleport.delivery_address_line_2]
 *   @param {String} [teleport.delivery_address_line_3]
 *   @param {String} [teleport.delivery_zipcode]
 * @returns {Promise}
 */
Teleport.prototype.create = function (teleport) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/teleports/create`, teleport, {
            headers: this.getHeaders(teleport),
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


module.exports = Teleport;
