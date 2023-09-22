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
  if(gameInfo == null) return <p>Not Found</p>
  if(gameInfo == undefined) return <p>Chargement...</p>
  console.log(gameInfo);
  return (
    <div>
      <div className='top-12 lg:top-16 sticky'>
        <GameWidget gameInfo={gameInfo}/>
      </div>
      
    </div>
  )
}

export default Game