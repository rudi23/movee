import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = props => (
  <div id="search-bar" className="row">
    <div className="col-md-8 col-md-offset-2">
      <div className="row">
        <form onSubmit={props.onSubmit} className="form">
          <div className="form-group col-md-9 col-xs-12">
            <div className="search-btn">
              <input
                type="text"
                className="form-control input-lg"
                value={props.query}
                onChange={props.onChange}
                placeholder="Type TV Show..."
              />
              {props.query ?
                (
                  <span
                    role="button"
                    tabIndex={-1}
                    className="search-btn__clear glyphicon glyphicon-remove-circle"
                    onClick={props.resetQuery}
                  />
                ) : null
              }
            </div>
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
  resetQuery: PropTypes.func.isRequired,
};

export default SearchBar;
