import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';

class SeccionPruebas extends Component {
    render() {
        return (
            <div id="pagina-pruebas">
                <Slider title="Página" size="slider-small"></Slider>
                <div className="center">
                    <section id="content">
                        <h2 className="subheader">Página de pruebas</h2>
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default SeccionPruebas;