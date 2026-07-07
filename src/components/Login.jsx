import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../config/firebase'; // Import the auth instance from your firebase config

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        auth.onAuthStateChanged((user) => {
                if (user) {
                  navigate("/home")
                    // User is signed in, you can access user information here
                    console.log('User is signed in:', user);
                } 
            
            })}, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulate login process
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User logged in successfully
                console.log('User logged in:', userCredential.user);
                // Redirect to homepage/dashboard after login
                // Replace '/home' with your homepage route
                navigate('/home');
            })
            .catch((error) => {
                setError(error.message);
                console.error('Login error:', error);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-10 bg-white rounded-lg shadow-md" style={{ width: "75%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
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
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")}>New user? Register here</p>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
