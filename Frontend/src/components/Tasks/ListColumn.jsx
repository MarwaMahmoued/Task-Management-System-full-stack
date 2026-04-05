import React, { useState } from 'react';
import TaskCard from './TaskCard';
import './ListColumn.css';

const ListColumn = ({ list, onAddTask, onTaskClick, onDeleteList, isDeleting, onDeleteTask, onUpdateListTitle }) => {
   
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleValue, setTitleValue] = useState(list.title);

  
    const handleUpdate = () => {
        setIsEditingTitle(false);
        if (titleValue.trim() && titleValue !== list.title) {
            onUpdateListTitle(list._id, titleValue);
        } else {
            setTitleValue(list.title); 
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleUpdate();
        if (e.key === 'Escape') {
            setIsEditingTitle(false);
            setTitleValue(list.title);
        }
    };

    return (
        <div className="list-column">
            <div className="list-header">
                <div className="list-title-group">
                    {isEditingTitle ? (
                        <input
                            className="list-title-input"
                            value={titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                            onBlur={handleUpdate}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <h3 className="list-display-title" onClick={() => setIsEditingTitle(true)}>
                            {list.title}
                        </h3>
                    )}
                    <span className="task-count-badge">{list.tasks?.length || 0}</span>
                </div>
                
                <button 
                    className={`list-delete-icon-btn ${isDeleting ? 'confirm-delete' : ''}`} 
                    onClick={() => onDeleteList(list._id)}
                    style={{
                        backgroundColor: isDeleting ? '#f85149' : 'transparent',
                        color: isDeleting ? '#fff' : '#8b949e',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        transition: 'all 0.3s ease',
                        border: 'none'
                    }}
                >
                    {isDeleting ? (
                        <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Sure?</span>
                    ) : (
                        <i className="bi bi-trash3"></i>
                    )}
                </button>
            </div>

            <div className="tasks-container">
                {list.tasks && list.tasks.map(task => (
                    <TaskCard 
                        key={task._id} 
                        task={task} 
                        onTaskClick={onTaskClick} 
                        onDelete={() => onDeleteTask(task._id)} 
                    />
                ))}
            </div>

            <button className="add-task-btn" onClick={() => onAddTask(list._id)}>
                <i className="bi bi-plus-lg"></i> Add a card
            </button>
        </div>
    );
};

export default ListColumn;