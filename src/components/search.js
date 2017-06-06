import React, {Component} from 'react';
import SearchBar from './searchBar';
import TVShowList from './tvShowList';
import showRepository from '../repository/tvShowRepository';

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
    };

    handleSubmit(event) {
        showRepository.search(this.state.query).then(shows => this.setState({shows: shows}));
        event.preventDefault();
    };

    render() {
        return (
            <div className="container">
                <SearchBar query={this.state.query}
                           onSubmit={this.handleSubmit}
                           onChange={this.handleChange}
                />
                <TVShowList shows={this.state.shows}/>
            </div>
        );
    }
}

export default Search;
