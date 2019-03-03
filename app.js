const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');
const kease = require('./kease');
const stocksObj = require('./stocks');
const trendsObj = require('./trends');
const trends = Object.keys(trendsObj).map(name=>trendsObj[name]);
const stocks = Object.keys(stocksObj).map(name=>stocksObj[name]);

const app = express();

app.use(express.static(__dirname));

app.all('/', function (req, res) {
    res.send(fs.readFileSync(__dirname+"/index.html").toString());
});
app.get('/data', function (req, res) {
    const requestCount = trends.length + stocks.length;
    let responseCount = 0;
    const data = {
        stocks:{},
        trends:{},
    };
    trends.forEach(api=>{
        const url = api.url(kease[api.kease], req);
        fetch_json(url, function(json){
            data.trends[api.name] = api.transform(json);
            responseCount++;
            if(requestCount === responseCount){
                res.send(data);
            }
        })
    });
    stocks.forEach(api=>{
        const url = api.url(kease[api.kease], req);
        fetch_json(url, function(json){
            data.stocks[api.name] = api.transform(json);
            responseCount++;
            if(requestCount === responseCount){
                res.send(data);
            }
        })
    });
});
app.listen(8080);

function fetch_json(url, callback){
    fetch(url)
        .then(resp=>resp.json())
        .then(json=>{
            callback(json);
        })
        ;
}