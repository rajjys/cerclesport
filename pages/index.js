import { fetchBlogPosts } from '@/services/gqlBlogRequests';
import Head from 'next/head'
import { PostCard } from '@/components/blogComponents';
import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { formatMultiple, resizeImage } from '@/utils/formatting';

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
        .then(data => data.map(game=>({...game, league, division})))
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
      fetchBlogPosts().then((data) => setBlogPosts(data))
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
        <div className='grid grid-cols-8'>
          {(blogPosts.length != 0) && 
          <div className='col-span-8 md:col-span-5 lg:col-span-6 text-black grid grid-cols-5 m-4 grid-rows-10 gap-6 p-2'>
              { blogPosts.map((blogPost, index) => {
                let loacalIndex = index;
                if(index > 0) loacalIndex += 4;
                return <PostCard blogPost={blogPost} index={loacalIndex} key={index}/>
                })}
          </div>
          }
          {
            ///Latest Games
            (games.length != 0) && 
            <div className='col-span-8 md:col-span-3 lg:col-span-2 flex flex-col'>
              <span className='text-xl lg:text-2xl font-bold py-4 text-center'>MATCHS RECENTS</span>
              {games.map((game, index) => {
                const winOrLoss = game.scoreTeam1 > game.scoreTeam2
                const textColor1 = winOrLoss ? "text-black" : "text-gray-500";
                const textColor2 = winOrLoss ? "text-gray-600" : "text-black";
                const dateAndTime = formatMultiple(game.dateAndTime);
                return  <Link href={`/game/24/${game.league}/${game.division}/${game.slug}`} key={index} className="p-2 m-2 bg-white shadow-md rounded text-black text-center">
                            <span className='py-2 text-xs font-bold'>{dateAndTime[0]}</span>
                            <span className='py-2 text-xs font-bold text-red-800 ml-6'>{dateAndTime[2]}</span>
                            <div className='flex items-center justify-around font-bold 
                            text-indigo-900 text-xs lg:text-sm border-y border-gray-300 py-1'>
                              <span>{game.team1.shortName}</span>
                              <Image
                                  alt={game.team1.shortName}
                                  unoptimized
                                  width="30"
                                  height="30"
                                  className='inline rounded-full'
                                  src={resizeImage(60, 60,game.team1.photo.url)}
                                />
                              <span className={`${textColor1}`}>{game.scoreTeam1}</span>
                              <span>-</span>
                              <span  className={`${textColor2}`}>{game.scoreTeam2}</span>
                              <Image
                                  alt={game.team2.shortName}
                                  unoptimized
                                  width="30"
                                  height="30"
                                  className='inline rounded-full'
                                  src={resizeImage(60, 60, game.team2.photo.url)}
                                />
                              <span>{game.team2.shortName}</span>
                            </div>
                            <span className='text-center block text-xs font-bold pt-2'>{game.league} - {game.division}</span>
                        </Link>}
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