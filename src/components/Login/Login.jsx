import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import app from "../../../public/Firebase/firebase.init";
import { toast } from "react-toastify";

const auth=getAuth(app)
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef=useRef()
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    const email=e.target.email.value
    const password=e.target.password.value
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log("Logging in with email:", email, "and password:", password);
      // console.log(`result`, result.user);
      if (!result.user.emailVerified) {
        toast.error('Please Varified you email !')
        return
      } else if (result.user.emailVerified) {
        toast.success('You Are LogIn This Site !', { theme: 'dark' })
        return
      }
          }).catch(error => {
            console.log(`Error:`, error.message);
            toast.error('Invalid Email Or Password!',{theme:'dark'})
          })
  };


  const handleResetPassword = () => {
    // console.log(`email:`, emailRef.current.value);
    const email = emailRef.current.value
    if (!email) {
      toast('Please Provide Your Email First Reset The Password !')
      return
    }
    sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.info('Please Chack Your Email And Reset The Password!')
          }).catch(error => {
            console.log(`Error:`, error.message);
            toast.error('Please Enter A Valid Email !')
          })

  }



  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Your email"
              value={email} ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
          >
            Login
          </button>
          <p className="my-2 text-md text-slate-500 font-semibold">You Are Forgat Password <span onClick={handleResetPassword} className="text-blue-500 underline cursor-pointer ml-2 active:text-blue-700">Reste Password</span></p>
          <p className="mt-2 text-md text-slate-500 font-semibold">New to this site please <span className="text-blue-500 underline ml-2"><Link to="/register">Register</Link></span></p>
        </form>
      </div>
    </div>
  );
};

export default Login;