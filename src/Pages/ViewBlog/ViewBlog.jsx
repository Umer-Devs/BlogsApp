import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogsData } from "../../CreateContext/Contextapi";

const ViewBlog = () => {
  const { blogData } = useContext(BlogsData);

  // Helper function to strip HTML tags from blog content
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to get excerpt from content
  const getExcerpt = (content, maxLength = 120) => {
    const text = stripHtml(content);
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#1e2749] to-[#273469] py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-block mb-4">
          <span className="text-[#ffffea] text-sm font-semibold tracking-wider uppercase opacity-80">
            Our Blog
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Latest <span className="text-[#ffffea]">Insights</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Discover cutting-edge articles on technology, design trends, and productivity hacks that will transform your workflow.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogData && blogData.length > 0 ? (
          blogData.map((blog) => (
            <article
              key={blog._id}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-[#ffffea]/50 hover:shadow-2xl hover:shadow-[#ffffea]/10 hover:-translate-y-2"
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-[#ffffea] text-[#1e2749] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wide">
                  {blog.category}
                </span>
              </div>

              {/* Blog Image */}
              <div className="relative overflow-hidden h-56 bg-gradient-to-br from-[#273469] to-[#1e2749]">
                <img
                  src={`http://localhost:3000/${blog.img}`}
                  alt={blog.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/273469/ffffea?text=Blog+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2749]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Blog Content */}
              <div className="p-6 space-y-4">
                {/* Date */}
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={blog.createdAt}>
                    {formatDate(blog.createdAt)}
                  </time>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:text-[#ffffea] transition-colors duration-300">
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {getExcerpt(blog.blogData)}
                </p>

                {/* Read More Button */}
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-flex items-center gap-2 mt-4 bg-[#ffffea] text-[#1e2749] font-semibold py-3 px-6 rounded-xl hover:bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#ffffea]/30 group"
                >
                  <span>Read Article</span>
                  <svg 
                    className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Decorative Corner Gradient */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#ffffea]/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="inline-block p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No Blogs Available</h3>
              <p className="text-gray-400">Check back soon for new content!</p>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-20 w-72 h-72 bg-[#ffffea]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-[#ffffea]/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default ViewBlog;