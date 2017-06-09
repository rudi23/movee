import React from 'react';
import PropTypes from 'prop-types';
import TVShowListItem from './tvShowListItem';

const renderList = (shows, query, routerQuery, loading) => {
    if (!shows.length && routerQuery === query && loading === false) {
        return <div>Sorry, we could not find anything that matches "{query}".</div>
    }

    return shows.map(show => {
        return <TVShowListItem key={show.id} {...show} />
    });
};

const TVShowList = ({ shows, query, routerQuery, loading } ) => (
    <div id="tv-show-list" className="row">
        <div className="col-md-12">
            <section>
                { renderList(shows, query, routerQuery, loading) }
            </section>
        </div>
    </div>
);

TVShowList.PropTypes = {
    shows: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    routerQuery: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
};

export default TVShowList;
