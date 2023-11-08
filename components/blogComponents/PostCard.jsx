import React from 'react'
import moment from 'moment/moment';
import Link from 'next/link';
import Image from 'next/image'
import { resizeImage } from '@/utils/formatting';

const PostCard = ({blogPost, index}) => {
 
  let rowspan, colspan, display, 
  imageJustify, height, width, titleSize, excerptSize, padding,
  shadow = 'shadow-md', rounded = 'rounded-md', borderB;
  let imageUrl = blogPost.featuredImage.url;
  if(index == 0) {
    rowspan = "row-span-4";
    colspan = "lg:col-span-6"
    display = "";
    imageJustify = "block";
    width = 'w-full';
    titleSize = 'text-2xl';
    padding = 'pt-2';
    excerptSize = 'text-sm';
    rounded = 'rounded-t-md'
}
  else {
    rowspan = 'row-span-1';
    display = 'flex';
    imageJustify = 'inline'
    width = 'w-44'
    height = 'h-full'
    titleSize = 'text-md';
    excerptSize = 'text-xs'
    borderB = "border-b border-gray-300 lg:border-none"
    if(index < 5){
      colspan = "lg:col-span-4";
      shadow = ''
    }
    else {
      colspan = 'lg:col-span-5';
      shadow = "shadow-none lg:shadow-md"
    }
    ///resize
    imageUrl = resizeImage(160, 90, imageUrl, 'crop');
  }  
  return (
    <div className={`text-black ${rowspan} col-span-10 ${colspan} rounded ${shadow} ${borderB} grow`}>
      <Link href={`/blog/${blogPost.slug}`} className={`${display}`}>
        <Image 
                src={imageUrl}
                unoptimized
                alt={blogPost.title}
                width='80'
                height='45'
                className={`${rounded} ${imageJustify} ${width} ${height}`}
              />
        <div className='px-2 flex flex-col justify-between'>
          <span className={`block font-bold ${titleSize} ${padding}`} >{blogPost.title}</span>
          <p className={`${excerptSize} text-gray-500 py-1`}>{blogPost.excerpt.substring(0, 100) + "..."}</p>
          <span className='block text-slate-500 text-xs'>{moment(blogPost.createdAt).fromNow()}</span>
        </div>
        </Link>
    </div>
  )
}

export default PostCard