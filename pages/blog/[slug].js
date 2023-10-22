import { PostDetail, PostCard } from '@/components/blogComponents';
import { fetchBlog, fetchBlogPosts } from '@/services';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link';

const BlogPost = () => {
  let router = useRouter();
  const [blog, setBlog] = useState();
  const [recents, setRecents] = useState([]); ///Recents blogposts
  useEffect(()=>{
    if(router.isReady){
      const {slug} = router.query;
      fetchBlog(slug).then((data) => setBlog(data));
      fetchBlogPosts().then((data)=>setRecents(data.slice(0, 5)));
    }
  },[router.isReady, router.query]);
  return (
    blog != undefined && 
        <div className='mx-2 my-2 px-2 mb-8 md:mx-6 md:my-6 md:px-6'>
          <Head>
            <title>{blog.title}</title>
          </Head>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 place-content-stretch bg-white shadow-md'>
              <div className='col-span-1 lg:col-span-8'>
                  <PostDetail post={blog} />
              </div>
              <div className='col-span-1 lg:col-span-4'>
                  <div className='relative lg:sticky top-16 pt-4'>
                      <span className='font-bold text-md pb-2 mb-2 border-b border-gray-300 block'>RECENTS</span>
                      {recents.length != 0 &&
                        recents.map((recentPost, index)=>
                        <div className='border-b border-gray-300 m-2 p-2'>
                          <Link  href={`/blog/${recentPost.slug}`}>
                            <span className='text-sm font-bold block'>{recentPost.title}</span>
                            <span className='text-xs text-gray-500 block'>{recentPost.excerpt.substring(0, 100) + "..."}</span>
                          </Link>
                        </div>
                          
                        )
                      }
                  </div>
              </div>
          </div>
    </div>
  )
}

export default BlogPost
