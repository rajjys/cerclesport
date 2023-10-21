import { getBlogPosts } from '@/services';
import Head from 'next/head'

///import { FeaturedPosts } from '@/sections'



export default function Home({ posts }) {

  return (
    <div
      className="mb-8">
        <Head>
          <title>Cercle Sport - Statistiques et Info Sport RDC</title>
          <link rel='icon' href='/favicon.ico'/>
        </Head>
        
        
        {/*<FeaturedPosts />*/}
    </div>
  )
}

export async function getStaticProps(){
  const posts = (await getBlogPosts()) || [];
  return {
    props: { posts }
  };
}