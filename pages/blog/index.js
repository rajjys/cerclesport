import { PostCard } from '@/components/blogComponents';
import React, { useEffect, useState } from 'react'
import { fetchBlogPosts } from '@/services/gqlBlogRequests';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Head from 'next/head';
import { resizeImage } from '@/utils/formatting';

const Blogs = ({blogPosts}) => {
  return (
    <div className='m-4'>
        {(blogPosts.length != 0) && 
                <div className=' p-4'>
                  <Head>
                    <title>Informations</title>
                  </Head>
                <PostCard blogPost={blogPosts[0]} index={0}/>
                    <Carousel responsive={responsive}
                    ssr={true} showDots={false} itemClass="mr-2 lg:mr-3" 
                    className='pt-8 px-2'>
                        {blogPosts.slice(1).map((blogPost, index) => 
                    (<PostCard blogPost={blogPost} key={index} index={index + 1}/>))}
                    </Carousel>
            </div>}
    </div>
  )
}
export async function getServerSideProps() {
  // Fetch blog posts here (replace with your actual fetch logic)
  const blogPosts = await fetchBlogPosts();

  return {
    props: {
      blogPosts,
    },
  };
}
export default Blogs

const responsive = {
    desktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 3000, min: 1920 },
        items: 7
      },
    laptop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 1920, min: 1124 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1124, min: 900 },
      items: 4
    },
    smallTablet: {
      breakpoint: { max: 900, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };