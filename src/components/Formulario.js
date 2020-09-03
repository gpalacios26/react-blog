import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroreRef = React.createRef();

    state = {
        user: {}
    };

    recibirFormulario = (e) => {
        e.preventDefault();

        var genero;
        if (this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value;
        } else if (this.generoMujerRef.current.checked) {
            genero = this.generoMujerRef.current.value;
        } else {
            genero = this.generoOtroreRef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        };

        this.setState({
            user: user
        });
    }

    render() {
        return (
            <div id="formulario">
                <div className="center">
                    <section id="content">
                        <h2 className="subheader">Formulario</h2>

                        {
                            this.state.user.nombre && this.state.user.apellidos &&
                            <div id="user-data">
                                <p>Nombre: <strong>{this.state.user.nombre}</strong></p>
                                <p>Apellidos: <strong>{this.state.user.apellidos}</strong></p>
                            </div>
                        }

                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>
                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} /> Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} /> Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoOtroreRef} /> Otro
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Formulario;