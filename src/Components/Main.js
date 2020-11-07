import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import  debounce  from "lodash/debounce";

import Editor from "./Editor";
import Output from "./Output";
import Landing from './Landing';

import {css, xml} from '../basicCode';

var socket;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xml : xml,
            css : css,
            js : undefined
        }
        this.debounceChange = debounce(this.handleCodeChange, 500);

        socket = io.connect(process.env.REACT_APP_API || window.location.hostname + ":9000", {
            reconnectionDelay : 5000
        });
    }

    updatedFromDB = (xml, css, js) => {
        this.setState({
            xml : xml,
            css : css,
            js : js
        })
    }

    handleCodeChange = (lang, code, emit) => {
        console.log('called code change')
        const data = {};
        data.code = code;
        data.url = window.location.pathname.substr(6);
        switch(true){
            case (lang === 'xml'):
                this.setState({
                    xml : code
                })
                if(emit){
                    socket.emit('xml', data);
                }
                break;

            case (lang === 'css'):
                this.setState({
                    css : code
                })
                if(emit){
                    socket.emit('css', data);
                }
                break;

            case (lang === 'js'):
                this.setState({
                    js : code
                })
                if(emit){
                    socket.emit('js', data);
                }
                break;

            default :
                break;
        }
    }

    componentDidMount(){
        // on disconnect
        socket.on('disconnect', () => {
            alert('Connection to the server lost');
        })

        // when someone joins your code channel
        // show toast;
        // send code
        const url = window.location.pathname.substr(6);
        window.onbeforeunload = () =>{
            socket.emit('closed', {code : this.state, url : url});
            return null;
        }
    }

    render() {
        const { xml, css, js } = this.state;
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/' component = {(props) => <Landing {...props}/> }/>
                    <Route exact path = '/code/*' {...this.props} >
                        <div className = 'main'>
                            <div className = 'editor-outer'>
                                <Editor handleCodeChange = {this.debounceChange} 
                                    recievedCode = {this.recievedCode}
                                    updatedFromDB = {this.updatedFromDB}
                                />
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
export { socket };
