// Import necessary modules and hooks
import React, { useState } from 'react'; // Import React and the useState hook for state management

// Register Component
// This component provides the user interface for registering a new user account.
// It includes input fields for first name, last name, username, password, and balance.
const Register = () => {
    // Define state variable for registration form data
    const [formData, setFormData] = useState({
        firstName: '', // State for the first name of the user
        lastName: '',  // State for the last name of the user
        username: '',  // State for the desired username
        password: '',  // State for the password
        balance: ''    // State for the initial balance
    });

    // Function to handle input changes in the form fields
    // Updates the state for each form field as the user types
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure the name and value from the input event
        setFormData((prevData) => ({ ...prevData, [name]: value })); // Update the formData state
    };

    // Function to handle the registration action
    // This function sends a POST request to the backend API to register the user
    const handleRegister = async () => {
        try {
            // Send POST request to the register endpoint
            const response = await fetch('/api/users/register', { // Use the correct API endpoint
                method: 'POST', // Request type is POST
                headers: { 'Content-Type': 'application/json' }, // Set request header
                body: JSON.stringify({
                    first_name: formData.firstName, // First name for the new user
                    last_name: formData.lastName,   // Last name for the new user
                    username: formData.username,    // Username for the new user
                    password: formData.password,    // Password for the new user
                    balance: parseFloat(formData.balance) || 0.00 // Initial balance, default to 0 if not set
                })
            });
            const data = await response.json(); // Parse response to JSON format

            // Check if registration failed or succeeded
            if (data.error) {
                alert('Registration failed: ' + data.error); // Show alert message if registration failed
            } else {
                alert('Registration successful. Redirecting to login page...'); // Show success message
                window.location.href = '/'; // Redirect to login page after successful registration
            }
        } catch (error) {
            console.error('Error:', error); // Log error to console if an error occurs
            alert('An error occurred during registration.'); // Show alert message if an error occurred
        }
    };

    // JSX code for rendering the registration form
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-3xl mb-5 text-center">Register a New Account</h2>
            <form className="bg-white p-6 rounded-lg shadow-lg w-80">
                {/* Map through each field name for registration */}
                {['firstName', 'lastName', 'username', 'password', 'balance'].map((field, index) => (
                    <div className="mb-4" key={index}>
                        <label className="block text-gray-700 font-bold mb-2">
                            {field === 'balance' ? 'Initial Balance ($)' : field.charAt(0).toUpperCase() + field.slice(1) + ':'}
                        </label>
                        <input
                            type={field === 'password' ? 'password' : 'text'} // Determine input type based on field
                            className="w-full px-3 py-2 border rounded"
                            name={field} // Use the field name as the name of the input
                            value={formData[field]} // Link input value to formData state
                            onChange={handleInputChange} // Update state when input changes
                        />
                    </div>
                ))}
                {/* Registration Button */}
                <button
                    type="button" // Type is button to prevent default form submission
                    onClick={handleRegister} // Trigger registration function on click
                    className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

// Export the Register component for use in other parts of the application
export default Register;
