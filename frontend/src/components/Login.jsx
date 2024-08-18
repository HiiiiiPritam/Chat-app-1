import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";


const Login = () => {
  const [authuser, setAuthUser]= useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const userInfo={
   
      email:data.email,
      password:data.password,

    }
    try {
      const response = await axios.post('/api/user/login', userInfo);
      console.log(response.data);
      if(response.data){
        localStorage.setItem("ChatApp",JSON.stringify(response.data))
        alert("login successfull")
        setAuthUser(response.data)
      }
      
      // Handle successful login, e.g., redirect to dashboard or save token
    } catch (error) {
      if(error.response){
        alert(`Error: ${error.response.data.message}`)
      }
      console.error("login failed", error);
      // Handle login error, e.g., display error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-slate-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-500 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            {errors.email && <span className="text-red-500">This field is required</span>}
            <input
              type="text"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            {errors.password && <span className="text-red-500">This field is required</span>}
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="btn text-white bg-green-900 hover:bg-green-950 w-full mt-6"
          >
            Login
          </button>
        </form>
        <span>Dont have an account?</span> <Link to={'/signup'}>Signup</Link>
      </div>
    </div>
  );
};

export default Login;
