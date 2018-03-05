var request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:5000/";

/*

    ACCOUNT MANAGEMENT

*/

describe("Signup with invalid email", function() {
  describe("POST /signup", function() {
    it("Should return success: false + error message", function(done) {

      request.post({ url: base_url + "signup", form: {email:'kevin@gmail.com', password:'password'}}, function(err,httpResponse,body) {
        console.log(body)
        body = JSON.parse(body);
        assert.equal(body.success, false)
        done();
      });
    });
  });
});

describe("Login with incorrect email", function() {
  describe("POST /signup", function() {
    it("Should return success: false + error message", function(done) {
      request.post({ url: base_url + "login", form: {email:'kevi@gmail.com', password:'password'}}, function(err,httpResponse,body) {
        body = JSON.parse(body);
        assert.equal(body.success, false)
        done();
      });
    });
  });
});

describe("Login with correct email", function() {
  describe("POST /login", function() {
    it("Should return success: true message: \"successfully logged in!\" ", function(done) {
      request.post({ url: base_url + "login", form: {email:'kevin@purdue.edu', password:'password'}}, function(err,httpResponse,body) {
        body = JSON.parse(body);
        assert.equal(body.success, true)
        done();
      });
    });
  });
});

describe("Get flyers with logged in user", function() {
  describe("POST /getflyers", function() {
    it("Should return success: true  message: successfully retrieved flyers", function(done) {
      request.post({ url: base_url + "login", form: {email:'kevin@purdue.edu', password:'password'}}, function(err,httpResponse,body) {
        body = JSON.parse(body);
        var token = body.token;

        request.post({ url: base_url + "getflyers", headers: {'token': body.token} ,form: {email:'kevin@purdue.edu', password:'password'}}, function(err1,httpResponse1,body1) {
          body1 = JSON.parse(body1);
          assert.equal(body1.success, true)
          done();
        });
      });
    });
  });
});



/*

    FLYER MANAGEMENT

*/

describe("Create a flyer", function() {
  describe("POST /create then POST /flag", function() {
    it("Should return success: true  message: successfully created and deleted flyer", function(done) {
      request.post({ url: base_url + "login", form: {email:'kevin@purdue.edu', password:'password'}}, function(err,httpResponse,body) {
        body = JSON.parse(body);
        var token = body.token;

        request.post({ url: base_url + "createflyer", headers: {'token': body.token} ,form: {image_url: "", title: "Mocha Test", description: "This is an automated test", startdate: 1, enddate: 2}}, function(err1,httpResponse1,body1) {
          body1 = JSON.parse(body1);
          console.log(body1.flyer._id)
          var flyer = body1.flyer._id;
          assert.equal(body1.success, true)
          done();

        });
      });
    });
  });
});
