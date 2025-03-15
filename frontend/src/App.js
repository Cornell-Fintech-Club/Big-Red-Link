// Importing necessary libraries and components
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes for handling navigation
import Home from './pages/Home'; // Import Home component
import Login from './pages/Login'; // Import Login component
import Register from './pages/Register'; // Import Register component
import Dashboard from './pages/Dashboard'; // Import Dashboard component

// Main App function component
function App() {
    // State to manage logged-in user information
    const [loggedInUser, setLoggedInUser] = useState({ id: null, username: '' });

    // Function to handle user login and set logged-in user details
    const handleLogin = (userId, username) => {
        setLoggedInUser({ id: userId, username });
    };

    // Function to handle user logout and reset logged-in user details
    const handleLogout = () => {
        setLoggedInUser({ id: null, username: '' });
    };

    return (
        <Router>
            {/* Using Routes to define different paths in the app */}
            <Routes>
                {/* Home Route */}
                <Route path="/" element={<Home />} />
                {/* Login Route */}
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                {/* Register Route */}
                <Route path="/register" element={<Register />} />
                {/* Dashboard Route - Accessible only if user is logged in */}
                <Route
                    path="/dashboard"
                    element={
                        loggedInUser.id ? (
                            <Dashboard username={loggedInUser.username} onLogout={handleLogout} />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )
                    }
                />
                {/* Fallback route for undefined paths */}
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
}

// Export the App component for use in other parts of the application
export default App;
