import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TVShowListItem from './tvShowListItem';

class TVShowList extends Component {
    renderList() {
        const shows = this.props.shows.slice();

        if (shows.length === 0 && this.props.routerQuery === this.props.query && this.props.loading === false) {
            return <div>Sorry, we couldn't find anything that matches "{this.props.query}".</div>
        }

        return shows.map(show => {
            return <TVShowListItem key={show.id} {...show} />
        });
    }

    render() {
        const list = this.renderList();
        return (
            <div id="tv-show-list" className="row">
                <div className="col-md-12">
                    <section>
                        {list}
                    </section>
                </div>
            </div>
        );
    }
}

TVShowList.PropTypes = {
    shows: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired
};

export default TVShowList;
