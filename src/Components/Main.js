import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import  debounce  from "lodash/debounce";
import { ToastContainer, toast } from 'react-toastify';

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

        // connecting to server
        socket = io.connect(process.env.REACT_APP_API || window.location.hostname + ":9000", {
            reconnectionDelay : 10000,
            reconnectionAttempts : 10,
            reconnectionDelayMax : 20000,
            randomizationFactor : .5
        });
    }

    // used qwhen updating from db upon joining old channel
    updatedFromDB = (xml, css, js) => {
        this.setState({
            xml : xml,
            css : css,
            js : js
        })
    }

    // debounced function for updating srcDoc
    handleCodeChange = (lang, code, emit) => {
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
        // show toast;
        // when someone joins your code channel
        socket.on('user joined', number => {
            // console.log(number);
            return toast.warning(`There are ${number} people here`);
        })

        // when connection failed
        this.errShown = false;
        socket.on('connect_error', () => {
            if(!this.errShown){
                this.errShown = true;
                return toast.error("Conenction to server failed");
            }
        });

        // if the server connection gets severed
        socket.on('disconnect', () => {
            return toast.error('Disconnected from server');
        })

        // reconnect true toast
        socket.on('reconnect', () => {
            return toast.success('Reconnected to server');
        })

        // when trying to reconenct
        socket.on("reconnect_attempt", () => {
            return toast.warning('Attempting to reconnect');
        })

        // send code when exiting
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
               <ToastContainer limit = {1} autoClose = {3500} />
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
