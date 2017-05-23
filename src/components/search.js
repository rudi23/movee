import React, {Component} from 'react';
import SearchBar from './search-bar';
import TVShowList from './tv-show-list';
import fetch from 'node-fetch';
import showListFactory from '../factory/showListFactory';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            shows: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit() {
        fetch(`http://api.tvmaze.com/search/shows?q=${this.state.query}`)
        .then(res => res.json())
        .then(showListFactory)
        .then(shows => this.setState({shows: shows}));
    }

    render() {
        return (
            <div className="container">
                <SearchBar query={this.state.query}
                           onClick={this.handleSubmit}
                           onChange={this.handleChange}
                />
                <TVShowList shows={this.state.shows}/>
            </div>
        );
    }
}

export default Search;
