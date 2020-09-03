import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../Global';
import imagenDefault from '../assets/images/default.jpg';
import Sidebar from './Sidebar';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentDidMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;
        axios.get(this.url + 'article/' + id).then(res => {
            this.setState({
                article: res.data.article,
                status: 'success'
            });
        }).catch(err => {
            this.setState({
                article: false,
                status: 'success'
            });
        });
    }

    deleteArticle = (id) => {
        swal({
            title: 'Alerta',
            text: 'Deseas eliminar el registro seleccionado?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url + 'article/' + id).then(res => {
                    this.setState({
                        article: res.data.article,
                        status: 'deleted'
                    });
                    // Mostrar mensaje
                    swal({
                        title: 'Artículo eliminado',
                        text: 'El artículo se ha eliminado correctamente',
                        icon: 'success'
                    });
                });
            }
        });
    }

    render() {

        if (this.state.status === 'deleted') {
            return (<Redirect to={'/blog'}></Redirect>);
        }

        var article = this.state.article;
        return (
            <div id="article">
                <div className="center">
                    <section id="content">
                        {
                            article &&
                            <article className="article-item article-detail">
                                <div className="image-wrap">
                                    {
                                        article.image !== null ?
                                            (
                                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                            ) : (
                                                <img src={imagenDefault} alt={article.title} />
                                            )
                                    }
                                </div>
                                <h1 className="subheader">{article.title}</h1>
                                <span className="date">
                                    <Moment fromNow>{article.date}</Moment>
                                </span>
                                <p>{article.content}</p>

                                <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>
                                <Link onClick={
                                    () => {
                                        this.deleteArticle(article._id);
                                    }
                                } className="btn btn-danger">Eliminar</Link>

                                <div className="clearfix"></div>
                            </article>
                        }
                        {
                            !article && this.state.status === 'success' &&
                            <article className="article-item article-detail">
                                <h2 className="subheader">Artículo no encontrado</h2>
                                <p>El artículo ingresado no existe en la web</p>
                            </article>
                        }
                        {
                            this.state.status === null &&
                            <article className="article-item article-detail">
                                <h2 className="subheader">Cargando...</h2>
                            </article>
                        }
                    </section>
                    <Sidebar blog="true"></Sidebar>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Article;