import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Search extends Component {
    render() {
        var searched = this.props.match.params.search;

        return (
            <div id="search">
                <Slider title={'Búsqueda: ' + searched} size="slider-small"></Slider>
                <div className="center">
                    <section id="content">
                        <h2 className="subheader">Listado de Resultados</h2>
                        <Articles search={searched}></Articles>
                    </section>
                    <Sidebar blog="true"></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Search;