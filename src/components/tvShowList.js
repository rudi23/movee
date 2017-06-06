import React from 'react';
import PropTypes from 'prop-types';
import TVShow from './tvShow';

class TVShowList extends React.Component {
    render() {
        const shows = this.props.shows.slice();

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
        );
    }
}

TVShowList.PropTypes = {
    shows: PropTypes.array.isRequired
};

export default TVShowList;
