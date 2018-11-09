import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onChange, onSubmit, query, resetQuery }) => (
  <div className="row" id="search-bar">
    <div className="col-md-8 col-md-offset-2">
      <div className="row">
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group col-md-9 col-xs-12">
            <div className="search-btn">
              <input
                className="form-control input-lg"
                onChange={onChange}
                placeholder="Type TV Show..."
                type="text"
                value={query}
              />
              {query ? (
                <span
                  className="search-btn__clear glyphicon glyphicon-remove-circle"
                  onClick={resetQuery}
                  onKeyPress={resetQuery}
                  role="button"
                  tabIndex={-1}
                />
              ) : null}
            </div>
          </div>
          <div className="form-group col-md-3 col-xs-12">
            <button className="btn btn-default btn-primary btn-lg col-xs-12" title="Search" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  resetQuery: PropTypes.func.isRequired,
};

export default SearchBar;
