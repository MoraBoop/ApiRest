const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const { Router } = require('express');
const router = Router();

const url = 'mongodb://localhost:27017';
const dbName = 'almacen';
const client = new MongoClient(url);

const findDocuments = (db, callback)=>{
    const collection = db.collection('articulos');
    collection.find({}, 
        {'_id': 0}).toArray((err, docs)=> {
        assert.equal(err, null);
        callback(docs);
    });
};

router.get('/articulos', (req, res)=>{
    client.connect((err, client)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
            findDocuments(db, (result)=>{
            res.send(result);
            client.close();
        });
    }); 
});

router.post('/articulos', (req, res)=>{
    var myObj = req.body;
    client.connect((err, client)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('articulos').insertOne(myObj, (err, result)=>{
            assert.equal(null, err);
            console.log(result);
            res.send('received');
            client.close();
        });
    });
});

module.exports = router;