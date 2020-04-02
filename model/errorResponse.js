var ErrorResponse = function (message) {
this.message = message;
}

ErrorResponse.prototype.message = "";

ErrorResponse.prototype.setMessage = function (message) {
this.message = message;
}

module.exports = ErrorResponse;
