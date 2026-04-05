import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth/Auth.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import BoardDetails from './pages/BoardDetails/BoardDetails.jsx';


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate replace to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
               
                <Route path="/login" element={<Auth />} />
                
              
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />
                
                <Route 
                    path="/board/:id" 
                    element={
                        <PrivateRoute>
                            <BoardDetails />
                        </PrivateRoute>
                    } 
                />

             
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;