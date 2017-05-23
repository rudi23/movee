import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Menu from "./components/menu";
import Search from "./components/search";
import Footer from "./components/footer";

ReactDOM.render(
    <div>
        <Menu />
        <Search />
        <Footer />
    </div>,
    document.getElementById('root')
);
