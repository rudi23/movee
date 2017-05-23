import React, {Component} from 'react';
import SearchBar from './search-bar';
import MovieList from './movie-list';

class Search extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="row">
                <SearchBar />
                <MovieList />
            </div>
        );
    }
}

export default Search;
