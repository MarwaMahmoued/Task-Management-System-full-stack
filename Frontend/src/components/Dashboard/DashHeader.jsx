import React from 'react';
import './DashHeader.css';

const DashHeader = ({ userName }) => {
  
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    return (
        <header className="dash-header">
            <div className="welcome-message">
                <h1>{greeting}, {userName || 'Developer'}! 👋</h1>
                <p>Welcome back to your workspace.</p>
            </div>

            <div className="header-actions">
                <div className="search-bar">
                    <i className="bi bi-search"></i>
                    <input type="text" placeholder="Search boards, tasks..." />
                </div>
                
                <div className="user-profile-mini">
                    <div className="avatar">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashHeader;