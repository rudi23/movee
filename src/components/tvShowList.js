import React from 'react';
import TVShow from './tvShow';

const TVShowList = (props) => {
    const shows = props.shows.slice();

    return (
        <div id="tv-show-list" className="row">
            <div className="col-md-12">
                <section>
                    {shows.map((show, i) => {
                        return <TVShow key={i} {...show} />
                    })}
                </section>
            </div>
        </div>
    )
};

export default TVShowList;
