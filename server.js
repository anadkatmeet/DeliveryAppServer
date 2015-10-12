var express = require('express');
var app = express();
var assert = require('assert');
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/dmDB';

var bodyParser = require('body-parser');
//Name of the collection


var myCollection = "driver";

app.use(bodyParser());

var user = { _id: 99, "uname": "driver4", "password": "driver4", "name": "driver4" };


app.get('/addDriver', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        
        // Insert a single document
        db.collection(myCollection).insertOne(user, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            
            db.close();
        });
    });
})

app.post('/addDeliveryCompany', function (req, res) {
    var myCollection = "dCompany";
    console.log("in the addDeliveryCompany method");
    var _id = req.body._id;
    var uname = req.body.uname;
    var password = req.body.password;
    var name = req.body.name;
    var contact = req.body.contact;
    var address = req.body.address;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    
    var user = {
        "_id": _id, "uname": uname, "password": password, "name": name, "contact": contact, 
        "address": address, "location": { "latitude": latitude, "longitude": longitude }
    };
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        // Insert a single document
        db.collection(myCollection).insertOne(user, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            
            db.close();
        });
    });
    res.end("1");
});

app.post('/addRestaurant', function (req, res) {
    var myCollection = "restaurant";
    console.log("in the addRestaurant method");
    var _id = req.body._id;
    var uname = req.body.uname;
    var password = req.body.password;
    var name = req.body.name;
    var details = req.body.details;
    var contact = req.body.contact;
    var address = req.body.address;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    
    var user = {
        "_id": _id, "uname": uname, "password": password, "name": name, "contact": contact, 
        "address": address, "location": { "latitude": latitude, "longitude": longitude }, "details": details
    };
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        // Insert a single document
        db.collection(myCollection).insertOne(user, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            
            db.close();
        });
    });
    res.end("1");
});

app.post('/addDriver', function (req, res) {
    var myCollection = "driver";
    console.log("in the addDriver method");
    var _id = req.body._id;
    var uname = req.body.uname;
    var password = req.body.password;
    var name = req.body.name;
    var companyID = req.body.companyID;
    var contact = req.body.contact;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    
    var user = {
        "_id": _id, "uname": uname, "password": password, "name": name, "contact": contact, 
        "location": { "latitude": latitude, "longitude": longitude }, "companyID": companyID
    };
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        // Insert a single document
        db.collection(myCollection).insertOne(user, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            
            db.close();
        });
    });
    res.end("1");
});

app.post('/trypost', function (req, res) {
    console.log("in the post method");
    //console.log(req);
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = " + user_name + ", password is " + password);
    res.end("yes");
});

//check driver Login POST
app.post('/driverLogin', function (req, res) {
    var username = req.body.uname;
    console.log(username);
    var password = req.body.password;
    console.log(password);
    
    var query = { 'uname': username ,'password':password};
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");        
        db.collection(myCollection).findOne(query, function (err, item) {
            if (err) {
                console.log(err);
                res.send(item);
                res.end();
            }
            else {
                res.send(item);
                res.end();
            }
        });
    });
    console.log("User name = " + username + ", password is " + password);
});

app.post('/updateDriverLocation', function (req, res) {
    var myCollection = "driver";
    console.log("in the updateDriverLocation method");
    var _id = parseInt(req.body._id);
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    console.log("latitude: " + latitude + "\tlongitude: " + longitude);
    
    
    MongoClient.connect(url, function (err, db) {
        //assert.equal(null, err);
        console.log("Connected correctly to server");
        // Insert a single document
        
        db.collection(myCollection).updateOne(
            { "_id": _id }, 
            { $set: { "latitude": latitude, "longitude": longitude } }, function (err, r) {
                //assert.equal(null, err);
                //assert.equal(1, r.insertedCount);
                
                db.close();
            });
    });
});

app.post('/updateDriverStatus', function (req, res) {
    var myCollection = "driver";
    console.log("in the updateStatus method");
    var _id = parseInt(req.body._id);
	console.log(_id);
    var status = parseInt(req.body.status) ;
	console.log(status);
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        // Insert a single document
        
        db.collection(myCollection).updateOne(
            { '_id': _id }, 
            { $set: { 'status': status} }, function (err, result) {
				console.log(err);
                //res.send(result);       
                db.close();
            });
    });
    
    res.end("1");
});

app.post('/getDriverById', function (req, res) {
    var id = req.body.id;    
    var query = { '_id': id };
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected to getDriverById");        
        db.collection(myCollection).findOne(query, function (err, item) {
            if (err) {
                console.log(err);
                res.send(item);
                res.end();
            }
            else {
                res.send(item);
                res.end();
            }
        });
    });
});

app.post('/getDriverLocation', function (req, res) {
    var id = req.body.id;    
    var query = { '_id': id };
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected to getDriverById");        
        db.collection(myCollection).findOne(query,{fields:{'location':1}}, function (err, item) {
            if (err) {
                console.log(err);
                res.send(item);
                res.end();
            }
            else {
                res.send(item);
                res.end();
            }
        });
    });
});

app.post('/getAllOnlineDrivers', function (req, res) {
	
    var query = { 'status': '1' };
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected to getAllOnlineDrivers");        
        db.collection(myCollection).find.toArray(function(err, docs) {
        res.send(docs);
		res.end();
        db.close();
      });
    });
});


app.post('/sendDeliveryRequest', function (req, res) {
    var myCollection = "deliveryRequest";
    console.log("in the sendDeliveryRequest method");
    var _id = req.body._id;
    var restaurantID = req.body.restaurantID;
    var companyID = req.body.companyID;
    var details = req.body.details;
    var postalCode = req.body.postalCode;
    var deliveryAddress = req.body.deliveryAddress;
    
    var user = {
        "_id": _id, "restaurantID": restaurantID, "companyID": companyID, "details": details, "postalCode": postalCode, 
        "deliveryAddress": deliveryAddress
    };
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        // Insert a single document
        db.collection(myCollection).insertOne(user, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            
            db.close();
        });
    });
    res.end("1");
});

var server = app.listen(8081, function () {
    
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})