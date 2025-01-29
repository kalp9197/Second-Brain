import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signin() { 
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signinHandler = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/user/signin', 
        user,
        { withCredentials: true }
      );
      if (res.data.success) {
        navigate("/"); 
      }
    } catch (error) {
      //@ts-ignore
      console.error("Signin failed:", error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
        <Input type="text" name="username" onChange={changeHandler} value={user.username} placeholder="Username" />
        <Input type="password" name="password" onChange={changeHandler} value={user.password} placeholder="Password" className="mt-3" />
        <Button onClick={signinHandler} className="w-full mt-4">Signin</Button>
        <p className="text-sm text-center mt-3">
          Not signed up? 
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
