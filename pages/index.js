import { fetchBlogPosts } from '@/services/gqlBlogRequests';
import Head from 'next/head'
import { PostCard } from '@/components/blogComponents';
import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import { GameCard } from '@/components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Home() {

  const [gamesd1m, setGamesd1m] = useState([]);
  const [gamesd1f, setGamesd1f] = useState([]);
  const [gamesd2m, setGamesd2m] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
      const fetchGames = async (league, division) => {
        await fetch('/api/fetchallgames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ division, league, number: 7})
        })
        .then(response => response.json())
        .then(data => data.map(game => ({...game, league, division})))
        .then(data => { 
              switch(division){
                case "D1M": setGamesd1m(data);break;
                case "D1F": setGamesd1f(data);break;
                case "D2M": setGamesd2m(data);break;
              }
        });
      }
      const prefLeague = JSON.parse(localStorage.getItem("league"))|| "EUBAGO";
      fetchGames(prefLeague, "D1M");
      fetchGames(prefLeague, "D1F");
      fetchGames(prefLeague, "D2M");
      fetchBlogPosts().then((data) => setBlogPosts(data.slice(0, 10)))
    }, []);

  const latestGames = [...gamesd1m, ...gamesd1f, ...gamesd2m];
  const games = latestGames.sort((game1, game2) => new Date(game2.dateAndTime) - new Date(game1.dateAndTime))
                           .slice(0, 10);
  
                           return (
    <div className="mb-8 text-black">
        <Head>
          <title>Cercle Sport - Statistiques et Info Sport RDC</title>
          <link rel='icon' href='/favicon.ico'/>
        </Head>
        <div className='grid grid-cols-12 gap-0'>
          {(blogPosts.length != 0) && 
          <div className='col-span-12 xl:col-span-9 p-4'>
            <PostCard blogPost={blogPosts[0]} index={0}/>
                <Carousel responsive={responsive}
                ssr={true} showDots={false} itemClass="mr-2 lg:mr-3" 
                className='pt-8 px-2'>
                    {blogPosts.slice(1).map((blogPost, index) => 
                (<PostCard blogPost={blogPost} key={index} index={index + 1}/>))}
                </Carousel>
          </div>
          }
          {
            ///Latest Games
            (games.length != 0) && 
            <div className='col-span-12 xl:col-span-3 flex flex-col px-4'>
              <span className='text-xl lg:text-2xl font-bold py-4 text-center'>MATCHS RECENTS</span>
              {games.map((game, index) => {
                return <GameCard game={game} showDeficit={false} key={index} league={game.league} division={game.division}/>
              }
              )}
              <Link href={`/schedule/`} className='bg-pink-500 p-2 mx-auto mt-4 rounded shadow' >
                <span className='text-white text-sm font-bold'>Tous les matchs</span>
              </Link>
            </div>
          }
    </div>
    </div>
  )
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};