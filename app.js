const express = require('express');
const app = express();
const path = require('path');
const http = require("http");

require('dotenv').config();

app.use('/', express.static('app'));
app.use(express.json());       // to support JSON-encoded bodies

app.listen(process.env.PORT, () => console.log('Example app listening on port '+process.env.PORT));
