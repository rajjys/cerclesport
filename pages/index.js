import { fetchBlogPosts } from '@/services/gqlBlogRequests';
import Head from 'next/head'
import { PostCard } from '@/components/blogComponents';
import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import { GameCard } from '@/components';
import Image from 'next/image';
import { getNumericDate, resizeImage } from '@/utils/formatting';

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
          switch(league){
            case "EUBAGO":
              switch(division){
                case "D1M": setGamesd1m(data);break;
                case "D1F": setGamesd1f(data);break;
                case "D2M": setGamesd2m(data);break;
              }; break;
          }

        });
      }
      fetchGames("EUBAGO", "D1M");
      fetchGames("EUBAGO", "D1F");
      fetchGames("EUBAGO", "D2M");
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
        <div className='flex justify-between flex-wrap'>
          {(blogPosts.length != 0) && 
          <div className='flex-1 w-full lg:w-3/4 grow text-black grid grid-cols-10 m-4 grid-rows-10 gap-2 p-2'>
              { blogPosts.map((blogPost, index) => {
                return <PostCard blogPost={blogPost} index={index} key={index}/>
                })}
          </div>
          }
          {
            ///Latest Games
            (games.length != 0) && 
            <div className='flex-none w-full lg:w-1/4 flex flex-col px-4'>
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