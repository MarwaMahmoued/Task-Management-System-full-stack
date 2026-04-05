import { useState, useEffect } from 'react';
import API from '../api/axiosConfig.jsx'; 

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
        const response = await API.get('/profile'); 
        console.log("User Data from Server:", response.data); 
        setUserData(response.data.user || response.data); 
        setLoading(false);
    }catch (err) {
                setError(err.response?.data?.message || "error fetching user data");
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return { userData, loading, error };
};

export default useUserData;