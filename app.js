var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(proccess.env.PORT, function () {
    console.log('Example app listening on port 3000!');
});