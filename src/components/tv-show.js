import React from 'react';

const TVShowList = (props) => {
    return (
        <article className="show">
            <img src={props.image.medium} alt={props.title} />
            <div className="show-info">
                {props.title} - {props.premiered} - {props.language}
            </div>
        </article>
    )
};

export default TVShowList;
