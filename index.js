const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3030; 

//Config
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.set('json spaces', 2);

//Routes
app.use('/api/', require('./routes/articulos'));

app.listen(port, ()=>{
    console.log('App run port 3030');
});