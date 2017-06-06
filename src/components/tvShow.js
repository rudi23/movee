import React from 'react';

const TVShowList = (props) => (
    <article className="tv-show">
        <img src={props.image} alt={props.title}/>
        <div className="tv-show-info">
            <h3>{props.title}</h3>
            <h5>{props.language}, {props.premiered}</h5>
        </div>
    </article>
);

export default TVShowList;
