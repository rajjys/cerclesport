import React from 'react'
import moment from 'moment/moment';
import Link from 'next/link';
import Image from 'next/image'

const PostCard = (props) => {
  let firstPost = props.index == 0;
  let evenPost = (props.index % 2 == 1)
  if(firstPost)
  return (
    <div className='col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6 sm:mx-2 ml-6 sm:ml-2'>
      <Link href={`/post/${props.post.slug}`}>
        <div className='group bg-white shadow-lg rounded-lg p-2 mb-4 w-full md:flex'> 
          <div className='relative overflow-hidden shadow-md md:flex-none md:w-3/5 w-full h-72'>
            <Image 
              src={props.post.featuredImage.url}
              unoptimized
              alt={props.post.title}
              width='50'
              height='40'
              className='object-top absolute  w-full h-full object-cover shadow-lg rounded group-hover:scale-150 transition duration-300 ease-in-out'
            />   
          </div>
          <div className='md:flex-initial'>
            <h1 className='transition duration-300 text-center my-4 cursor-pointer group-hover:text-pink-600 ease-in-out text-3xl'>
                {props.post.title}
            </h1>
            <p className='text-left text-sm text-gray-700 font-normal px-4 lg:px-6 mb-4'>{props.post.excerpt.substring(0, 200) + "..."}</p>
            <div className='px-4 block flex text-center items-center justify-around mb-4 w-full  text-s'>
              <div className='flex items-start justify-start mb-2 lg:mb-0 w-full lg:w-auto mr-8'>
                <Image 
                  src={props.post.author.photo.url}
                  unoptimized
                  alt={props.post.author.name}
                  width='30'
                  height='30'
                  className='align-middle rounded-full'
                />   
                <p className='inline align-middle text-xs text-gray-700 ml-2'>{props.post.author.name}</p>
              </div>
              <div className='text-xs text-gray-700'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                    <span className="align-middle">{moment(props.post.createdAt).format('MMM DD, YYYY')}</span>
              </div>
            </div>
          </div>
      </div>
      </Link>
    </div>
  )
  else if(evenPost)
  return(
    <div className='rounded-md my-4 col-span-1 mx-2'>
      <Link href={`/post/${props.post.slug}`}>
       <div className='group relative bg-white rounded-t-lg  rounded-b-md shadow-lg  w-48 h-64 transition duration-300 cusor-pointer ease-in-out hover:scale-110'>
          <div className='relative overflow-hidden shadow-md flex-none w-full h-32 rounded-t-md'>
              <Image 
                src={props.post.featuredImage.url}
                unoptimized
                alt={props.post.title}
                width='50'
                height='40'
                className='object-top absolute  w-full h-full object-cover shadow-lg'
              />   
          </div>
          <h1 className='transition duration-300 ease-in-out group-hover:text-pink-600 text-left my-4 px-4  text-xs font-semibold'>
                {props.post.title}
          </h1>
          <div className='absolute bottom-0 text-gray-700 py-4 px-2 border-t border-yellow-500 w-full text-xs'>
            <div className='flex justify-between'>
              <p className='inline text-left' >{props.post.author.name}</p>
              <p className="inline text-right">{moment(props.post.createdAt).format('MMM DD, YYYY')}</p>   
            </div>
          </div>
       </div>
      </Link>
    </div>
  )
  else return(
    <div className='rounded-md  my-4 col-span-1 mx-2'>
      <Link href={`/post/${props.post.slug}`}>
       <div className='group relative bg-black text-white rounded-t-lg  rounded-b-md shadow-lg  w-48 h-64 transition duration-300 cusor-pointer ease-in-out hover:scale-110'>
          <div className='relative overflow-hidden shadow-md flex-none w-full h-32 rounded-t-md'>
              <Image 
                src={props.post.featuredImage.url}
                unoptimized
                alt={props.post.title}
                width='50'
                height='40'
                className='object-top absolute  w-full h-full object-cover shadow-lg'
              />   
          </div>
          <h1 className='transition duration-300 ease-in-out group-hover:text-pink-600 text-left my-4 px-4 text-xs font-semibold'>
                {props.post.title}
          </h1>
          <div className='absolute bottom-0 text-slate-400 py-4 px-2 border-t border-yellow-500 w-full text-xs'>
            <div className='flex justify-between'>
              <p className='inline text-left' >{props.post.author.name}</p>
              <p className="inline text-right">{moment(props.post.createdAt).format('MMM DD, YYYY')}</p>   
            </div>
          </div>
       </div>
      </Link>
    </div>
  )
}

export default PostCard