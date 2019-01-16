import React, { Component } from 'react'

export default class MovieItem extends Component {

  constructor(props){
    super(props);
  }
  
  render() {
    const movie = this.props.movie;
    const posterUrl = `https://image.tmdb.org/t/p/w300${ movie.poster_path }`;
    return (
      <div className='item'>
         <img className='poster' src={ posterUrl } alt={ movie.title } title={ movie.title } />
      </div>
    )
  }
}
