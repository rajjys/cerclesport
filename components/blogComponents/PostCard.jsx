import React from 'react'
import moment from 'moment/moment';
import Link from 'next/link';
import Image from 'next/image'
import { resizeImage } from '@/utils/formatting';

const PostCard = ({blogPost, index}) => {

  let imageUrl = blogPost.featuredImage.url;
  let backColor = index % 2 == 0 ? "bg-black text-white":"bg-white text-black"
  return (
        (index == 0)?
        <Link href={`/blog/${blogPost.slug}`} className='grid grid-cols-5 rounded-lg shadow-md pb-2'>
          <Image 
            src={resizeImage(700, 410, imageUrl, 'crop')}
            unoptimized
            alt={blogPost.title}
            width='700'
            height='410'
            loading="eager"
            className='w-full col-span-5 lg:col-span-3 rounded-md shadow-md'
          />
          <div className='col-span-5 lg:col-span-2'>
              <span className="font-bold font-serif text-black text-2xl md:text-3xl 
              px-4 py-6 mb-6 border-b border-red-700 block" >
                {blogPost.title.charAt(0).toUpperCase() + blogPost.title.slice(1)}</span>
              <p className="text-gray-600 text-sm md:text-md mb-4 pb-2 px-6">{blogPost.excerpt.substring(0, 100) + "..."}</p>
              <span className='block text-slate-500 text-xs font-bold px-6'>{moment(blogPost.createdAt).fromNow()}</span>
          </div>
        </Link>:   
        <Link href={`/blog/${blogPost.slug}`} className={`${backColor} flex flex-col justify-between rounded-md shadow-md h-full`}>
          <Image 
            src={resizeImage(210, 120, imageUrl, 'crop')}
            unoptimized
            alt={blogPost.title}
            width='240'
            height='140'
            loading='lazy'
            className="rounded-t-md w-full"
          />
          <div className='flex-auto flex flex-col justify-between'>
              <span className="p-2 font-bold text-sm md:text-base lg:text-lg 
              font-bold font-serif">
                {blogPost.title.charAt(0).toUpperCase() + blogPost.title.slice(1)}</span>
              <span className='block text-slate-500 text-xs md:text-sm p-2 border-t border-red-700'>{moment(blogPost.createdAt).fromNow()}</span>
          </div>
        </Link>  
  )
}

export default PostCard