import { PostDetail} from '@/components/blogComponents';
import { fetchBlog, fetchBlogPosts } from '@/services/gqlBlogRequests';
import React from 'react'
import Head from 'next/head'
import Link from 'next/link';
import { resizeImage } from '@/utils/formatting';

const BlogPost = ({ blog, recents }) => {
  return (
    blog != undefined && 
        <div className='mx-2 my-2 p-2 md:mx-6 md:my-6 md:px-6 text-black bg-white'>
          <Head>
            <title>{blog.title}</title>
            <meta property="og:image" content={resizeImage(20, 10, blog.featuredImage.url, "scale")} />
          </Head>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 place-content-stretch'>
              <div className='col-span-1 lg:col-span-8'>
                  <PostDetail post={blog} />
              </div>
              <div className='col-span-1 lg:col-span-4'>
                  <div className='relative lg:sticky top-16 pt-4 pb-10'>
                      <span className='font-bold text-md pb-2 mb-2 border-b border-gray-300 block'>RECENTS</span>
                      {recents.length != 0 &&
                        recents.map((recentPost, index)=>
                        <div className='border-b border-gray-300 m-2 p-2' key={index}>
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
export async function getServerSideProps({ query }) {
      const { slug } = query;

      // Fetch blog information
      const blog = await fetchBlog(slug);

      // Fetch the most recent posts (excluding the current one)
      const recents = await fetchBlogPosts().then((data) =>
        data.filter((recent) => recent.slug !== slug).slice(0, 5)
      );

      return {
        props: {
          blog,
          recents,
        },
      };
}
export default BlogPost
