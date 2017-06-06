import React from 'react';
import PropTypes from 'prop-types';

class TVShowList extends React.Component {
    render() {
        return (
            <article className="tv-show">
                <img src={this.props.image} alt={this.props.title}/>
                <div className="tv-show-info">
                    <h3>{this.props.title}</h3>
                    <h5>{this.props.language}, {this.props.premiered}</h5>
                </div>
            </article>
        );
    }
}

TVShowList.PropTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    premiered: PropTypes.string.isRequired,
};

export default TVShowList;
