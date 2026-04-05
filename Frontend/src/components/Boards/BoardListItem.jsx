import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './BoardListItem.css';

const BoardListItem = ({ board, onDelete, onEdit }) => {
    const navigate = useNavigate();
    
   
    const [isConfirming, setIsConfirming] = useState(false);

    const handleCardClick = () => {
        navigate(`/board/${board._id}`);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        
        if (!isConfirming) {
           
            setIsConfirming(true);
            
        
            setTimeout(() => setIsConfirming(false), 3000);
        } else {
            
            onDelete(board._id);
            setIsConfirming(false);
        }
    };

    return (
        <div className="board-card" onClick={handleCardClick}>
            <div className="board-card-content">
                <div className="board-icon">
                    <i className="bi bi-layout-three-columns"></i>
                </div>
                <div className="board-info">
                    <h3>{board.title}</h3>
                    <p>{board.lists?.length || 0} Lists</p>
                </div>
            </div>

            <div className="board-actions" onClick={(e) => e.stopPropagation()}>
                <button className="edit-btn" onClick={() => onEdit(board)}>
                    <i className="bi bi-pencil-square"></i>
                </button>

             
                <button 
                    className={`delete-btn ${isConfirming ? 'confirm-mode' : ''}`} 
                    onClick={handleDeleteClick}
                    style={{ 
                        backgroundColor: isConfirming ? '#f85149' : 'transparent',
                        color: isConfirming ? '#fff' : '#8b949e',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {isConfirming ? (
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Sure?</span>
                    ) : (
                        <i className="bi bi-trash3"></i>
                    )}
                </button>
            </div>
            
            <div className="card-glow"></div>
        </div>
    );
};

export default BoardListItem;