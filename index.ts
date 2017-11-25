import special = require('./special');

function request() {
    return special.get_rest_api();
}

function other_request() {
    return special.get_other_api();
}

exports.request = request;
exports.other_request = other_request;

