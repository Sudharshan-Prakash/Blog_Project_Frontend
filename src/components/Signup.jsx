import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase'; // Import the auth instance from your firebase config

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook from React Router for navigation

    useEffect(() => {auth.onAuthStateChanged((user) => {
                    if (user) {
                      navigate("/home")
                        // User is signed in, you can access user information here
                        console.log('User is signed in:', user);
                    } 
                
                })}, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Simulate user registration process
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User registered successfully
                console.log('User registered:', userCredential.user);
                // After registration, redirect to the login page
                navigate('/login'); // Replace '/login' with your login page route
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg" style={{ width: "70%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Sign In</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/login")}> Already have an account? Login here</p>
                <button type="submit" className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200 ease-in-out">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Signup;
