import React from 'react';

const SearchBar = (props) => (
    <div id="search-bar" className="row">
        <div className="col-md-8 col-md-offset-2">
            <div className="row">
                <form onSubmit={props.onSubmit}>
                    <div className="col-md-10">
                        <input type="text"
                               className="form-control input-lg"
                               value={props.query}
                               onChange={props.onChange}
                               placeholder="Type TV Show..."/>
                    </div>
                    <div className="col-md-2">
                        <button
                            type="submit"
                            className="btn btn-default btn-primary btn-lg"
                            title="Search"
                        >Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

export default SearchBar;
