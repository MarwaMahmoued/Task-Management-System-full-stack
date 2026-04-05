import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="stat-card">
            <div className="stat-info">
                <span className="stat-title">{title}</span>
                <h2 className="stat-value">{value}</h2>
            </div>
            <div className="stat-icon" style={{ backgroundColor: `${color}15`, color: color }}>
                <i className={`bi ${icon}`}></i>
            </div>
          
            <div className="stat-progress-bar" style={{ backgroundColor: color }}></div>
        </div>
    );
};

export default StatCard;