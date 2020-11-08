import React from "react";
import random from '../urlGenerator';



const Landing = (props) => {

    const buttonClick = () => {
        const randomUrl = random();
        props.history.push(`/code/${randomUrl}`);
    }

    return (
        <div>
            <div className="header">
                <h1>Web Editor</h1>
                <p>Develop website on the go</p>
                    <button className = 'btn button-1' onClick = {buttonClick}>
                    Start Coding
                </button>
            </div>
            <div className="content">
                <h2>Features</h2>
                <ul>
                    <li>Create HTML, CSS, JS documents on the fly</li>
                    <li>See your changes in real time without refresh</li>
                    <li>Show your work to friends in real time.</li>
                    <li>Your progress is saved when you leave the site.</li>
                    <li>Create your own custom link or just tap start coding</li>
                </ul>
            </div>
        </div>
    );
};

export default Landing;
