import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

const useAuthForm = (authType) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',     
        email: '',
        password: '',
        age: ''       
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const endpoint = authType === 'signup' ? '/signup' : '/signin';

        try {
            const response = await API.post(endpoint, formData);
            
            console.log("Success Data:", response.data);

            if (response.data.token) {
              
                localStorage.setItem('token', response.data.token);

                
                const finalName = response.data.user?.name || formData.name || "User";

                localStorage.setItem('user', JSON.stringify({ name: finalName }));

                
                navigate('/dashboard');
            } else {
                alert(response.data.message || "Please verify your email!");
                if (authType === 'signup') navigate('/login');
            }
        } catch (err) {
            console.error("Auth Error:", err.response?.data);
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit
    };
};

export default useAuthForm;