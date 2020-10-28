import React from 'react';


const Output = (props) => {
    const { html = "<p>Use the editor</p>", css, js} = props;

    const srcDoc = `
        <html>
            <head>
                <style>
                    ${css}
                </style>
            </head>
            <body>
                ${html}
                <script>
                    ${js}
                </script>
            </body>
        </html>
    `
    
    return(
        <iframe
            srcDoc = {srcDoc}
            title = 'Output'
            height = "100%"
            width = "100%"
            sandbox = 'allow-scripts'
            frameBorder = "0"
        />
    )
}

export default Output;