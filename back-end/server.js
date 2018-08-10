const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const publicDir = '/app';
const port = 8010;

const cookies = require('cookie-parser');
const Cors = require('cors');


app.use(express.static(path.resolve(__dirname + publicDir)));
app.use(cookies());
app.use(Cors({credentials: true, origin: true}));


app.get('/',function (req,res) {
    res.sendFile(path.join(__dirname + publicDir + '/index.html'));
});

app.use(bodyParser.urlencoded({extended: true}));

// initialize routes
app.use('/api', require('./routes/api'));




app.listen(port);

console.log('Server is started is ' + 'localhost:'+port);