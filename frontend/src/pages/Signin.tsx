import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signin() {
  const navigate = useNavigate();
  const { signin } = useAuth(); 
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signinHandler = async () => {
    try {
      await signin(user.username, user.password);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Input type="text" name="username" onChange={changeHandler} value={user.username} placeholder="Username" />
        <Input type="password" name="password" onChange={changeHandler} value={user.password} placeholder="Password" className="mt-3" />
        <Button onClick={signinHandler} className="w-full mt-4">Sign In</Button>
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
