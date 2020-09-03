import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import imagenDefault from '../assets/images/default.jpg';
import Sidebar from './Sidebar';

class EditArticle extends Component {

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

    componentDidMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id).then(res => {
            this.setState({
                article: res.data.article
            });
        });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
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
            axios.put(this.url + 'article/' + this.articleId, this.state.article).then(res => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'waiting'
                    });

                    // Mostrar mensaje
                    swal({
                        title: 'Artículo actualizado',
                        text: 'El artículo se ha actualizado correctamente',
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

        var article = this.state.article;
        return (
            <div id="create-articulo">
                <div className="center">
                    <section id="content">
                        <h2 className="subheader">Editar Artículo</h2>
                        {
                            this.state.article.title &&
                            <form className="mid-form" onSubmit={this.saveArticle} onChange={this.changeState}>
                                <div className="form-group">
                                    <label htmlFor="title">Titulo</label>
                                    <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} />

                                    {this.validator.message('title', this.state.article.title, 'required')}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Contenido</label>
                                    <textarea name="content" defaultValue={article.content} ref={this.contentRef}></textarea>

                                    {this.validator.message('content', this.state.article.content, 'required')}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="file0">Imagen</label>
                                    <div className="image-wrap">
                                        {
                                            article.image !== null ?
                                                (
                                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />
                                                ) : (
                                                    <img src={imagenDefault} alt={article.title} className="thumb" />
                                                )
                                        }
                                    </div>
                                    <input type="file" name="file0" onChange={this.changeFile} />
                                </div>
                                <div className="clearfix"></div>
                                <input type="submit" value="Guardar" className="btn btn-success" />
                            </form>
                        }
                        {
                            !this.state.article.title &&
                            <h2 className="subheader">Cargando...</h2>
                        }
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default EditArticle;