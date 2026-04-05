import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onTaskClick, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Done':
                return { bg: '#22c55e20', text: '#22c55e' }; 
            case 'In Progress':
                return { bg: '#3b82f620', text: '#3b82f6' }; 
            default:
                return { bg: '#8b949e20', text: '#8b949e' }; 
        }
    };

    const statusStyle = getStatusStyles(task.status);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (!isDeleting) {
            setIsDeleting(true);
            setTimeout(() => setIsDeleting(null), 3000); 
        } else {
            onDelete();
        }
    };

    return (
        <div className="task-card" onClick={() => onTaskClick(task)}>
            <div className="task-header">
              
                <span 
                    className="priority-tag" 
                    style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                >
                    {task.status || 'To Do'}
                </span>
                
              
                <button 
                    className={`task-edit-icon ${isDeleting ? 'confirm-delete' : ''}`}
                    onClick={handleDeleteClick}
                    style={{ color: isDeleting ? '#f85149' : '#8b949e' }}
                >
                    {isDeleting ? (
                        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>Sure?</span>
                    ) : (
                        <i className="bi bi-trash3"></i>
                    )}
                </button>
            </div>
            
            <h4 className="task-title">{task.title}</h4>
            
            {task.description && (
                <p className="task-desc">
                    {task.description.length > 50 
                        ? `${task.description.substring(0, 50)}...` 
                        : task.description}
                </p>
            )}
            
            <div className="task-footer">
                <div className="task-date">
                    <i className="bi bi-calendar3"></i>
                    {task.deadline 
                        ? new Date(task.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) 
                        : 'No date'}
                </div>
                
                {task.assignedTo && (
                    <div className="task-user-avatar">
                        {typeof task.assignedTo === 'string' 
                            ? task.assignedTo.charAt(0).toUpperCase() 
                            : task.assignedTo.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;