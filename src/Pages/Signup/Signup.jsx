import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Signup = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("https://blog-app-backend-cyan.vercel.app/signin", formData);
      alert(res.data.message)
      navigate('/login')
    } catch (error) {
      alert("Failed to sign up: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 w-full justify-center items-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse'></div>
      </div>

      <div className='relative z-10 w-full max-w-4xl'>
        {/* Header Section */}
        <div className='text-center mb-8 space-y-3'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm backdrop-blur-sm mb-4'>
            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Join Our Community</span>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-white'>
            Create Your <span className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>Account</span>
          </h1>
          <p className='text-slate-400'>Start your blogging journey today</p>
        </div>

        {/* Signup Card */}
        <div className='bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20'>
          <div className='flex flex-col space-y-5'>
            {/* Username Input */}
            <div className='flex flex-col space-y-2'>
              <label className='text-white font-semibold flex items-center gap-2'>
                <svg className='w-5 h-5 text-green-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                className='bg-white/10 border-2 border-white/20 text-white rounded-xl h-14 px-5 w-full placeholder-slate-400 focus:outline-none focus:border-green-400 focus:bg-white/15 transition-all duration-300'
                placeholder="Choose a username"
                required
              />
            </div>

            {/* Email Input */}
            <div className='flex flex-col space-y-2'>
              <label className='text-white font-semibold flex items-center gap-2'>
                <svg className='w-5 h-5 text-blue-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className='bg-white/10 border-2 border-white/20 text-white rounded-xl h-14 px-5 w-full placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300'
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Input */}
            <div className='flex flex-col space-y-2'>
              <label className='text-white font-semibold flex items-center gap-2'>
                <svg className='w-5 h-5 text-purple-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className='bg-white/10 border-2 border-white/20 text-white rounded-xl h-14 px-5 pr-12 w-full placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300'
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors'
                >
                  {showPassword ? (
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className='flex flex-col space-y-2'>
              <label className='text-white font-semibold flex items-center gap-2'>
                <svg className='w-5 h-5 text-pink-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Select Your Role
              </label>
              <select
                name="role"
                onChange={handleChange}
                value={formData.role}
                className='bg-white/10 border-2 border-white/20 text-white rounded-xl h-14 px-5 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 cursor-pointer'
                required
              >
                <option value="" className="bg-slate-800">Choose your role</option>
                <option value="admin" className="bg-slate-800">Admin</option>
                <option value="user" className="bg-slate-800">User</option>
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className='flex items-start gap-3 pt-2'>
              <input 
                type="checkbox" 
                id="terms" 
                className='mt-1 w-4 h-4 cursor-pointer accent-purple-500'
                required
              />
              <label htmlFor="terms" className='text-sm text-slate-400'>
                I agree to the{' '}
                <Link to="/terms" className='text-purple-400 hover:text-purple-300 transition-colors'>
                  Terms & Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className='text-purple-400 hover:text-purple-300 transition-colors'>
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className='w-full h-14 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            >
              {isLoading ? (
                <>
                  <svg className='w-5 h-5 animate-spin' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </>
              )}
            </button>

          
          </div>
        </div>

        {/* Login Link */}
        <div className='text-center mt-6'>
          <p className='text-white/60'>
            Already have an account?{' '}
            <Link to='/login' className='text-purple-400 hover:text-purple-300 font-semibold transition-colors'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;