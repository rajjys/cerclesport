import React, {useState, useEffect} from 'react'
import { getCategoryPost } from '@/services'
import Link from 'next/link';
import Image from 'next/image';

const CategoryPostCard = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getCategoryPost(props.slug).then((newPosts) => setPosts(newPosts))
  }, [props.slug]);
  
  return (
    <div className='bg-white shadow-lg rounded-lg px-2 mx-2'>
        <Link href={"/category/" + props.slug}>
            <h3 className='font-semibold py-2 text-sm text-gray-500 text-center transition duration-300 hover:text-pink-400 hover:scale-110'>
                {props.name}
            </h3>
        </Link>
      {posts.map((post) => (
        <Link key={post.node.slug} href={`/post/${post.node.slug}`}>
          <div className=' group flex justify-between cusor-pointer h-24 border-t border-gray-400 pb-2 mb-2 transition duration-300'>
            <h1 className='flex-initial transition duration-300 text-left my-4 cursor-pointer group-hover:text-pink-600 text-xs font-semibold'>
                {post.node.title}
            </h1>
            <div className=' flex-none relative overflow-hidden shadow-md flex-none w-2/5 h-full'>
                <Image 
                    src={post.node.featuredImage.url}
                    unoptimized
                    alt={post.node.title}
                    width='50'
                    height='40'
                    className='object-top absolute w-full h-full object-cover shadow-lg rounded m-2'
                />   
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryPostCard