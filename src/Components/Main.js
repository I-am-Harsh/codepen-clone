import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ResizableBox, Resizable } from 'react-resizable';
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
        switch(true){
            case (lang === 'xml'):
                console.log("inside");
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

        this.socket.emit('update code', (this.url, xml, css, js))
    }

    componentDidMount(){
        // current window url
        this.url = window.location.pathname.substr(6);

        // dial connection
        this.socket = io.connect(process.env.REACT_APP_API || window.location.hostname + ":9000");

        // check url with server
        this.socket.emit('checkUrl', window.location.pathname.substr(6))

        // get updated code - 
        this.socket.on('updated code', (xml, css, js) => {
            this.setState({
                xml : xml,
                css : css,
                js : js
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
                            <Editor handleCodeChange = {this.debounceChange} language = "xml" title = "HTML" code = {xml}/>
                            <div className = 'resizer'></div>
                            <Editor handleCodeChange = {this.handleCodeChange} language = 'css' title = "CSS" code = {css} />
                            <div className = 'resizer'></div>
                            <Editor handleCodeChange = {this.handleCodeChange} language = 'js' title = "JS" code = {js} />
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