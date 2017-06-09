import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

const TVShowListItem = (props) => (
    <article className="tv-show">
        <Link to={`/show/${props.id}`}>
            <img src={props.image} alt={props.title}/>
        </Link>
        <div className="tv-show-info">
            <h3><Link to={`/show/${props.id}`}>{props.title}</Link></h3>
            <h4>{props.language}, {props.premiered}</h4>
        </div>
    </article>
);

TVShowListItem.PropTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    premiered: PropTypes.string.isRequired,
};

export default TVShowListItem;
