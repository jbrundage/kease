exports.news = {
    "name": "stocks",
    "kease": "alphavantage",
    "url": (apikey, request)=>{
        return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${request.query.symbol}&interval=5min&outputsize=full&apikey=${apikey}`;
    },
    "transform": (json)=>{
        return json;
    }
};