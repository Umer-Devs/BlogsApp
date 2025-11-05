import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/login", formData);
      localStorage.setItem("username", res.data.user.username)
      alert(res.data.message);
      setTimeout(() => {
        navigate('/')
      }, 12)
    } catch (error) {
      alert("Failed to login: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className='flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 w-full justify-center items-center px-4 relative overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse'></div>
        </div>

        <div className='relative z-10 w-full max-w-4xl'>
          {/* Header Section */}
          <div className='text-center mb-8 space-y-3'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm backdrop-blur-sm mb-4'>
              <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Welcome Back</span>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-white'>
              Login to Your <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Account</span>
            </h1>
            <p className='text-slate-400'>Continue your blogging journey</p>
          </div>

          {/* Login Card */}
          <div className='bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20'>
            <div className='flex flex-col space-y-6'>
              {/* Email Input */}
              <div className='flex flex-col space-y-2'>
                <label className='text-white font-semibold flex items-center gap-2'>
                  <svg className='w-5 h-5 text-blue-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <div className='relative'>
                  <input
                    type="email"
                    onChange={handleChange}
                    name='email'
                    value={formData.email}
                    className='bg-white/10 border-2 border-white/20 text-white rounded-xl h-14 px-5 w-full placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300'
                    placeholder='your@email.com'
                    required
                  />
                </div>
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
                    onChange={handleChange}
                    name='password'
                    value={formData.password}
                    className='bg-white/10 border-2 border-white/20 text-white rounded-xl h-14 px-5 pr-12 w-full placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300'
                    placeholder='Enter your password'
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

              {/* Forgot Password Link */}
              <div className='flex justify-end'>
                <Link to='/forgot-password' className='text-blue-400 text-sm hover:text-blue-300 transition-colors'>
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className='w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
              >
                {isLoading ? (
                  <>
                    <svg className='w-5 h-5 animate-spin' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </>
                )}
              </button>

             
            </div>
          </div>

          {/* Sign Up Link */}
          <div className='text-center mt-6'>
            <p className='text-white/60'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login