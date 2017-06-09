import React from 'react';
import PropTypes from 'prop-types';
import TVShowListItem from './tvShowListItem';

const TVShowList = ({shows}) => (
    <section>
        { shows.map(show => {
            return <TVShowListItem key={show.id} {...show} />
        }) }
    </section>
);

TVShowList.PropTypes = {
    shows: PropTypes.array.isRequired
};

export default TVShowList;
