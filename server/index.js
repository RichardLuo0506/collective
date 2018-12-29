var express = require('express');
var app = express();
var cors = require('cors');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 8080;

app.use(cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://thecollective.auth0.com/.well-known/jwks.json"
    }),
    aud: '127.0.0.1/api',
    issuer: "https://thecollective.auth0.com/",
    algorithms: ['RS256']
});

app.get('/api/public', function(req, res){
	res.json({message: 'from public endpoint'});
});

app.get('/api/private', jwtCheck, function(req, res){
	res.json({message: 'from private endpoint'});
});

app.listen(3001);
console.log('', 'listening from 3001');