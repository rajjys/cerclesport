import { PostCard } from '@/components/blogComponents';
import React, { useEffect, useState } from 'react'
import { getBlogPosts } from '@/services';

const Blogs = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(()=>{
        getBlogPosts().then((data)=>{
            setBlogPosts(data);
        })
    })
  return (
    <div>
        {(blogPosts.length != 0) && 
        <div className='blogs'>
            { blogPosts.map((blogPost, index) => <PostCard blogPost={blogPost} />)}
        </div>}
    </div>
  )
}

export default Blogs