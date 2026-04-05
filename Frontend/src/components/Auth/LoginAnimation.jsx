import React from 'react';
import './LoginAnimation.css';

const LoginAnimation = () => {
    return (
        <div className="animation-container">
           
            <div className="glass-card">
                <div className="mock-task pink-glow"></div>
                <div className="mock-task green-glow"></div>
                <div className="mock-task yellow-glow"></div>
            </div>
            <div className="bg-glow"></div>
        </div>
    );
};

export default LoginAnimation;