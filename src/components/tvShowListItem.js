import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

class TVShowListItem extends Component {
    render() {
        return (
            <article className="tv-show">
                <img src={this.props.image} alt={this.props.title}/>
                <div className="tv-show-info">
                    <h3><Link to={`/show/${this.props.id}`}>{this.props.title}</Link></h3>
                    <h4>{this.props.language}, {this.props.premiered}</h4>
                </div>
            </article>
        );
    }
}

TVShowListItem.PropTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    premiered: PropTypes.string.isRequired,
};

export default TVShowListItem;
