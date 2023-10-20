import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components/blogComponents'
import {getPosts} from "../services"
///import { FeaturedPosts } from '@/sections'



export default function Home({ posts }) {

  return (
    <div
      className="mb-8">
        <Head>
          <title>Cercle Sport - Statistiques et Info Sport RDC</title>
          <link rel='icon' href='/favicon.ico'/>
        </Head>
        
        <div className='mx-auto sm:mx-6 md:mx-9 lg:mx-14 xl:mx-18'>
          <div className='grid grid-cols-2 gap-x-12 sm:grid-cols-3 sm:gap-x-10 md:grid-cols-4 md:gap-x-8 lg:grid-cols-5 lg:gap-x-6 xl:grid-cols-6 place-items-start border-b border-yellow-500 pb-8 mb-8'>
            {
              posts.map((post, index) => <PostCard post={post.node} key={index} index={index} />)
            }
          </div>
          <div className='ml-8 mr-4 md:mx-4 border-b border-yellow-500 pb-8 mb-8'>
            <div className='relative top-8'>
              <Categories/>
              <PostWidget />
            </div>
          </div>
        </div>
        {/*<FeaturedPosts />*/}
    </div>
  )
}

export async function getStaticProps(){
  const posts = (await getPosts()) || [];
  return {
    props: { posts }
  };
}