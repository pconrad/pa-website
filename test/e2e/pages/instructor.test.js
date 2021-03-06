var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var app = require('../../../app.js');
var models = require('../../../models');
var utils = require('../../utils');
var server;

describe('/instructor', function() {
    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
	            models.sequelize.sync({ force: true }).then(function () {
                    done();
	            });
            });
        });
    });

    after(function(done) {
        server.close();
        done();
    });

    describe('instructor navigation items', function() {
        before(function(done) {
            browser.get('/instructor').then(function() { done(); })
        });
        describe('Instructor', function() {
            var firstNavItem;
            before(function(done) {
                firstNavItem = element(by.repeater('tab in instructorCtrl.navigationTabs | filter:{loginRequired:false}').row(0));
                firstNavItem.click().then(function() {
                    done();
                });
            });
            it('should be the first navigation item', function(done) {
                expect(firstNavItem.getText()).to.eventually.equal('Instructor');
                done();
            });
            it('should have class active', function(done) {
                expect(firstNavItem.getAttribute('class')).to.eventually.include('active');
                done();
            });
        });
        describe('Export Questions', function() {
            var exportNavItem;
            before(function(done) {
                exportNavItem = element(by.linkText('Export Questions'));
                exportNavItem.click().then(function() {
                    done();
                });
            });
            it('should go to /instructor/export', function(done) {
                expect(browser.getCurrentUrl()).to.eventually.include('/instructor/export');
                done();
            });
            it('should have class active', function(done) {
                expect(exportNavItem.getAttribute('class')).to.eventually.include('active');
                done();
            });
        });
        describe('Quiz Descriptors', function() {
            describe("when the user is unauthenticated", function() {
                var qdNavItem, testUser;
                before(function(done) {
                    qdNavItem = element(by.linkText('Quiz Descriptors'));
                    qdNavItem.click().then(function() {
                        done();
                    });
                });
                it('should redirect user to /login', function(done) {
                    expect(browser.getCurrentUrl()).to.eventually.include('/login');
                    done();
                });
            });

            describe("when the user is authenticated", function() {
                var qdNavItem, testUser;
                before(function(done) {
                    utils.protractorLogin().then(function(user) {
                        testUser = user;
                        browser.get('/instructor').then(function() {
                            qdNavItem = element(by.linkText('Quiz Descriptors'));
                            qdNavItem.click().then(function() {
                                done();
                            });
                        });
                    });
                });
                after(function(done) {
                    utils.protractorLogout().then(function() {
                        done();
                    });
                });
                it('should go to /instructor/quizdescriptors', function(done) {
                    expect(browser.getCurrentUrl()).to.eventually.include('/instructor/quizdescriptors');
                    done();
                });
                it('should have class active', function(done) {
                    expect(qdNavItem.getAttribute('class')).to.eventually.include('active');
                    done();
                });
            });
        });
    });
});


