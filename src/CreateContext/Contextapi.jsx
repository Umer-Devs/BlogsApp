
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { data } from "react-router-dom";


export const BlogsData = createContext();

 export const  MyBlogProvider  = ({children})=>{
    const [blogData,setBlogData]= useState([])
   
    const fetchData = async ()=>{
    try {
        const res = await axios.get("https://blog-app-backend-cyan.vercel.app/blog");
        setBlogData(res.data);
        
        
    } catch (error) {
        console.log("failed to fetch blog data from backend",error);
        
    }
    }
    
  useEffect(()=>{
    fetchData()
        console.log(blogData);

  },[])
    return(
        <BlogsData.Provider value={{blogData,fetchData}}>
      {children}
    </BlogsData.Provider>

    )
}
