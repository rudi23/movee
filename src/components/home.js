import React, {Component} from 'react';
import SearchBar from './searchBar';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit(event) {
        const query = this.state.query;
        if (query.trim() !== '') {
            this.setState({query: ''});
            this.props.history.push('/search/' + query);
        }

        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <h1>Home</h1>
                <SearchBar query={this.state.query}
                           onChange={this.handleChange}
                           onSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

export default Home;
