import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts, getSimilarPosts } from '@/services'

const PostWidget = ({categories, slug}) => {
  const [realtedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if(slug){ 
      getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));
    }
    else{
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
    
  }, [slug, categories]);
  return (
    <div className='bg-white shadow-lg rounded-lg px-8 py-4 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {realtedPosts.map((post) => (
        <div key={post.title}>
          <Link href={`/post/${post.slug}`} className='text-md'>
            <div className='group flex items-center w-full mb-4 text-sm'>
              <div className='w-16 flex-none'>
                <Image 
                  src={post.featuredImage.url}
                  unoptimized
                  alt={post.title}
                  width='60'
                  height='60'
                  className='align-middle rounded'
                />   
              </div>
              <div className='flex-grow ml-4'>
                <p className='text-gray-500 font-light'>
                  {moment(post.createdAt).format("MMM DD 'YY")}
                </p>
                <p className='transition duration-300 group-hover:text-pink-600 font-semibold'>
                  {post.title}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PostWidget