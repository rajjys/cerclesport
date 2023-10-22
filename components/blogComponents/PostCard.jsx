import React from 'react'
import moment from 'moment/moment';
import Link from 'next/link';
import Image from 'next/image'
import { resizeImage } from '@/utils/formatting';

const PostCard = ({blogPost, index}) => {
 
  let rowspan, colspan, display, 
  imageJustify, height, width, titleSize, excerptSize, padding;
  let imageUrl = blogPost.featuredImage.url;
  if(index == 0) {
    rowspan = "row-span-4";
    colspan = "lg:col-span-6"
    display = "";
    imageJustify = "block";
    width = 'w-fit';
    titleSize = 'text-2xl';
    padding = 'pt-2';
    excerptSize = 'text-sm'
}
  else {
    rowspan = 'row-span-1';
    display = 'flex';
    imageJustify = 'inline'
    width = 'w-2/5'
    height = 'h-28';
    titleSize = 'text-md';
    excerptSize = 'text-xs'
    if(index < 4) colspan = "lg:col-span-4"
    else colspan = 'lg:col-span-5'
    ///resize
    imageUrl = resizeImage(230, 140, imageUrl);
  }  
  return (
    <div className={`text-black ${rowspan} col-span-10 ${colspan} bg-white rounded shadow-md`}>
      <Link href={`/blog/${blogPost.slug}`} className={`${display}`}>
        <Image 
                src={imageUrl}
                unoptimized
                alt={blogPost.title}
                width='55'
                height='40'
                className={`object-cover rounded-md  ${imageJustify} ${width} ${height}`}
              />
        <div className='px-2 flex flex-col justify-between'>
          <span className={`block font-bold ${titleSize} ${padding}`} >{blogPost.title}</span>
          <p className={`${excerptSize} text-gray-700 py-2`}>{blogPost.excerpt.substring(0, 100) + "..."}</p>
          <span className='block text-gray-500 text-xs'>{moment(blogPost.createdAt).fromNow()}</span>
        </div>
        </Link>
    </div>
  )
}

export default PostCard