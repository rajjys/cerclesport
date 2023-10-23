import { PostCard } from '@/components/blogComponents';
import React, { useEffect, useState } from 'react'
import { fetchBlogPosts } from '@/services';

const Blogs = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(()=>{
        fetchBlogPosts().then((data)=>{
            setBlogPosts(data);
        })
    })
  return (
    <div>
        {(blogPosts.length != 0) && 
        <div className='blogs text-black bg-white grid grid-cols-10 m-4 grid-rows-10 gap-6 p-2'>
            { blogPosts.map((blogPost, index) => <PostCard blogPost={blogPost} index={index} key={index}/>)}
        </div>}
    </div>
  )
}

export default Blogs