import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {
    render() {
        return (
            <div id="blog">
                <Slider title="Blog" size="slider-small"></Slider>
                <div className="center">
                    <section id="content">
                        <h2 className="subheader">Listado de Artículos</h2>
                        <Articles></Articles>
                    </section>
                    <Sidebar blog="true"></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Blog;