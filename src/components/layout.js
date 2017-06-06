import React from 'react';

import Menu from "./menu";
import Search from "./search";
import Footer from "./footer";

const Layout = (props) => (
    <div>
        <Menu/>
        <Search/>
        <Footer/>
    </div>
);

export default Layout;
