import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// Importar componentes plantilla
import Header from './components/Header';
import Footer from './components/Footer';
// Importar componentes rutas
import Home from './components/Home';
import Blog from './components/Blog';
import Article from './components/Article';
import Formulario from './components/Formulario';
import Peliculas from './components/Peliculas';
import SeccionPruebas from './components/SeccionPruebas';
import Search from './components/Search';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';
import Error from './components/Error';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header></Header>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/home" component={Home}></Route>
                    <Route exact path="/blog" component={Blog}></Route>
                    <Route exact path="/blog/articulo/:id" component={Article}></Route>
                    <Route exact path="/blog/crear" component={CreateArticle}></Route>
                    <Route exact path="/blog/editar/:id" component={EditArticle}></Route>
                    <Route exact path="/blog/busqueda/:search" component={Search}></Route>
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            var search = props.match.params.search;
                            return (<Redirect to={'/blog/busqueda/' + search}></Redirect>);
                        }
                    }></Route>
                    <Route exact path="/formulario" component={Formulario}></Route>
                    <Route exact path="/peliculas" component={Peliculas}></Route>
                    <Route exact path="/pagina-pruebas" component={SeccionPruebas}></Route>
                    <Route component={Error}></Route>
                </Switch>
                <Footer></Footer>
            </BrowserRouter>
        );
    }
}

export default Router;