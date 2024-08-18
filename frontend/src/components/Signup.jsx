import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";

const Signup = () => {

  const [authuser, setAuthUser]= useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
      confirmPassword:data.confirmPassword
    }
    try {
      const response = await axios.post('/api/user/signup', userInfo);
      console.log(response.data);
      if(response.data){
        localStorage.setItem("ChatApp",JSON.stringify(response.data))
        alert("signup successfull")
        setAuthUser(response.data)
      }
      
      // Handle successful login, e.g., redirect to dashboard or save token
    } catch (error) {
      if(error.response){
        alert(`Error: ${error.response.data.message}`)
      }
      console.error("Signup failed", error);
      // Handle login error, e.g., display error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-slate-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-500 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            {errors.fullname && <span>This field is required</span>}
            <input
              type="text"
              placeholder="full name"
              className="input input-bordered"
              {...register("fullname", { required: true })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            {errors.email && <span>This field is required</span>}

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
            {errors.password && <span>This field is required</span>}

            <input
              type="text"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            {errors.confirmPassword && <span>This field is required</span>}

            <input
              type="text"
              placeholder="confirm password"
              className="input input-bordered"
              {...register("confirmPassword", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="btn text-white bg-green-900  hover:bg-green-950 w-full mt-6"
          >
            Sign Up
          </button>
        </form>
        <span>Have an account?</span> <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
};

export default Signup;
