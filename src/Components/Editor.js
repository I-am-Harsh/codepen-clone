import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';


const Editor = (props) => {
    const { title, language, code } = props;

    const handleChange = () => {
        props.handleCodeChange(language, code);
        // console.log(code);
    }


    return(
        <div className = 'editor-container'>
            <div className = 'editor-header pl-2'>
                {title}
                <button className = 'button'>X</button>
            </div>
            <div className = 'editor-body'>
                <ControlledEditor
                    onBeforeChange = {handleChange}
                    
                    className = 'code-mirror-wrapper'
                    value = {code}
                    options = {{
                        lineWrapping : true,
                        lint : true,
                        mode : language,
                        lineNumbers : true,
                        theme : "material"
                    }}
                />
            </div>
        </div>
    )
}

export default Editor;