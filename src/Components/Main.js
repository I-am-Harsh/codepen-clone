import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { ResizableBox, Resizable } from 'react-resizable';
import io from 'socket.io-client';
import  debounce  from "lodash/debounce";

import Editor from "./Editor";
import Output from "./Output";
import Landing from './Landing';
import Test from "./TestComp";

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
        console.log('fucntion called');
        switch(true){
            case (lang === 'xml'):
                this.setState({
                    xml : code
                })
                break;

            case (lang === 'css'):
                this.setState({
                    css : code
                })
                break;

            case (lang === 'js'):
                this.setState({
                    js : code
                })
                break;

            default :
                console.log('default');
                break;
        }

        const { xml, css, js } = this.state;
        // console.log(xml);
        const url = this.url;
        this.socket.emit('update code', ({url, xml, css, js}))
    }

    componentDidMount(){
        // current window url
        this.url = window.location.pathname.substr(6);

        // dial connection
        this.socket = io.connect(process.env.REACT_APP_API || window.location.hostname + ":9000");
        console.log(this.socket);

        // check url with server
        this.socket.emit('checkUrl', window.location.pathname.substr(6))

        // get updated code - 
        this.socket.on('updated code', (text) => {
            console.log(text);
            this.setState({
                xml : text.xml,
                css : text.css,
                js : text.js
            })
        })

    }


    render() {
        const { xml, css, js } = this.state;
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/' component = {(props) => <Landing {...props}/> }/>
                    <Route exact path = '/code/*'>
                    <div className = 'main'>
                        <div className = 'editor-outer'>
                            <Editor handleCodeChange = {this.debounceChange} language = "xml" title = "HTML" />
                            <Editor handleCodeChange = {this.debounceChange} language = 'css' title = "CSS" />
                            <Editor handleCodeChange = {this.debounceChange} language = 'js' title = "JS" />
                        </div>
                        <div className = 'output'>
                            <Output xml = {xml} css = {css} js = {js}/>
                        </div>
                    </div>
                    </Route>
                    <Route exact path = '/test' component = {Test}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;



steps -->
1. connect to socket
2. pass it down to each Editor
3. inside the editor, maintain state on the basis of language
4. emit separate code to individual lang channel