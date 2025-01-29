import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() { 
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signupHandler = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/user/signup', 
        user,
        { withCredentials: true }
      );
      if (res.data.success) {
        navigate("/signin");
      }
    } catch (error) {
      //@ts-ignore
      console.error("Signup failed:", error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <Input type="text" name="username" onChange={changeHandler} value={user.username} placeholder="Username" />
        <Input type="password" name="password" onChange={changeHandler} value={user.password} placeholder="Password" className="mt-3" />
        <Button onClick={signupHandler} className="w-full mt-4">Signup</Button>
        <p className="text-sm text-center mt-3">
          Already have an account? 
          <Link to="/signin" className="text-blue-500 hover:underline ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
