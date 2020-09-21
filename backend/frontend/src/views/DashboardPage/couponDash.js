import React, { Component } from 'react'
import Menu from './Sections/Menu';
import Footer from './Sections/Footer';
import Coupons from './Coupons';


export default class dashboard extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Coupons />
                <Footer/>
            </div>
        )
    }
}
