// Import the React library to create components and manage state in the application
import React from 'react';

// Dashboard Component
// Props: 
// - username: The logged-in user's username to be displayed.
// - onLogout: Function to handle logging the user out.
const Dashboard = ({ username, onLogout }) => {
    return (
        // Main container div for the dashboard
        <div className="p-8 bg-white min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                {/* Dashboard Title */}
                <h1 className="text-3xl text-red-700 font-bold">Big Red Link Fintech Dashboard</h1>

                {/* User Info Section */}
                <div>
                    {/* Display logged-in username */}
                    <span className="text-lg mr-4 text-gray-700">Logged in as: {username}</span>
                    
                    {/* Logout Button */}
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={onLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* Buttons for Dashboard Actions */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {['Get Transaction History', 'Get Balance', 'Send Money', 'Deposit Money', 'Withdraw Money'].map(
                    (label, index) => (
                        // Generate buttons for different actions on the dashboard
                        <button
                            key={index}
                            className="bg-red-700 text-white py-3 rounded-md hover:bg-red-800 transition"
                        >
                            {label}
                        </button>
                    )
                )}
            </div>

            {/* Placeholder for additional information or transaction display */}
            <div id="displayArea" className="mt-8 p-4 border border-gray-300 rounded"></div>
        </div>
    );
};

// Export the Dashboard component to be used in other parts of the application
export default Dashboard;
