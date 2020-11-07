import React from 'react';
import { Controlled } from 'react-codemirror2';

import { xml, css } from '../basicCode';
import { socket } from './Main';

// 8120100314
class Editor extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            xml : xml,
            css : css,
            js : ""
        }
    }
 

    // for updating local state
    handleChange = (editor, data, value) => {
        if(editor.options.mode === 'xml'){
            this.setState({xml : value});
        }
        else if(editor.options.mode === 'css'){
            this.setState({css : value});
        }
        else{
            this.setState({js : value})
        }
        const emit = true;
        // for output
        this.props.handleCodeChange(editor.options.mode, value, emit);
    }

    componentDidMount(){
        // check url with server
        socket.emit('checkUrl', window.location.pathname.substr(6));


        // joined old
        socket.on('joined old', result => {
            const {xml, js, css} = result
            this.setState({
                js : js,
                xml : xml,
                css : css
            })
            // updating code from db
            this.props.updatedFromDB(xml, css, js);
        })


        // individual on for updated code and then sedning to src
        socket.on('updated xml', data => {
            this.setState({
                xml : data.code
            })
            this.props.handleCodeChange("xml", data.code, false);
        })

        socket.on('updated css', data => {
            this.setState({
                css : data.code
            })
            this.props.handleCodeChange("css", data.code, false);
        })

        socket.on('updated js', data => {
            this.setState({
                js : data.code
            })
            this.props.handleCodeChange("js", data.code, false);
        })

    }

    render(){
        // const {title, language} = this.props;
        const { xml, css, js } = this.state;
        return(
            <React.Fragment>
                <div className = "editor-container">
                    <div className = 'editor-header pl-3'>
                        HTML
                    </div>
                    <div className = 'editor-body'> 
                        <Controlled 
                            onBeforeChange = {(editor, data, value) => this.handleChange(editor, data, value)}
                            className = 'code-mirror-wrapper'
                            options = {{
                                lineWrapping : true,
                                lint : true,
                                mode : "xml",
                                lineNumbers : true,
                                theme : "material"
                            }}
                            value = {xml}
                        />
                    </div>
                </div>
                <div className = "editor-container">
                    <div className = 'editor-header pl-3'>
                        CSS
                    </div>
                    <div className = 'editor-body'> 
                        <Controlled
                            onBeforeChange = {(editor, data, value) => this.handleChange(editor, data, value)}
                            className = 'code-mirror-wrapper'
                            options = {{
                                lineWrapping : true,
                                lint : true,
                                mode : "css",
                                lineNumbers : true,
                                theme : "material"
                            }}
                            value = {css}
                        />
                    </div>
                </div>
            <div className = "editor-container">
                <div className = 'editor-header pl-3'>
                    JS
                </div>
                <div className = 'editor-body'> 
                    <Controlled
                        onBeforeChange = {(editor, data, value) => this.handleChange(editor, data, value)}
                        className = 'code-mirror-wrapper'
                        options = {{
                            lineWrapping : true,
                            lint : true,
                            mode : "js",
                            lineNumbers : true,
                            theme : "material"
                        }}
                        value = {js}
                    />
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default Editor;