import React, {Component} from 'react';
import SearchBar from './search-bar';
import TVShowList from './tv-show-list';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: 'Prison',
            shows: [
                {
                    title: 'Prison Break',
                    language: 'English',
                    premiered: '2005-08-29',
                    image: {
                        medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/104/261035.jpg',
                        original: 'http://static.tvmaze.com/uploads/images/original_untouched/104/261035.jpg'
                    },
                },
                {
                    title: 'Prison Woman',
                    language: 'English',
                    premiered: '2011-02-13',
                    image: {
                        medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/33/84701.jpg',
                        original: 'http://static.tvmaze.com/uploads/images/original_untouched/33/84701.jpg'
                    },
                }
            ],
        };
    }

    render() {
        return (
            <div className="container">
                <SearchBar query={this.state.query} />
                <TVShowList shows={this.state.shows} />
            </div>
        );
    }
}

export default Search;
