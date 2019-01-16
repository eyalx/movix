var express = require('express');
var axios = require('axios');

var app = express();

const port = 5000;
const apiKey = '84f9baf0803d594c22ce4587b13e1a1f';

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/api/movies/trending', (req, res) => {

  axios.get('https://api.themoviedb.org/3/trending/all/day', { 
      params: {
        api_key: apiKey
      }
    }).then((response) => {
      
      let trendingMovies = [];
      response.data.results.map((movies) => {
        trendingMovies.push(movies)
      });
      res.json(trendingMovies);

  }).catch((error) =>{
    console.log(error);
  });

});

app.get('/api/movies/now-playing', (req, res) => {

  axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: apiKey
      }}).then((response) => {
      
      let nowPlaying = [];
      response.data.results.map((movies) => {
        nowPlaying.push(movies)
      });
      res.json(nowPlaying);

  }).catch((error) => {
    console.log(error);
  });

});

app.get('/api/movies/search/:query', (req, res) => {
  const searchTerm = req.params.query;

  axios.get('https://api.themoviedb.org/3/search/movie/', { 
      params: {
        api_key: apiKey,
        query: searchTerm
    }}).then((response) => {

      let searchResults = [];
      response.data.results.map((movies) => {
        searchResults.push(movies)
      });
      res.json(searchResults);

  }).catch((error) => { 
    console.log(error);
  });
});