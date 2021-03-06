import React, { Component } from 'react';
import MovieItem from './MovieItem';
import Slider from "react-slick";


export default class Movies extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      slider: false
    }
  }

  componentDidMount(){
    this.setState({ slider: this.props.slider })
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 9,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    if(this.state.slider){
      return (
        <div className='movies'>
          <Slider {...settings} >
            {this.props.movies.map((movie) => {
              return <MovieItem key={ movie.id } movie={ movie } />
            })}
          </Slider>
        </div>
      );
    }else{
      return (
      <div className='movies'>
          {this.props.movies.map((movie) => {
            return <MovieItem key={ movie.id } movie={movie} />
          })}
      </div>
      );
    }
    
  }
}
