import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';

class CreateArticle extends Component {

    titleRef = React.createRef();
    contentRef = React.createRef();

    url = Global.url;

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();
        this.changeState();

        if (this.validator.allValid()) {
            // Hacer la petición http por post
            axios.post(this.url + 'save', this.state.article).then(res => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'waiting'
                    });

                    // Mostrar mensaje
                    swal({
                        title: 'Artículo creado',
                        text: 'El artículo se ha creado correctamente',
                        icon: 'success'
                    });

                    // Subir imagen
                    if (this.state.selectedFile !== null) {
                        var articleId = this.state.article._id;

                        // Crear Form Data y añadir archivo
                        const formData = new FormData();
                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );

                        // Hacer la pettición http por post
                        axios.post(this.url + 'upload-image/' + articleId, formData).then(res => {
                            if (res.data.article) {
                                this.setState({
                                    article: res.data.article,
                                    status: 'success'
                                });
                            } else {
                                this.setState({
                                    status: 'failed'
                                });
                            }
                        });
                    } else {
                        this.setState({
                            status: 'success'
                        });
                    }
                } else {
                    this.setState({
                        status: 'failed'
                    });
                }
            }).catch(err => {
                this.setState({
                    status: 'failed'
                });
            });
        } else {
            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    changeFile = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render() {

        if (this.state.status === 'success') {
            return (<Redirect to={'/blog'}></Redirect>);
        }

        return (
            <div id="create-articulo">
                <div className="center">
                    <section id="content">
                        <h2 className="subheader">Crear Artículo</h2>
                        <form className="mid-form" onSubmit={this.saveArticle} onChange={this.changeState}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" ref={this.titleRef} />

                                {this.validator.message('title', this.state.article.title, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" ref={this.contentRef}></textarea>

                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.changeFile} />
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default CreateArticle;