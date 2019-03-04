const express = require('express');
const morgan = require('morgan');

var app = express();
var port = process.env.PORT || 3030; 
app.use(express.static('public'));
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false}));
// parse application/json
app.use(express.json());
// mejor presentacion de lectura
app.set('json spaces', 2);


app.use(require('./routes/index'));
app.use('/api/', require('./routes/articulos'));



app.listen(port, ()=>{
    console.log('App run port 3030');
});