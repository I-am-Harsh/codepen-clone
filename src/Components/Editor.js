import React, { useState, useCallback, useEffect } from 'react';
import { UnControlled } from 'react-codemirror2';
import debounce from 'lodash/debounce';

// 8120100314
const Editor = (props) => {
    const { title, language, code } = props;

    const [className, setClassName]  = useState('editor-container');


    const minimize = () => {
        console.log('minimized');
        if(className === 'editor-container'){
            setClassName('editor-container-min')
        }
        else{
            setClassName('editor-container')
        }
    }

    const handleChange = (editor, data, value) => {
        props.handleCodeChange(language, value);
    }

    return(
        <div className = {className}>
            <div className = 'editor-header pl-3'>
                {title}
                <button className = 'button' onClick = {minimize}>X</button>
            </div>
            <div className = 'editor-body'>
                <UnControlled
                    onChange = {handleChange}
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

export default Editor;