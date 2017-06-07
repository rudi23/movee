import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Menu from "./menu";
import Home from "./home";
import Search from "./search";
import TVShow from "./tvShow";
import Footer from "./footer";
import NotFound from "./notFound";

const Layout = () => (
    <Router>
        <div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/search/:query" component={Search}/>
                <Route path="/search" component={Search}/>
                <Route path="/show/:showId" component={TVShow}/>
                <Route component={NotFound}/>
            </Switch>
            <Footer/>
        </div>
    </Router>
);

export default Layout;
