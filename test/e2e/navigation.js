var app = require('../../index.js');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var testUtils = require('../utils');
chai.use(chaiAsPromised);


before(function(done) {
    browser.ignoreSynchronization = false;
    browser.get('/').then(function() {
        browser.waitForAngular();
        done();
    });
});

describe('Navigation Bar', function() {
    var expectPages = ['/student', '/instructor', '/author', '/developer'];

    beforeEach(function(done) {
        browser.get('/').then(function() {
            browser.findElement(by.id('navigation-dropdown')).click();
            done();
        });
    });

    describe('Navigation Dropdown Menu', function () {

        it('should have 4 pages', function(done) {
            var navLinks = element(by.id('navigation-links')).all(by.css('a'));
            expect(navLinks.count()).to.eventually.equal(expectPages.length);
            done();
        });

        it('should navigate to /student', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Student')).click();
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/student');
            done();
        });

        it('should navigate to /instructor', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Instructor')).click();
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/instructor');
            done();
        });
        
        it('should navigate to /author', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Author')).click();
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/author');
            done();
        });
        
        it('should navigate to /developer', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Developer')).click();
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/developer');
            done();
        });

    });

    describe('User Dropdown Menu', function () {
        
        beforeEach(function(done) {
            browser.get(testUtils.createTestAuthUrl('test', 'id', 'token', 'email', 'Test Name')).then(function() {
                done();
            });
        });

        afterEach(function(done) {
            browser.get('/logout');
            done();
        });

        it('should have logged the user in', function(done) {
            browser.findElement(by.id('logout'));
            done();
        });

    });

    describe('Home Button', function () {

        it('should take us home when home is clicked', function(done) {
            browser.get('/student');
            browser.findElement(by.id('home-button')).click();
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
            done();
        });
    });

});

















