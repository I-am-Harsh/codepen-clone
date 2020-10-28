import React, { Component } from "react";
import Editor from "./Editor";
import Output from "./Output";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xml : '',
            css : '',
            js : ''
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
            <div>
                <div className = 'editor'>
                    <Editor handleCodeChange = {this.handleCodeChange} language = "xml" title = "HTML" code = {xml}/>
                    <Editor handleCodeChange = {this.handleCodeChange} language = 'css' title = "CSS" code = {css} />
                    <Editor handleCodeChange = {this.handleCodeChange} language = 'js' title = "JS" code = {js} />
                </div>
                <div className = 'output'>
                    <Output/>
                </div>
            </div>
        )
    }
}

export default Main;