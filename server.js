var express = require('express');
var axios = require('axios');

var app = express();

const port = 5000;
const apiKey = '84f9baf0803d594c22ce4587b13e1a1f';
const apiUrl ='https://api.themoviedb.org/3/';

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/api/movies/trending', (req, res) => {

  fetchApiCall('trending/all/day', {},
    (results) => res.json(results));

});

app.get('/api/movies/now-playing', (req, res) => {

  fetchApiCall('movie/now_playing', {},
    (results) => res.json(results));
  
});

app.get('/api/movies/search/:query', (req, res) => {
  
  const searchTerm = req.params.query;
  
  fetchApiCall('search/movie/', 
    { query: searchTerm },
    (results) => res.json(results));

});

function fetchApiCall(route, params, callBack){
  axios.get(`${apiUrl}${route}`, { 
      params: { api_key: apiKey, ...params }
    }).then((response) => {
    
      let results = [];
      response.data.results.map((movies) => {
        results.push(movies)
      });
      callBack(results);

  }).catch((error) => { 
    console.log(error);
  });
}