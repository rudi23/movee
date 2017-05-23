import React from 'react';

const SearchBar = (props) => {
    return (
        <div>
            <input type="text" value={props.query} />
            <button className="search-btn" title="Search">Search</button>
        </div>
    )
};

export default SearchBar;
