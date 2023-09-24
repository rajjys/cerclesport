import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { getGameInfo } from '@/services';
import { GameWidget } from '@/components';

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
        <div className='p-6 m-4 rounded bg-white grow'>
          <span className='px-2 font-bold text-indigo-900'>Effectif:</span>
          <span className='p-1 border border-gray-300 bg-green-300/20 text-indigo-800 font-bold rounded-full'>{gameInfo.team1.name}</span>
          <div className='pt-2 border-t border-gray-300 pt-2 mt-2'>
          {gameInfo.lineup1.length == 0 && <span className='font-bold text-center p-4'>Pas D'information</span>}
            {gameInfo.lineup1.map((name, index)=>{
              return <div>
                <span className='px-2 text-sm text-gray-400'>{index}.</span>
                <span className='font-bold text-black'>{name}</span>
              </div>
            })}
          </div>
        </div>
        <div className='p-6 m-4 rounded bg-white grow'>
          <span className='px-2 font-bold text-indigo-900'>Effectif:</span>
          <span className='p-1 border border-gray-300 bg-green-300/20 text-indigo-800 font-bold rounded-full'>{gameInfo.team2.name}</span>
          <div className='pt-2 border-t border-gray-300 pt-2 mt-2'>
            {gameInfo.lineup2.length == 0 && <span className='font-bold text-center p-4'>Pas D'information</span>}
            {gameInfo.lineup2.map((name, index)=>{
              return <div>
                <span className='px-2 text-sm text-gray-400'>{index}.</span>
                <span className='font-bold text-black'>{name}</span>
              </div>
            })}
          </div>
        </div>
        <div className='p-6 m-4 rounded bg-white grow'>
          <span className='border p-1 border-gray-300 bg-green-300/20 text-indigo-800 font-bold rounded-full'>Arbitrage</span>
          <div className='pt-2 border-t border-gray-300 pt-2 mt-2'>
            {(gameInfo.referee == undefined) && <span className='font-bold text-center p-4'>Pas D'information</span>}
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Game