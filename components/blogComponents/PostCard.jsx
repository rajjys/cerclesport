import React from 'react'
import moment from 'moment/moment';
import Link from 'next/link';
import Image from 'next/image'
import { resizeImage } from '@/utils/formatting';

const PostCard = ({blogPost, index}) => {
 
  let rowspan, colspan, display, 
  imageJustify, height, width, titleSize, excerptSize, padding, textPadding,
  shadow = 'shadow-md', rounded = 'rounded-md', borderB, loading='lazy';
  let imageUrl = blogPost.featuredImage.url;
  if(index == 0) {
    rowspan = "row-span-2";
    colspan = "col-span-10"
    display = "";
    loading = 'eager';
    imageJustify = "block";
    width = 'w-full';
    titleSize = 'text-2xl';
    padding = 'pt-2';
    textPadding = "px-2 py-4"
    excerptSize = 'text-sm';
    rounded = 'rounded-t-md'
    imageUrl = resizeImage(700, 410, imageUrl, 'crop');
}
  else {
    rowspan = 'row-span-1';
    colspan = "col-span-10 lg:col-span-5"
    display = 'flex';
    imageJustify = 'inline'
    width = 'w-44'
    height = 'h-full'
    titleSize = 'text-sm';
    excerptSize = 'text-xs hidden md:block'
    borderB = "border-b border-gray-300 lg:border-none"
      shadow = "shadow-none lg:shadow-md"
    ///resize
    imageUrl = resizeImage(180, 100, imageUrl, 'crop');
  }  
  return (
    <div className={`text-black  ${colspan} rounded ${shadow} ${borderB} grow`}>
      <Link href={`/blog/${blogPost.slug}`} className={`${display}`}>
        <Image 
                src={imageUrl}
                unoptimized
                alt={blogPost.title}
                width='160'
                height='90'
                loading={loading}
                className={`${rounded} ${imageJustify} ${width} ${height}`}
              />
        <div className={`px-2 flex flex-col justify-between ${textPadding}`}>
          <span className={`block font-bold  ${titleSize} ${padding}`} >{blogPost.title}</span>
          <p className={`${excerptSize} text-gray-500 py-1`}>{blogPost.excerpt.substring(0, 100) + "..."}</p>
          <span className='block text-slate-500 text-xs font-bold'>{moment(blogPost.createdAt).fromNow()}</span>
        </div>
        </Link>
    </div>
  )
}

export default PostCard