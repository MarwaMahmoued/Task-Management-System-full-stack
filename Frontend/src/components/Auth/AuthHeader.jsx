import React from 'react';

const AuthHeader = ({ title, subtitle }) => {
    return (
        <div className="auth-header">
           
            <h1>{title}</h1>
            
         
            <p className="hint">{subtitle}</p>
            
            
            <div className="header-divider"></div>
        </div>
    );
};

export default AuthHeader;