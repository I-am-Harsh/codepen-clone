import React from 'react';
import { Controlled } from 'react-codemirror2';


import { xml, css } from '../basicCode';

// 8120100314
class Editor extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title : props.title,
            code : ""
        }
    }
    // const { title, language } = props;
    code = () => {
        const { language } = this.props;
        if(language === "xml"){
            this.setState({
                code : xml
            })
        }
        else if(language === "css"){
            this.setState({
                code : css
            })
        }
    } 

    handleChange = (editor, data, value) => {
        this.setState({
            code : value
        })

        // for output
        this.props.handleCodeChange(this.props.language, value);
    }

    componentDidMount(){
        this.code();
    }

    render(){
        const {title, language} = this.props;
        const { code } = this.state;
        return(
            <div className = "editor-container">
                <div className = 'editor-header pl-3'>
                    {title}
                    {/* <button className = 'button' onClick = {minimize}>-</button> */}
                </div>
                <div className = 'editor-body'>
                    <Controlled
                        onBeforeChange = {(editor, data, value) => this.handleChange(editor, data, value)}
                        className = 'code-mirror-wrapper'
                        options = {{
                            lineWrapping : true,
                            lint : true,
                            mode : language,
                            lineNumbers : true,
                            theme : "material"
                        }}
                        value = {code}
                    />
                </div>
            </div>
        )
    }
}

export default Editor;