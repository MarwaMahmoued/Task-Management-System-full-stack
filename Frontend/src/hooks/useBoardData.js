import { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const useBoardData = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
  const fetchBoards = async () => {
    try {
        setLoading(true);
        const response = await API.get('/board');
        
        console.log("Full Server Response:", response.data);

       
        const actualData = response.data.Boards || [];
        
        setBoards(actualData);
    } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.response?.data?.message || 'Failed to fetch boards');
        setBoards([]); 
    } finally {
        setLoading(false);
    }
};

   
    const addBoard = async (boardTitle) => {
        try {
            const response = await API.post('/boards', { title: boardTitle });
            setBoards([...boards, response.data]); 
            return response.data;
        } catch (err) {
            setError('Could not create board');
        }
    };

   
    useEffect(() => {
        fetchBoards();
    }, []);

    return { boards, loading, error, addBoard, refreshBoards: fetchBoards };
};

export default useBoardData;