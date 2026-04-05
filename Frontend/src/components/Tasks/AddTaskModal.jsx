import React, { useState, useEffect } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, onSave, listId, taskToEdit }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: 'To Do',
        deadline: ''
    });

    useEffect(() => {
        if (taskToEdit) {
            setTaskData({
                title: taskToEdit.title || '',
                description: taskToEdit.description || '',
                status: taskToEdit.status || 'To Do',
                deadline: taskToEdit.deadline ? new Date(taskToEdit.deadline).toISOString().split('T')[0] : ''
            });
        } else {
            setTaskData({ title: '', description: '', status: 'To Do', deadline: '' });
        }
    }, [taskToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(listId, taskData, taskToEdit?._id);
        
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Task Title</label>
                        <input 
                            type="text" 
                            placeholder="What needs to be done?"
                            value={taskData.title}
                            onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            placeholder="Add more details..."
                            value={taskData.description}
                            onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                        ></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Status</label>
                            <select 
                                value={taskData.status}
                                onChange={(e) => setTaskData({...taskData, status: e.target.value})}
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Deadline</label>
                            <input 
                                type="date" 
                                value={taskData.deadline}
                                onChange={(e) => setTaskData({...taskData, deadline: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="save-btn">
                            {taskToEdit ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;