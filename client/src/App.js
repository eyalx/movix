import React, { Component } from 'react';
import Movies from './components/Movies';
import Modal from './components/Modal';
import Search from './components/Search';
import './App.scss';


class App extends Component{

    constructor(props){
        super(props);
        this.state = {
          trandingMovies: [],
          nowPlaying: []
        }
    }
    
    componentDidMount(){
        fetch('/api/movies/trending')
            .then(res => res.json())
            .then(trandingMovies => this.setState({ trandingMovies }));

        fetch('/api/movies/now-playing')
            .then(res => res.json())
            .then(nowPlaying => this.setState({ nowPlaying }));  
    }

    render() {
        const modalContent = ( <Search /> );
        
        const modalProps = {
            triggerElement: <i className="fas fa-search"></i>
        };

        return <div id="container">
                    <header id="header" className="header">
                        <div className="logo">movix</div>                        
                        <Modal { ...modalProps } >{ modalContent }</Modal>
                    </header>
                    <main className="main">
                        <section className="promo"></section>
                        <section className="content">
                            <div className="strip">
                                <h2>New Releases</h2>
                                <Movies slider={ true } movies={ this.state.nowPlaying } />
                            </div>
                            <div className="strip">
                                <h2>Trending</h2>
                                <Movies slider={ true } movies={ this.state.trandingMovies } />
                            </div>
                        </section>
                    </main>
                    <footer className="footer"></footer>
                </div>;
    }
}

export default App;

window.onload = function(){
    window.onscroll = function() { handler() };

    var header = document.getElementById("header");
    var sticky = header.offsetTop;

    function handler() {
        window.pageYOffset > sticky ?
            header.classList.add("fixed") :
            header.classList.remove("fixed");
    }
}