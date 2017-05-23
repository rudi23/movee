import React from 'react';

const TVShowList = (props) => {
    const image = props.image && props.image.medium ? props.image.medium : '//static.tvmaze.com/images/no-img/no-img-portrait-text.png';

    return (
        <article className="tv-show">
            <img src={image} alt={props.title} />
            <div className="tv-show-info">
                <h3>{props.title}</h3>
                <h5>{props.language}, {props.premiered}</h5>
            </div>
        </article>
    )
};

export default TVShowList;
