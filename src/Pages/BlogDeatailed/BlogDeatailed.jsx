import React from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogsData } from '../../CreateContext/Contextapi';

const BlogDetailed = () => {
  const { blogData } = useContext(BlogsData);
  const { id } = useParams();

  // Find the specific blog
  const myData = blogData.find((val) => val._id === id);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to calculate read time (assuming 200 words per minute)
  const calculateReadTime = (content) => {
    const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // If blog not found
  if (!myData) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#1e2749] to-[#273469] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-[#ffffea] text-[#1e2749] px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Get other blogs for related section (excluding current blog)
  const relatedBlogs = blogData
    .filter((blog) => blog._id !== id)
    .slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1e2749] to-[#273469]">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={`http://localhost:3000/${myData.img}`}
          alt={myData.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2749] via-[#1e2749]/80 to-transparent"></div>

        {/* Back Button */}
        <Link
          to="/blogs"
          className="absolute top-8 left-8 flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Blogs</span>
        </Link>

        {/* Category Badge */}
        <div className="absolute top-8 right-8">
          <span className="bg-[#ffffea] text-[#1e2749] text-sm font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wide">
            {myData.category}
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              {myData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Admin</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(myData.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{calculateReadTime(myData.blogData)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Share Buttons */}
       

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <div
            className="text-gray-300 leading-relaxed space-y-6 blog-content"
            dangerouslySetInnerHTML={{ __html: myData.blogData }}
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.8'
            }}
          />
        </article>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-white font-semibold mb-4">Category:</h3>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/10 hover:bg-[#ffffea] hover:text-[#1e2749] text-gray-300 px-4 py-2 rounded-full text-sm transition-all duration-300 cursor-pointer border border-white/20">
              #{myData.category}
            </span>
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="flex items-start gap-6">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Admin"
              className="w-20 h-20 rounded-full border-4 border-[#ffffea]"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Admin</h3>
              <p className="text-gray-300 mb-4">
                Senior Web Developer & Tech Enthusiast. Passionate about creating beautiful and functional web experiences.
                Writing about the latest trends in web development and sharing knowledge with the community.
              </p>
              <div className="flex gap-3">
                <button className="text-[#ffffea] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="text-[#ffffea] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button className="text-[#ffffea] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((relatedBlog) => (
              <Link
                key={relatedBlog._id}
                to={`/blog/${relatedBlog._id}`}
                className="group bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 hover:border-[#ffffea]/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`http://localhost:3000/${relatedBlog.img}`}
                    alt={relatedBlog.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#ffffea] text-[#1e2749] text-xs font-bold px-3 py-1 rounded-full">
                      {relatedBlog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#ffffea] transition-colors line-clamp-2">
                    {relatedBlog.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-[#ffffea] font-semibold">
                    <span>Read More</span>
                    <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailed;