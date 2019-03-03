exports.news = {
    "name": "newsapi-all",
    "kease": "newsapi",
    "url": (apikey, request)=>{
        return `https://newsapi.org/v2/everything?q=${request.query.q}&apiKey=${apikey}`;
    },
    "transform": (json)=>{
        return json;
    }
};
exports.topnews = {
    "name": "newsapi-top",
    "kease": "newsapi",
    "url": (apikey, request)=>{
        return `https://newsapi.org/v2/top-headlines?q=${request.query.q}&apiKey=${apikey}`;
    },
    "transform": (json)=>{
        return json;
    }
};