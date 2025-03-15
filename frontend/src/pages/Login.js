/**
 * Import necessary dependencies
 */
import React, { useState } from 'react'; // Import React library and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate to programmatically navigate between routes
import BASE_URL from '../apiConfig'; // Import BASE_URL from configuration file for API endpoint reference

/**
 * Login Component
 * @param {Function} onLogin - Function to handle successful login by updating parent state
 */
const Login = ({ onLogin }) => {
    // State for username and password
    const [username, setUsername] = useState(''); // State variable for storing the username
    const [password, setPassword] = useState(''); // State variable for storing the password
    const navigate = useNavigate(); // Hook to navigate between routes in the app

    /**
     * handleLogin function - Makes a POST request to log in the user
     */
    const handleLogin = async () => {
        try {
            console.log("Attempting to log in...");
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            // Log entire response object
            console.log('Response:', response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Response error:", errorData);
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();
            console.log("Data received:", data);

            if (data.error) {
                alert('Login failed: ' + data.error);
            } else {
                alert('Login successful');
                onLogin(data.user_id, username);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
        }
    };

    /**
     * Render the login form
     * Includes a form to input username and password, a button to log in, and another button to navigate to the registration page.
     */
    return (
        <div className="flex items-center justify-center">
            {/* Login Form */}
            <form className="bg-white p-8 rounded-lg w-4/5 border border-gray-300">
                {/* Form Title */}
                <h2 className="text-3xl font-bold mb-5 text-center text-red-700">Bank A Login</h2>

                {/* Username Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Username:</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                    />
                </div>

                {/* Login Button */}
                <button
                    type="button"
                    onClick={handleLogin} // Call handleLogin function on button click
                    className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition mt-4"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

// Export Login component
export default Login;
