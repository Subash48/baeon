import React, { Component } from 'react'
import Menu from './Sections/Menu';
import Footer from './Sections/Footer';
import Body from './Sections/Body';

export default class dashboard extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}
