import React from 'react';

const LoginField = ({ label, type, placeholder, value, onChange, name }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                name={name}
                required 
            />
        </div>
    );
};

export default LoginField;