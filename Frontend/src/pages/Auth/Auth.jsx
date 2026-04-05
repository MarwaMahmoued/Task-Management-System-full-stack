import React, { useState } from 'react';
import useAuthForm from '../../hooks/useAuthForm';
import AuthHeader from '../../components/Auth/AuthHeader';
import LoginField from '../../components/Auth/LoginField';
import LoginAnimation from '../../components/Auth/LoginAnimation';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { formData, loading, error, handleChange, handleSubmit } = useAuthForm(isLogin ? 'login' : 'signup');

    return (
        <div className="auth-page">
            <div className="auth-container">
               
                <div className="auth-form-side">
                    <AuthHeader 
                        title={isLogin ? "Welcome Back" : "Create Account"} 
                        subtitle={isLogin ? "Please enter your details to sign in." : "Join us and start organizing your tasks."} 
                    />

                    <form onSubmit={handleSubmit} className="main-auth-form">
    {!isLogin && (
        <>
            <LoginField 
                label="Full Name" 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                value={formData.name || ''} 
                onChange={handleChange} 
            />
            
           
            <LoginField 
                label="Age" 
                type="number" 
                name="age"
                placeholder="Enter your age" 
                value={formData.age || ''} 
                onChange={handleChange} 
            />
        </>
    )}
    
   
    <LoginField 
        label="Email Address" 
        type="email" 
        name="email"
        placeholder="m@example.com" 
        value={formData.email} 
        onChange={handleChange} 
    />

    <LoginField 
        label="Password" 
        type="password" 
        name="password"
        placeholder="••••••••" 
        value={formData.password} 
        onChange={handleChange} 
    />

    {error && <p className="auth-error-msg">{error}</p>}

    <button type="submit" className="auth-submit-btn" disabled={loading}>
        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
    </button>
</form>

                    <p className="auth-toggle-text">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <span onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? " Create one for free" : " Login here"}
                        </span>
                    </p>
                </div>

                <div className="auth-animation-side">
                    <LoginAnimation />
                </div>
            </div>
        </div>
    );
};

export default Auth;