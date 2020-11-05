import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import  debounce  from "lodash/debounce";

import Editor from "./Editor";
import Output from "./Output";
import Landing from './Landing';

import {css, xml} from '../basicCode';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xml : xml,
            css : css,
            js : undefined
        }
        this.debounceChange = debounce(this.handleCodeChange, 500);
    }


    handleCodeChange = (lang, code) => {
        const data = {};
        data.code = code;
        data.url = this.url;

        switch(true){
            case (lang === 'xml'):
                this.setState({
                    xml : code
                })
                this.socket.emit('xml', data);
                break;

            case (lang === 'css'):
                this.setState({
                    css : code
                })
                this.socket.emit('css', data);
                break;

            case (lang === 'js'):
                this.setState({
                    js : code
                })
                this.socket.emit('js', data);
                break;

            default :
                console.log('default');
                break;
        }

        // const { xml, css, js } = this.state;
        // const url = this.url;
        // this.socket.emit('update code', ({url, xml, css, js}))
    }

    componentDidMount(){
        // current window url
        this.url = window.location.pathname.substr(6);

        // dial connection
        this.socket = io.connect(process.env.REACT_APP_API || window.location.hostname + ":9000", {
            reconnectionDelay : 5000
        });

        // on disconnect
        this.socket.on('disconnect', () => {
            alert('Connection to the server lost');
        })

        this.socket.on('xml', code => {
            this.setState({xml : xml});
        })
    }


    render() {
        console.log(this.socket);
        const { xml, css, js } = this.state;
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/' component = {(props) => <Landing {...props}/> }/>
                    <Route exact path = '/code/*' {...this.props} >
                        <div className = 'main'>
                            <div className = 'editor-outer'>
                                <Editor handleCodeChange = {this.debounceChange}  language = "xml" title = "HTML" />
                                <Editor handleCodeChange = {this.debounceChange}  language = 'css' title = "CSS" />
                                <Editor handleCodeChange = {this.debounceChange}  language = 'js' title = "JS" />
                            </div>
                            <div className = 'output'>
                                <Output xml = {xml} css = {css} js = {js}/>
                            </div>
                        </div>
                    </Route>
                    <Route path = '/test' render = {(props) => {
                        console.log(this.socket);
                        return(
                            <Editor socket = {this.socket}/>
                        )
                    }}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;



// steps -->
// 1. connect to socket
// 2. pass it down to each Editor
// 3. inside the editor, maintain state on the basis of language
// 4. emit separate code to individual lang channel