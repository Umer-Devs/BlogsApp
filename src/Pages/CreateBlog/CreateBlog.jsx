import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from 'axios'
import { useContext } from "react";
import { BlogsData } from "../../CreateContext/Contextapi";

const CreateBlog = () => {
  const {fetchData} = useContext(BlogsData)
  const [form, setForm] = useState({
    title: "",
    category: "",
    img: null, 
    blogData: "",
  });
  const [imagePreview, setImagePreview] = useState(""); 
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files && files[0]) {
      const file = files[0];
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      setForm((prev) => ({
        ...prev,
        [name]: file, 
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleQuillChange = (content) => {
    setForm((prev) => ({
      ...prev,
      blogData: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!form.title || !form.category || !form.blogData) {
      alert("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("category", form.category);
   
      data.append("img", form.img); 
    
    data.append("blogData", form.blogData);

    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      const res = await axios.post("https://blog-app-backend-cyan.vercel.app/blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData()
      
      alert("Blog published successfully!");
      console.log("Response:", res.data);
      
      // Reset form after successful submission
      setForm({
        title: "",
        category: "",
        img: null,
        blogData: "",
      });
      setImagePreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to publish blog. Please try again.");
    }
  };

  // Clean up object URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 w-full min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
     
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="w-full custom-padding relative z-10">
          
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm backdrop-blur-sm mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Create Something Amazing</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Share Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              Write, inspire, and connect with your audience
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-2xl border border-white/20">
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="flex flex-col space-y-2">
                <label className="text-white font-semibold flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter an engaging title..."
                  className="bg-white/10 border-2 border-white/20 text-white rounded-xl h-14 px-5 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                  required
                />
              </div>

              {/* Category */}
              <div className="flex flex-col space-y-2">
                <label className="text-white font-semibold flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="bg-white/10 border-2 border-white/20 text-white rounded-xl h-14 px-5 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300 cursor-pointer"
                  required
                >
                  <option value="" className="bg-slate-800">
                    Select a category
                  </option>
                  <option value="technology" className="bg-slate-800">
                    Technology
                  </option>
                  <option value="lifestyle" className="bg-slate-800">
                    Lifestyle
                  </option>
                  <option value="business" className="bg-slate-800">
                    Business
                  </option>
                  <option value="health" className="bg-slate-800">
                    Health & Wellness
                  </option>
                  <option value="travel" className="bg-slate-800">
                    Travel
                  </option>
                  <option value="food" className="bg-slate-800">
                    Food & Cooking
                  </option>
                  <option value="personal" className="bg-slate-800">
                    Personal Development
                  </option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="flex flex-col space-y-2">
                <label className="text-white font-semibold flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Cover Image
                </label>
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  id="uploadImage"
                  ref={fileInputRef}
                />
                <label
                  htmlFor="uploadImage"
                  className="border-2 border-dashed border-white/30 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-white/5 transition-all duration-300 group"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-16 h-16 text-white/40 group-hover:text-blue-400 transition-colors mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-white/60 font-medium mb-1">
                        Click to upload cover image
                      </span>
                      <span className="text-white/40 text-sm">
                        PNG, JPG or GIF (max. 5MB)
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Blog Content */}
              <div className="flex flex-col space-y-2">
                <label className="text-white font-semibold flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Write Your Content
                </label>
                <div className="rounded-xl overflow-hidden border-2 border-white/20 focus-within:border-green-400 transition-all duration-300">
                  <ReactQuill
                    className="w-full bg-white/10 text-white min-h-[300px]"
                    theme="snow"
                    value={form.blogData}
                    onChange={handleQuillChange}
                    placeholder="Start writing your amazing blog post..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 flex items-center justify-center gap-2"
                >
                  Publish Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Quill Editor Styles */}
      <style jsx global>{`
        .ql-container.ql-snow {
          border: none !important;
          min-height: 300px;
        }
        .ql-toolbar.ql-snow {
          border: none !important;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px 12px 0 0;
          padding: 12px;
        }
        .ql-editor {
          min-height: 300px;
          font-size: 16px;
          line-height: 1.8;
          color: white;
        }
        .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.4);
          font-style: normal;
        }
        .ql-snow .ql-stroke {
          stroke: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </>
  );
};

export default CreateBlog;