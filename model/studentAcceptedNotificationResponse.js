var StudentAcceptedNotificationResponse = function (receipients) {
this.receipients = receipients;
}

StudentAcceptedNotificationResponse.prototype.receipients = {}

StudentAcceptedNotificationResponse.prototype.setStudents = function (receipients) {
this.receipients = receipients;
}

module.exports = StudentAcceptedNotificationResponse;
