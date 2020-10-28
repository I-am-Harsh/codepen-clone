import React from 'react';


const Output = (props) => {
    const { xml = "<h1>Use Editor</h1>", css = "", js = ""} = props;
    console.log(xml);
    const srcDoc = `
        <html>
            <head>
                <style>
                    ${css}
                </style>
            </head>
            <body>
                ${xml}
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