import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Error extends Component {
    render() {
        return (
            <div id="pagina-error">
                <Slider title="Página" size="slider-small"></Slider>
                <div className="center">
                    <section id="content">
                        <h2 className="subheader">Página no encontrada</h2>
                        <p>La página ingresada no existe en la web</p>
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Error;