

/********************************************************************************************************************/
/** *****************************************************************************************************************/
/**                                                                                                                **/
/**                                                                                                                **/
/** style Page                                                                                                     **/
/**                                                                                                                **/
/** Author: Nishant Bhat                                                                                           **/
/**                                                                                                                **/
/** Date of creation : 06-10-2017                                                                                  **/
/**                                                                                                                **/
/** Purpose:  To create Web server                                                                                 **/
/**                                                                                                                **/
/** Details:                                                                                                       **/
/**       Creates the web server on port 3000 and loads the index html file from public folder                     **/
/**                                                                                                                *                                                                                                              **/
/**                                                                                                                **/
/** ABC company CONFIDENTIAL                                                                                       **/
/** ______________________________________________________________________________________________________________ **/
/**                                                                                                                **/
/**  [2012] - [2017] ABC company                                                                                   **/
/**  All Rights Reserved.                                                                                          **/
/**                                                                                                                **/
/** NOTICE:  All information contained herein is, and remains                                                      **/
/** the property of ABC company  and its suppliers,                                                                **/
/** if any.  The intellectual and technical concepts contained                                                     **/
/** herein are proprietary to ABC company                                                                          **/
/** and its suppliers and may be covered by U.S. and Foreign Patents,                                              **/
/** patents in process, and are protected by trade secret or copyright law.                                        **/
/** Dissemination of this information or reproduction of this material                                             **/
/** is strictly forbidden unless prior written permission is obtained                                              **/
/** from ABC company.                                                                                              **/
/**                                                                                                                **/
/********************************************************************************************************************/
/******************************************************************************************************************/





var express = require('express'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    http = require('http'),
    path = require('path');
app = module.exports = express();
https = require("https");
const fs = require('fs');
var cors = require('cors');
app.use(cors());
var apiRoutes = express.Router();
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

/**
 * Configuration
 */


// all environments
app.set('port', process.env.PORT || 8000);
app.use(morgan('dev'));
app.use(bodyParser());
app.disable('etag');
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    app.use(errorHandler());
}

// production only
if (env === 'production') {
    // TODO
}


/**
 * Routes
 */


app.get('/', function (request, response) {
    response.sendFile('index.html'); //Since we have configured to use public folder for serving static files. We don't need to append public to the html file path.
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//https.createServer(options, app).listen(8000, function () {
//  console.log('https server listening on port 8000');
//});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leacked to users

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});