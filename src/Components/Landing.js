import React from "react";
import random from '../urlGenerator';



const Landing = (props) => {

    const buttonClick = () => {
        const randomUrl = random();
        props.history.push(`/code/${randomUrl}`);
    }

    return (
        <div>
            <div class="header">
                <h1>Web Editor</h1>
                <p>Develop website on the go</p>
                    <button className = 'btn button-1' onClick = {buttonClick}>
                    Start Coding
                </button>
            </div>
            <div class="content">
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
