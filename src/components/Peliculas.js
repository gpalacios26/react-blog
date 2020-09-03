import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Pelicula from './Pelicula';

class Peliculas extends Component {

    state = {
        peliculas: [
            { title: 'Spiderman 4', image: 'https://wipy.tv/wp-content/uploads/2020/03/venom-apareceria-en-spider-man-4.jpg' },
            { title: 'Los Vengadores Endgame', image: 'https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/OF2GHTEXJFBSVNCTNCUES4ESAQ.jpg' },
            { title: 'Batman vs Superman', image: 'https://i.ytimg.com/vi/Vzi5Q5aIGJU/maxresdefault.jpg' }
        ],
        nombre: 'Gregory Palacios',
        favorita: {}
    }

    favorita = (pelicula) => {
        this.setState({
            favorita: pelicula
        });
    }

    render() {
        return (
            <div id="peliculas">
                <Slider title="Películas" size="slider-small"></Slider>
                <div className="center">
                    <section id="content">
                        <h2 className="subheader">Listado de Películas</h2>
                        <p>Selección de las películas favoritas de {this.state.nombre}</p>
                        {
                            this.state.favorita.title &&
                            <p>Mi película favorita es: <span>{this.state.favorita.title}</span></p>
                        }
                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula key={i} pelicula={pelicula} marcarFavorita={this.favorita}></Pelicula>
                                    )
                                })
                            }
                        </div>
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Peliculas;