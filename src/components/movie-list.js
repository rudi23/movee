import React from 'react';

const MovieList = (props) => {
    return (
        <section>
            <article className="row" key={0}>Movie 1</article>
            <article className="row" key={1}>Movie 2</article>
            <article className="row" key={2}>Movie 3</article>
            <article className="row" key={3}>Movie 4</article>
            <article className="row" key={4}>Movie 5</article>
        </section>
    )
};

export default MovieList;
