import React, { Component } from 'react'
import { throttle, debounce } from 'throttle-debounce';
import Movies from './Movies';

export default class Search extends Component {

	constructor(props){
		super(props);
		this.state = { 
			query: '',
			trandingMovies: [],
			searchResults: []
		};
		this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
		this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);
	}

	autocompleteSearch = query => {
		this.fetch(query);
	};

	searchChangeHandler = event => {
		this.setState({ query: event.target.value }, () => {
			const query = this.state.query;
			if (query.length < 5) {
				this.autocompleteSearchThrottled(this.state.query);
			} else {
				this.autocompleteSearchDebounced(this.state.query);
			}
		});
	};

	fetch = query => {
		const searchResults = this.state.searchResults || [];
		searchResults.push(query);
		this.setState({ searchResults });
	};

	fetch = query => {
		const searchResults = this.state.searchResults || [];
		
        fetch(`/api/movies/search/:${ query }`)
            .then(res => res.json())
            .then(searchResults => this.setState({ searchResults }));
	}
	
	componentDidMount(){
        fetch('/api/movies/trending')
            .then(res => res.json())
            .then(trandingMovies => this.setState({ trandingMovies }));
    }
  
	render() {
		const searchResults = this.state.searchResults || [];
		const movies = searchResults.length > 0 ? 
						searchResults : 
						this.state.trandingMovies

		return (
			<div id='search'>
				<div className='search-form'>
					<label for='search' className='search-label'>
						<i className='fas fa-search'></i>
					</label>
					<input 
						className='search-input' 
						id='search' 
						name='search' 
						placeholder='Search for movies &amp; more'
						type='search'
						value={ this.state.query }
						onChange={ this.searchChangeHandler } />
				</div>
				<div className=' search-promo'>
					<div className='strip'>
						<h2>{ searchResults.length > 0 ? `Search results for: ${ this.state.query }` : 'Trending' }</h2>
						<Movies movies={ movies } />
					</div>
				</div>
			</div>
		);
	}
}
