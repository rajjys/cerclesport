import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { GameWidget } from '@/components';
import Image from 'next/image';
import { resizeImage } from '@/utils/formatting';
import { fullForms } from '@/constants';
import Head from 'next/head';

const Game = () => {
  const [gameInfo, setGameInfo] = useState();///Team games
    let router = useRouter();
    const { slug, division, league, season } = router.query;
  useEffect(() => {
    if (router.isReady){
        const fetchGame = async () => {
          await fetch('/api/fetchgame', {
            body: JSON.stringify({slug, division, league, season}),
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
          })
          .then(response => response.json())
          .then(data => setGameInfo({...data, league, division }));
        }
       fetchGame();
    }  
  }, [router.isReady]);
  return (
    gameInfo!= undefined &&
    <div>
      <Head>
        <title>Match: {`${gameInfo.team1.shortName} ${gameInfo.scoreTeam1} - ${gameInfo.scoreTeam2} ${gameInfo.team2.shortName}`}</title>
        <meta property="og:description" content={`${gameInfo.league}-${gameInfo.division}-20${gameInfo.season}`} />
      </Head>
      <div className='top-12 lg:top-16 pt-2 sticky bg-white'>
            <div className='flex justify-center text-gray-800 mb-2'>
            <span className='font-bold border border-gray-300 rounded-full bg-gray-100 px-2 py-1 text-xs md:text-sm'>{league} 2024 - {fullForms[division]}</span>
            </div>
            <GameWidget gameInfo={gameInfo}/>
      </div>
      <div className='flex flex-wrap justify-between text-black text-sm md:text-base lg:text-lg mt-4' >
        <div className='p-6 m-4 rounded-lg bg-white grow shadow-md'>
          <span className='px-2 font-bold text-indigo-900 text-base lg:text-lg'>Effectif:</span>
          <span className='p-1 border border-gray-300 bg-green-300/20 text-base lg:text-lg font-bold rounded-full'>{gameInfo.team1.name}</span>
          <div className='pt-2 border-t border-gray-300 pt-2 my-2 '>
            <div>
              {gameInfo.lineup1.length == 0 && <span className='font-bold text-center p-4 text-base'>Pas D'information</span>}
              {gameInfo.lineup1.map((name, index)=>{
                return <div key={index}>
                  <span className='px-2 text-gray-400'>{index + 1}.</span>
                  <span className='text-black'>{name}</span>
                </div>
              })}
            </div>
            <div className='border-t border-gray-300 pt-2 mt-2'>
              <span className='font-bold text-black text-base lg:text-lg mb-2'>Coach</span>
              {gameInfo.coachTeam1.map((name, index)=>{
                return <div key={index}>
                  <span className='px-2 text-gray-400'>{index + 1}.</span>
                  <span className='text-black'>{name}</span>
                </div>
              })}
            </div>
          </div>
        </div>
        <div className='p-6 m-4 rounded-lg bg-white grow shadow-md'>
          <span className='px-2 font-bold text-indigo-900 text-base lg:text-lg'>Effectif:</span>
          <span className='p-1 border border-gray-300 bg-green-300/20 font-bold rounded-full text-base lg:text-lg'>{gameInfo.team2.name}</span>
          <div className='pt-2 border-t border-gray-300 pt-2 my-2'>
            <div>
              {gameInfo.lineup2.length == 0 && <span className='font-bold text-center  text-base p-4'>Pas D'information</span>}
              {gameInfo.lineup2.map((name, index)=>{
                return <div key={index}>
                  <span className='px-2 text-gray-400'>{index + 1}.</span>
                  <span className='text-black'>{name}</span>
                </div>
              })}
            </div>
            <div className='border-t border-gray-300 pt-2 mt-2'>
              <span className='font-bold text-black mb-2 text-base lg:text-lg'>Coach</span>
              {gameInfo.coachTeam2.map((name, index)=>{
                return <div key={index}>
                  <span className='px-2 text-gray-400'>{index + 1}.</span>
                  <span className='text-black'>{name}</span>
                </div>
              })}
            </div>
          </div>
        </div>
        <div className='p-6 m-4 rounded-lg bg-white grow shadow-md'>
          <span className='border p-1 border-gray-300 bg-green-300/20  font-bold rounded-full text-base lg:text-lg'>Arbitrage</span>
          <div className='pt-2 border-t border-gray-300 pt-2 mt-2'>
            {(gameInfo.referee.length == 0) && <span className='font-bold text-center p-4 text-base'>Pas D'information</span>}
            {gameInfo.referee.map((name, index)=>{
              return <div key={index}>
                <span className='px-2 text-gray-400'>{index + 1}.</span>
                <span className='font-bold text-black'>{name}</span>
              </div>
            })}
          </div>
        </div>
      </div>
      <div className='text-black  rounded-lg p-6 auto-cols-max grid grid-cols-3 gap-0'>
        <div className='col-span-3 md:col-span-1  flex flex-col bg-white rounded-lg p-2  shadow-md'>
          <span className='p-2 font-bold text-indigo-900'>Stade</span>
          {gameInfo.stadium != null ?
          <div>
            <div className='relative'>
              <Image
                      alt={gameInfo.stadium.name}
                      unoptimized
                      width="470"
                      height="280"
                      className='align-middle rounded-lg'
                      src={resizeImage(470, 280, gameInfo.stadium.image[0].url)}
                    />
              <span className='p-1 m-2 text-lg font-bold text-white bg-black/70 rounded absolute bottom-0'>{gameInfo.stadium.name}</span>
            </div>
          <span className='px-2 text-gray-500 text-sm'>{gameInfo.stadium.city}</span>
          <span className='px-2 font-bold text-gray-500 text-sm'>Capacite: {gameInfo.stadium.capacity}</span>
        </div> :
        <span className='font-bold p-4'>Pas D'information</span>
        }  
        </div>
      </div>
    </div>
  )
}
export default Game