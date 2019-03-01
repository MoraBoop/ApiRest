const express = require('express');
const morgan = require('morgan');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



var app = express();
var port = process.env.PORT || 3000; 
app.use(express.static('public'));
app.use(morgan('dev'));

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'almacen';
// Use connect method to connect to the server
MongoClient.connect(url, (err, client)=> {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    client.close();
});

app.get('/', (req, res)=>{
    res.send('Home page');
});

const findDocuments = (db, callback)=>{
    const collection = db.collection('articulos');
    collection.find({}).toArray((err, docs)=> {
        assert.equal(err, null);
        console.log(docs)
        callback(docs);
    });
};

app.get('/articulos', (req, res)=>{
    MongoClient.connect(url, (err, client)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        findDocuments(db, (result)=>{
            res.send(result);
            client.close();
        });
    });
});



app.listen(port, ()=>{
    console.log('App run port 3000');
});