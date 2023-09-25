import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { getGameInfo } from '@/services';
import { GameWidget } from '@/components';
import Image from 'next/image';

const Game = () => {

  let router = useRouter()
    const [gameInfo, setGameInfo] = useState();///Team games
  useEffect(() => {
    if (router.isReady){
      const { slug } = router.query;
      ///getTeamProfile(slug).then((data) => setProfile(data));
      ///getGamesByTeam(slug).then((data) => setGames(data))
        getGameInfo(slug).then((data) => setGameInfo(data));
    }  
  }, [router.isReady]);
  if(gameInfo == null) return <p>Match introuvable</p>
  if(gameInfo == undefined) return <p>Chargement...</p>
  console.log(gameInfo);
  return (
    <div>
      <div className='top-12 lg:top-16 sticky'>
        <GameWidget gameInfo={gameInfo}/>
      </div>
      <div className='flex flex-wrap justify-between text-black' >
        <div className='p-6 m-4 rounded-lg bg-white grow'>
          <span className='px-2 font-bold text-indigo-900'>Effectif:</span>
          <span className='p-1 border border-gray-300 bg-green-300/20 text-indigo-800 font-bold rounded-full'>{gameInfo.team1.name}</span>
          <div className='pt-2 border-t border-gray-300 pt-2 my-2'>
            <div>
              {gameInfo.lineup1.length == 0 && <span className='font-bold text-center p-4'>Pas D'information</span>}
              {gameInfo.lineup1.map((name, index)=>{
                return <div>
                  <span className='px-2 text-sm text-gray-400'>{index + 1}.</span>
                  <span className='text-black'>{name}</span>
                </div>
              })}
            </div>
            <div className='border-t border-gray-300 pt-2 mt-2'>
              <span className='font-bold text-black mb-2'>Coach</span>
              {gameInfo.coachTeam1.map((name, index)=>{
                return <div>
                  <span className='px-2 text-sm text-gray-400'>{index + 1}.</span>
                  <span className='text-black'>{name}</span>
                </div>
              })}
            </div>
          </div>
        </div>
        <div className='p-6 m-4 rounded-lg bg-white grow'>
          <span className='px-2 font-bold text-indigo-900'>Effectif:</span>
          <span className='p-1 border border-gray-300 bg-green-300/20 text-indigo-800 font-bold rounded-full'>{gameInfo.team2.name}</span>
          <div className='pt-2 border-t border-gray-300 pt-2 my-2'>
            <div>
              {gameInfo.lineup2.length == 0 && <span className='font-bold text-center p-4'>Pas D'information</span>}
              {gameInfo.lineup2.map((name, index)=>{
                return <div>
                  <span className='px-2 text-sm text-gray-400'>{index + 1}.</span>
                  <span className='text-black'>{name}</span>
                </div>
              })}
            </div>
            <div className='border-t border-gray-300 pt-2 mt-2'>
              <span className='font-bold text-black mb-2'>Coach</span>
              {gameInfo.coachTeam2.map((name, index)=>{
                return <div>
                  <span className='px-2 text-sm text-gray-400'>{index + 1}.</span>
                  <span className='text-black'>{name}</span>
                </div>
              })}
            </div>
          </div>
        </div>
        <div className='p-6 m-4 rounded-lg bg-white grow'>
          <span className='border p-1 border-gray-300 bg-green-300/20 text-indigo-800 font-bold rounded-full'>Arbitrage</span>
          <div className='pt-2 border-t border-gray-300 pt-2 mt-2'>
            {(gameInfo.referee.length == 0) && <span className='font-bold text-center p-4'>Pas D'information</span>}
            {gameInfo.referee.map((name, index)=>{
              return <div>
                <span className='px-2 text-sm text-gray-400'>{index + 1}.</span>
                <span className='font-bold text-black'>{name}</span>
              </div>
            })}
          </div>
        </div>
      </div>
      <div className='text-black  rounded-lg p-6 auto-cols-max grid grid-cols-3 gap-0'>
        <div className='col-span-3 md:col-span-1  flex flex-col bg-white rounded-lg p-2'>
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
                      src={gameInfo.stadium.image[0].url}
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