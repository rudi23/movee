import React from 'react';
import PropTypes from 'prop-types';
import TVShowListItem from './tvShowListItem';

const TVShowList = ({ shows }) => (
  <section>
    { shows.map(show =>
      <TVShowListItem key={show.id} {...show} />
    ) }
  </section>
);

TVShowList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TVShowList;
