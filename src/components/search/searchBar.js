import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => (
    <div id="search-bar" className="row">
        <div className="col-md-8 col-md-offset-2">
            <div className="row">
                <form onSubmit={props.onSubmit} className="form">
                    <div className="form-group col-md-9 col-xs-12">
                        <input type="text"
                               className="form-control input-lg"
                               value={props.query}
                               onChange={props.onChange}
                               placeholder="Type TV Show..."/>
                    </div>
                    <div className="form-group col-md-3 col-xs-12">
                        <button
                            type="submit"
                            className="btn btn-default btn-primary btn-lg col-xs-12"
                            title="Search"
                        >Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

SearchBar.propTypes = {
    query: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SearchBar;
