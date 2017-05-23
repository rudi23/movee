import React, {Component} from 'react';
import SearchBar from './search-bar';
import TVShowList from './tv-show-list';
import showRepository from '../repository/tvShowRepository';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            shows: [],
        };
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit(event) {
        showRepository.search(this.state.query).then(shows => this.setState({shows: shows}));
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <SearchBar query={this.state.query}
                           onSubmit={(e) => this.handleSubmit(e)}
                           onChange={(e) => this.handleChange(e)}
                />
                <TVShowList shows={this.state.shows} />
            </div>
        );
    }
}

export default Search;
