import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ boards }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>Trello Clone</h2>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <span className="section-title">Main Menu</span>
                    <Link to="/dashboard" className="nav-item active">
                        <i className="bi bi-grid-1x2-fill"></i> Dashboard
                    </Link>
                </div>

                <div className="nav-section">
                    <span className="section-title">Your Boards</span>
                    <div className="boards-list-mini">
                        {boards && boards.length > 0 ? (
                            boards.map(board => (
                                <Link key={board._id} to={`/board/${board._id}`} className="nav-item">
                                    <span className="board-dot"></span> {board.title}
                                </Link>
                            ))
                        ) : (
                            <p className="no-boards-text">No boards yet</p>
                        )}
                    </div>
                </div>
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn">
                    <i className="bi bi-box-arrow-left"></i> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;