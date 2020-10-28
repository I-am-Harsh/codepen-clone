import React from 'react';
import { Controlled as ControlledEditor, UnControlled } from 'react-codemirror2';
import debounce from 'lodash/debounce';


const Editor = (props) => {
    const { title, language, code } = props;

    // console.log(language);

    const handleChange = (editor, data, value) => {
        props.handleCodeChange(language, value);
    }



    return(
        <div className = 'editor-container'>
            <div className = 'editor-header pl-2'>
                {title}
                <button className = 'button'>X</button>
            </div>
            <div className = 'editor-body'>
                {/* <ControlledEditor
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
                /> */}
                <UnControlled
                    onChange = {debounce(handleChange, 750)}
                    className = 'code-mirror-wrapper'
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