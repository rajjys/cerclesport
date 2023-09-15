import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { getGamesByTeam, getTeamProfile } from '@/services';
import Image from 'next/image';
import { DateCarousel, GameCard } from '@/components';
import toHumanReadable from '@/utils/dateFormat';

const Team = () => {
    let router = useRouter()
    const { slug } = router.query;
    const [games, setGames] = useState([]);///Team games
    const [profile, setProfile] = useState(); ///Team profile
  useEffect(() => {
    getTeamProfile(slug).then((data) => setProfile(data));
    getGamesByTeam(slug).then((data) => setGames(data))
  }, []);
  console.log("Slug: " + slug);
  console.log(profile);
  console.log(games);

  const reducedGames = games.reduce((acc, curr) => {
    const date =  curr.dateAndTime.split('T')[0];
    if (!acc[date]) {
       acc[date] = [];
     }      
     acc[date].push(curr);
     return acc;
  }, {});  ///games array reduced to an object of key-value pair where the key is date from dateAndTime
  const dateKeys = Object.keys(reducedGames);///Get all the dates as key array

  if(games.length == 0 || profile == undefined) return <p>Chargement...</p>
  return (
    <div>
      <div className='py-4 bg-indigo-950 top-1 sticky'>
          <DateCarousel dateKeys={dateKeys}/>
      </div>
      <div>
        <div className='bg-green-700 p-4'>
        <Image
                  alt={profile.shortName}
                  unoptimized
                  width="120"
                  height="120"
                  className='align-middle inline'
                  src={profile.photo.url}
                />
        <span className='px-2'>{profile.name}</span>
        <span className='text-gray-400 font-medium'>{`(${profile.shortName})`}</span>
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