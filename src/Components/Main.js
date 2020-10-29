import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
    }

    handleCodeChange = (lang, code) => {
        console.log(code);
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

    }


    render() {
        const { xml, css, js } = this.state;
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/' component = {(props) => <Landing {...props}/> }/>
                    <Route exact path = '/code/*'>
                        <div className = 'main'>
                            <div className = 'editor'>
                                <Editor handleCodeChange = {this.handleCodeChange} language = "xml" title = "HTML" code = {xml}/>
                                <Editor handleCodeChange = {this.handleCodeChange} language = 'css' title = "CSS" code = {css} />
                                <Editor handleCodeChange = {this.handleCodeChange} language = 'js' title = "JS" code = {js} />
                            </div>
                            <div className = 'output'>
                                <Output xml = {xml} css = {css} js = {js}/>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;