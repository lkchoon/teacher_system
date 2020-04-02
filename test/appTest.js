const assert = require('assert');
const express = require("express");
const TeacherSystemDataSource = require("../teacherSystemDataSource.js");
const sinon = require('sinon');
const chai = require('chai')
const spies = require('chai-spies');
const bodyParser = require('body-parser');
const expect = chai.expect;

chai.use(spies);
request = require('supertest');

describe('/api/commonstudents', function() {

    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);

    it('Given an invalid filter should return 400', function(done) {
        request(app)
            .get('/api/commonstudents?abc=2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});

describe('/api/commonstudents', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    teacherSystemDataSource.getCommonStudents.resolves([]);
    it('Given a valid filter should return 200', function(done) {
        request(app)
            .get('/api/commonstudents?teacher=1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                teacherSystemDataSource.getCommonStudents.restore();
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/commonstudents', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    teacherSystemDataSource.getCommonStudents.rejects('rejected');
    it('Given getCommonStudents return rejected should return 500', function(done) {
        request(app)
            .get('/api/commonstudents?teacher=1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function(err, res) {
                teacherSystemDataSource.getCommonStudents.restore();
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/suspend', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    it('Given empty student should return 400', function(done) {
        request(app)
            .post('/api/suspend')
            .send({})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/suspend', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    teacherSystemDataSource.suspendStudent.resolves([]);
    it('Given valid student should return 204', function(done) {
        request(app)
            .post('/api/suspend')
            .set('Accept', 'application/json')
            .send({
                "student": "student1@gmail.com"
            })
            .expect('Content-Type', /json/)
            .expect(204)
            .end(function(err, res) {
                teacherSystemDataSource.suspendStudent.restore();
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/suspend', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    teacherSystemDataSource.suspendStudent.rejects('DB error');
    it('Given suspendStudent return rejected promise should return 500', function(done) {
        request(app)
            .post('/api/suspend')
            .set('Accept', 'application/json')
            .send({
                "student": "student1@gmail.com"
            })
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function(err, res) {
                teacherSystemDataSource.suspendStudent.restore();
                if (err) return done(err);
                done();
            });
    });
});

describe('/api/retrievefornotifications', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    it('Given teacher field is empty should return 400', function(done) {
        request(app)
            .post('/api/retrievefornotifications')
            .set('Accept', 'application/json')
            .send({
                "teacher": "",
                "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/retrievefornotifications', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    teacherSystemDataSource.getUnsuspendedStudent.resolves([]);
    it('Given valid request should return 200', function(done) {
        request(app)
            .post('/api/retrievefornotifications')
            .set('Accept', 'application/json')
            .send({
                "teacher": "teacher1@gmail.com",
                "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                teacherSystemDataSource.getUnsuspendedStudent.restore();
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/retrievefornotifications', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    teacherSystemDataSource.getUnsuspendedStudent.rejects('DB error');
    it('Given getUnsuspendedStudent return rejected promise should return 500 ', function(done) {
        request(app)
            .post('/api/retrievefornotifications')
            .set('Accept', 'application/json')
            .send({
                "teacher": "teacher1@gmail.com",
                "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
            })
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function(err, res) {
                teacherSystemDataSource.getUnsuspendedStudent.restore();
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/register', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    it('Given teacher field is empty should return 400', function(done) {
        request(app)
            .post('/api/register')
            .set('Accept', 'application/json')
            .send({
                "students": [
                    "studentjon@gmail.com",
                    "studenthon@gmail.com"
                ]
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/register', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    it('Given student field is empty should return 400', function(done) {
        request(app)
            .post('/api/register')
            .set('Accept', 'application/json')
            .send({
                "teacher": "teacherken@gmail.com"
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/register', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    teacherSystemDataSource.registerStudent.resolves([]);
    it('Given valid request should return 204', function(done) {
        request(app)
            .post('/api/register')
            .set('Accept', 'application/json')
            .send({
                "teacher": "teacherken@gmail.com",
                "students": [
                    "studentjon@gmail.com",
                    "studenthon@gmail.com"
                ]
            })
            .expect('Content-Type', /json/)
            .expect(204)
            .end(function(err, res) {
                teacherSystemDataSource.registerStudent.restore();
                if (err) return done(err);
                done();
            });
    });
});
describe('/api/register', function() {
    let teacherSystemDataSource = sinon.createStubInstance(TeacherSystemDataSource);
    let app = configureApp(teacherSystemDataSource);
    teacherSystemDataSource.registerStudent.rejects('DB error');
    it('Given registerStudent return rejected promise should return 500', function(done) {
        request(app)
            .post('/api/register')
            .set('Accept', 'application/json')
            .send({
                "teacher": "teacherken@gmail.com",
                "students": [
                    "studentjon@gmail.com",
                    "studenthon@gmail.com"
                ]
            })
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function(err, res) {
                teacherSystemDataSource.registerStudent.restore();
                if (err) return done(err);
                done();
            });
    });
});

function configureApp(teacherSystemDataSource) {
    let app = express();
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());
    require('../app.js')(app, teacherSystemDataSource);

    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());
    return app;
}