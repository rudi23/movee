import React, {Component} from 'react';
import showRepository from '../repository/tvShowRepository';

class TVShow extends Component {
    constructor() {
        super();
        this.state = {
            show: null,
        };
    }

    componentWillMount() {
        const showId = this.props.match.params.showId;
        showRepository.findById(showId).then(show => this.setState({show: show}));
    }

    renderShow() {
        const show = this.state.show;
        if (!show) {
            return <article className="tv-show"/>;
        }

        return (
            <article className="tv-show">
                <img src={show.image} alt={show.title}/>
                <div className="tv-show-info">
                    <h3>{show.title}</h3>
                    <h5>{show.language}, {show.premiered}</h5>
                </div>
            </article>
        );
    }

    render() {
        const show = this.renderShow();

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="row">
                        { show }
                    </div>
                </div>
            </div>
        );
    }
}

export default TVShow;
