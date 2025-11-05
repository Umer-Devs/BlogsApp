import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BlogsData } from '../../CreateContext/Contextapi'

const Home = () => {

  
  return (
    <>
      {/* Hero Section */}
      <section className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col justify-center items-center px-4 relative overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700'></div>
        </div>

        {/* Main Content */}
        <div className='relative z-10 custom-padding text-center space-y-8'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm backdrop-blur-sm'>
            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Start Your Blogging Journey Today</span>
          </div>

          {/* Heading */}
          <h1 className='text-5xl md:text-7xl font-bold text-white leading-tight'>
            Share Your Ideas with the{' '}
            <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
              World
            </span>
          </h1>

          {/* Description */}
          <p className='text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed'>
            Express your thoughts, inspire others, and connect with a vibrant community of readers who love authentic and meaningful content. Your story matters — share it with the world.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-4'>
            <Link to={'/create'}>
              <button className='group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70 flex items-center gap-2'>
                <svg className='w-5 h-5 group-hover:rotate-12 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Create Blog
              </button>
            </Link>
            <Link to={'/all-blogs'}>
              <button className='px-8 py-4 border-2 border-blue-400/50 text-white rounded-lg font-semibold hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center gap-2'>
                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                View All Blogs
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className='relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 custom-padding mt-20 px-4'>
          {/* Feature 1 */}
          <div className='p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105'>
            <div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4'>
              <svg className='w-6 h-6 text-blue-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className='text-white font-semibold text-lg mb-2'>Easy Writing</h3>
            <p className='text-slate-400 text-sm'>
              Intuitive editor that makes creating beautiful content effortless
            </p>
          </div>

          {/* Feature 2 */}
          <div className='p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105'>
            <div className='w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4'>
              <svg className='w-6 h-6 text-purple-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className='text-white font-semibold text-lg mb-2'>Engaged Community</h3>
            <p className='text-slate-400 text-sm'>
              Connect with readers who appreciate authentic and meaningful stories
            </p>
          </div>

          {/* Feature 3 */}
          <div className='p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105'>
            <div className='w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4'>
              <svg className='w-6 h-6 text-pink-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className='text-white font-semibold text-lg mb-2'>Your Voice Matters</h3>
            <p className='text-slate-400 text-sm'>
              Every perspective is valuable — share your unique insights with confidence
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2'>
            <div className='w-1 h-3 bg-white/50 rounded-full'></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home