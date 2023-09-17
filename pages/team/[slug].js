import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { getGamesByTeam, getTeamProfile } from '@/services';
import Image from 'next/image';
import { DateCarousel, GameCard } from '@/components';
import toHumanReadable from '@/utils/dateFormat';
import { addTeamStats, addWinLossEntries } from '@/utils/gameFunctions';

const Team = () => {
    let router = useRouter()
    const [games, setGames] = useState([]);///Team games
    const [profile, setProfile] = useState(); ///Team profile
  useEffect(() => {
    if (router.isReady){
      const { slug } = router.query;
      getTeamProfile(slug).then((data) => setProfile(data));
      getGamesByTeam(slug).then((data) => setGames(data))
    }  
  }, [router.isReady]);
  if(games.length == 0 || profile == undefined) return <p>Chargement...</p>

  const reducedGames = games.reduce((acc, curr) => {
    const date =  curr.dateAndTime.split('T')[0];
    if (!acc[date]) {
       acc[date] = [];
     }      
     acc[date].push(curr);
     return acc;
  }, {});  ///games array reduced to an object of key-value pair where the key is date from dateAndTime
  const dateKeys = Object.keys(reducedGames);///Get all the dates as key array
  const gameObj = {}
  gameObj[profile.name] = games;
  const gamesWithStats = addTeamStats(addWinLossEntries(gameObj));///Get stats for this team
  const stats = gamesWithStats[profile.name][1];
  return (
    <div>
      <div className='py-4 bg-indigo-950 top-1 sticky'>
          <DateCarousel dateKeys={dateKeys}/>
      </div>
      <div>
        <div className='flex bg-green-700 p-4'>
            <Image
                  alt={profile.shortName}
                  unoptimized
                  width="120"
                  height="120"
                  className='align-middle inline'
                  src={profile.photo.url}
                />
            <div className='text-white px-4'>
              <div className='text-3xl my-2'>
                <span className='font-bold'>{profile.name}</span>
                <span className='text-gray-400 font-medium'>{`(${profile.shortName})`}</span>
              </div>
              <div className='flex text-lg'>
                <span className='px-2'>Points: {stats.points}</span>
                <span className='px-2'>Joues: {stats.wins + stats.losses + stats.forfeits}</span>
                <span className='px-2'>Victoires: {stats.wins}</span>
                <span className='px-2'>Defaites: {stats.losses}</span>
                <span className='px-2'>Forfaits: {stats.forfeits}</span>
                <span className='px-2'>PPM: {(stats.pointsScored/(stats.wins + stats.losses + stats.forfeits)).toFixed(1)}</span>
              </div>
            </div>
        
        </div>
        <span className='text-center font-bold text-xl py-4 text-indigo-900 block'>MATCHS JOUES</span>
          { 
            dateKeys.map((dateKey, index) => {
                return <div key={index} id={dateKey}>
                          <p className='text-indigo-900 text-lg ml-10'>{toHumanReadable(dateKey)}</p>
                          <div className='grid grid-cols-2 gap-4 p-4'>
                            {reducedGames[dateKey].map((game, index) => {
                              return <GameCard game={game} key={index}/>})}
                          </div>
                      </div>
            })
              }
      </div>
        
      </div>
  )
}
function getTeamStats( games ){

}
export default Team