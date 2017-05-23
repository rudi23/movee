import React from 'react';
import TVShow from './tv-show';

const TVShowList = (props) => {
    const shows = props.shows.slice();

    return (
        <section>
            {shows.map((show, i) => {
                return <TVShow key={i} {...show} />
            })}
        </section>
    )
};

export default TVShowList;
