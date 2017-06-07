import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

    componentWillMount() {
        if (this.props.match.params.query !== undefined) {
            const query = this.props.match.params.query;
            this.setState({query: query});
            showRepository.search(query).then(shows => this.setState({shows: shows}));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.query === undefined) {
            this.setState({query: '', shows: []});
        }
    }

    handleChange(event) {
        this.setState({query: event.target.value.trim()});
    };

    handleSubmit(event) {
        const query = this.state.query;
        if (query.trim() !== '') {
            showRepository.search(query)
                .then(shows => this.setState({shows: shows}))
                .then(() => this.props.history.push('/search/' + query));
        }
        event.preventDefault();
    };

    render() {
        return (
            <div className="container">
                <h1>Search</h1>
                <SearchBar query={this.state.query}
                           onSubmit={this.handleSubmit}
                           onChange={this.handleChange}
                />
                <TVShowList shows={this.state.shows}
                            query={this.state.query}
                />
            </div>
        );
    }
}

Search.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired,
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default Search;
