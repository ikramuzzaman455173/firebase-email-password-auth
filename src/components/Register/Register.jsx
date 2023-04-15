import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import app from "../../../public/Firebase/firebase.init";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";


const auth = getAuth(app)
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')
  // const [success, setSuccess] = useState('')
  const handleLogin = (e) => {
    e.preventDefault();
    setError('')
    // setSuccess('')
    // Handle login logic here
    const email = e.target.email.value
    const password = e.target.password.value
    const name=e.target.userName.value

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Please Enter A Atleast 2 UpperCase Latter!')
      return
    } else if (!/(?=.*[@#$%!^*].*[@#$%^*!])/.test(password)) {
      setError('Add 2 Special Character[@#$%!^*]')
      return
    } else if (password.length < 8) {
      setError('Password Enter With Minimum 8 Character!')
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      e.target.reset()
      console.log("Logging in with email:", email, "and password:", password);
        // console.log(`user`, result.user);
      toast.warning('Please Varified Your Email!',{theme: "dark", type: 'default', autoClose:4000})
      handleEmailVarification(result.user)
      handleUserName(result.user,name)
      })
      .catch(error => {
        console.log(`error`, error.message);
        setError(error.message)
      })
  };

  const handleEmailVarification = (currentUser) => {
    sendEmailVerification((currentUser))
      .then(result => {
        // console.log(result);
      }).catch(error => {
        console.log(`Error:`,error.message);
      })
  }

  const handleUserName = (user, name) => {
    // console.log(user, name, 'handleUserName');
    updateProfile(user, {
      displayName:name,
    })
  }


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Register</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">

            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              UserName
            </label>
            <input
              type="text"
              id="userName" name="userName" required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">

            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Your email" name="email" required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password" required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Your password" name="password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                onClick={handleTogglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <span className='text-center font-bold text-red-500 text-sm my-2'>{error}</span>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
          >
            Register
          </button>
          <p className="mt-2 text-md text-slate-500 font-semibold">Already Have An Account Please<span className="text-blue-500 underline ml-2"><Link to="/login">Login</Link></span></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
