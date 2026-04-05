import React, { useState } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import DashHeader from '../../components/Dashboard/DashHeader';
import StatCard from '../../components/Dashboard/StatCard';
import BoardListItem from '../../components/Boards/BoardListItem';
import useBoardData from '../../hooks/useBoardData';
import useUserData from '../../hooks/useUserData';
import API from '../../api/axiosConfig'; 
import './Dashboard.css';

const Dashboard = () => {
    const { boards, loading: boardsLoading, error: boardsError } = useBoardData();
    const { userData, loading: userLoading } = useUserData();
    const [showModal, setShowModal] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [currentBoardId, setCurrentBoardId] = useState(null);
    const handleCreateBoard = async (e) => {
        e.preventDefault();
        if (!newBoardTitle.trim()) return alert("Please enter a title");
        try {
            await API.post('/board', { title: newBoardTitle });
            setShowModal(false);
            setNewBoardTitle('');
            window.location.reload(); 
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

  
  const handleDeleteBoard = async (id) => {
    try {
        await API.delete(`/board/${id}`);
        window.location.reload();
    } catch (error) {
        console.error("Error deleting board:", error);
    }
};
    const handleEditClick = (board) => {
        setCurrentBoardId(board._id); 
        setEditTitle(board.title);    
        setShowEditModal(true);      };

    const handleUpdateBoard = async (e) => {
        e.preventDefault();
        if (!editTitle.trim()) return;
        try {
            await API.put(`/board/${currentBoardId}`, { title: editTitle });
            setShowEditModal(false);
            window.location.reload();
        } catch (error) {
            console.error("Error updating board:", error);
        }
    };

    const stats = [
        { title: 'Total Boards', value: boards.length, icon: 'bi-kanban', color: '#FF85A2' },
        { title: 'Active Lists', value: boards.reduce((acc, b) => acc + (b.lists?.length || 0), 0), icon: 'bi-list-task', color: '#2dd4bf' },
        { title: 'Team Members', value: '1', icon: 'bi-people', color: '#FACC15' }
    ];

    if (boardsLoading || userLoading) return <div className="loader-container"><div className="loader"></div></div>;

    return (
        <div className="dashboard-page">
            <Sidebar boards={boards} />
            
            <main className="main-content">
                <DashHeader userName={userData?.name || "User"} />
                
                <div className="dashboard-body">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>

                    <section className="boards-section">
                        <div className="section-header">
                            <h2>Your Workspaces</h2>
                            <button className="create-board-btn" onClick={() => setShowModal(true)}>
                                <i className="bi bi-plus-lg"></i> New Board
                            </button>
                        </div>

                        {boardsError && <p className="error-text">{boardsError}</p>}

                        {boards.length === 0 ? (
                            <div className="no-boards-container">
                                <p>No boards found. Click "New Board" to start!</p>
                            </div>
                        ) : (
                            <div className="boards-grid">
                                {boards.map(board => (
                                    <BoardListItem 
                                        key={board._id} 
                                        board={board} 
                                        onDelete={handleDeleteBoard} 
                                        onEdit={handleEditClick}      
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

          
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Create New Board</h3>
                        <form onSubmit={handleCreateBoard}>
                            <input 
                                type="text" 
                                placeholder="Enter Board Title" 
                                value={newBoardTitle} 
                                onChange={(e) => setNewBoardTitle(e.target.value)}
                                autoFocus
                            />
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Create</button>
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

          
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Update Board Title</h3>
                        <form onSubmit={handleUpdateBoard}>
                            <input 
                                type="text" 
                                placeholder="New Title" 
                                value={editTitle} 
                                onChange={(e) => setEditTitle(e.target.value)}
                                autoFocus
                            />
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Update</button>
                                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;