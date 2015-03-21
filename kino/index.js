'use strict';
var express = require('express');
var config = require('./config').values;
var app = express();

// Configuration

app.use(express.static(__dirname + '/public'));

if (config.public) {
    app.listen(config.port);
} else {
    app.listen(config.port, config.host);
}

console.log("Express server listening on port %d in %s mode",
    config.port, app.settings.env);
