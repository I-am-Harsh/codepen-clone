import React from "react";

const Landing = (props) => {
    return (
        <div>
            <div class="landing-header">
                <h1>Real Time Web Editor</h1>
                <p>Develop website on the go</p>
            </div>
            <div class="landing-content">
                <h2>Features</h2>
                <ul>
                    <li>Create HTML, CSS, JS documents on the fly</li>
                    <li>See your changes in real time without refresh</li>
                    <li>When you are done download the code</li>
                </ul>
            </div>
        </div>
    );
};


export default Landing;