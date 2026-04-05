import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/axiosConfig';
import ListColumn from '../../components/Tasks/ListColumn';
import AddTaskModal from '../../components/Tasks/AddTaskModal';
import Sidebar from '../../components/Dashboard/Sidebar';
import './BoardDetails.css';

const BoardDetails = () => {
    const { id } = useParams(); 
    const [board, setBoard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeListId, setActiveListId] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null); 
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListTitle, setNewListTitle] = useState("");
    const [deletingListId, setDeletingListId] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    const fetchBoardDetails = async () => {
        try {
            const response = await API.get(`/board/${id}`);
            setBoard(response.data.board); 
        } catch (err) {
            console.error("Error fetching board:", err);
        }
    };

    useEffect(() => {
        fetchBoardDetails();
    }, [id]);

    
    const handleUpdateListTitle = async (listId, newTitle) => {
        try {
            await API.put(`/list/${listId}`, { title: newTitle });
            fetchBoardDetails(); 
        } catch (err) {
            console.error("Error updating list title:", err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await API.delete(`/task/${taskId}`);
            fetchBoardDetails(); 
        } catch (err) {
            console.error("Failed to delete task:", err);
        }
    };

    const handleAddList = async () => {
        if (!newListTitle.trim()) return setIsAddingList(false);
        try {
            await API.post('/list', { 
                title: newListTitle, 
                boardId: id 
            });
            setNewListTitle(""); 
            setIsAddingList(false); 
            fetchBoardDetails(); 
        } catch (err) {
            console.error("Error adding list:", err);
        }
    };

    const handleDeleteList = async (listId) => {
        if (deletingListId !== listId) {
            setDeletingListId(listId);
            setTimeout(() => setDeletingListId(null), 3000);
        } else {
            try {
                await API.delete(`/list/${listId}`);
                setDeletingListId(null);
                fetchBoardDetails();
            } catch (err) {
                console.error("Error deleting list:", err);
            }
        }
    };

   
    const handleAddTask = (listId) => {
        setActiveListId(listId);
        setTaskToEdit(null); 
        setIsModalOpen(true);
    };

    const handleTaskClick = (task) => {
        setTaskToEdit(task);
        setActiveListId(task.listId);
        setIsModalOpen(true);
    };

   const saveTask = async (listId, taskData, taskId = null) => {
        try {
            if (taskId) {
               
                await API.put(`/task/${taskId}`, taskData);
            } else {
               
                await API.post(`/task`, {
                    ...taskData,
                    listId: listId,
                    boardId: id
                });
            }
            setIsModalOpen(false); 
            setTaskToEdit(null);
            fetchBoardDetails(); 
        } catch (err) {
            console.error("Failed to save task:", err.response?.data);
        }
    };

    if (!board) return <div className="loader"></div>;

    return (
        <div className="board-details-page">
            <Sidebar />
            <main className="board-main">
                <header className="board-header">
                    <div className="board-title-area">
                        <h2>{board.title}</h2>
                        <span className="board-badge">Private Workspace</span>
                    </div>
                    <div className="board-users">
                        <div className="user-dot" style={{ backgroundColor: '#ff7eb9' }}>
                            {userInitial}
                        </div>
                        <button className="share-btn">
                            <i className="bi bi-person-plus"></i> Share
                        </button>
                    </div>
                </header>

                <div className="lists-canvas">
                    {board.lists && board.lists.map((list) => (
                        <div key={list._id} className="list-column-wrapper">
                            <ListColumn 
                                list={list} 
                                onAddTask={handleAddTask}
                                isDeleting={deletingListId === list._id}
                                onDeleteList={() => handleDeleteList(list._id)}
                                onDeleteTask={handleDeleteTask} 
                                onTaskClick={handleTaskClick} 
                                onUpdateListTitle={handleUpdateListTitle} 
                            />
                        </div>
                    ))}
                    
                    <div className="add-list-wrapper">
                        {isAddingList ? (
                            <div className="add-list-form">
                                <input 
                                    autoFocus
                                    type="text" 
                                    className="add-list-input"
                                    placeholder="Enter list title..." 
                                    value={newListTitle}
                                    onChange={(e) => setNewListTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddList()}
                                />
                                <div className="add-list-actions">
                                    <button onClick={handleAddList} className="confirm-add-btn">Add List</button>
                                    <button onClick={() => setIsAddingList(false)} className="cancel-add-btn">
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button className="add-list-placeholder" onClick={() => setIsAddingList(true)}>
                                <i className="bi bi-plus-lg"></i> Add another list
                            </button>
                        )}
                    </div>
                </div>
            </main>

            <AddTaskModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    setTaskToEdit(null);
                }} 
                onSave={saveTask}
                listId={activeListId}
                taskToEdit={taskToEdit} 
            />
        </div>
    );
};

export default BoardDetails;