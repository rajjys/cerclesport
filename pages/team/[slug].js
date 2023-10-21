import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { getGamesByTeam, getTeamProfile } from '@/services';
import Image from 'next/image';
import { DateCarousel, GameCard } from '@/components';
import { addTeamStats, addWinLossEntries } from '@/utils/gameFunctions';
import { resizeImage } from '@/utils/formatting';

const Team = () => {
    let router = useRouter()
    const [games, setGames] = useState([]);///Team games
    const [profile, setProfile] = useState(); ///Team profile
  useEffect(() => {
    if (router.isReady){
      const { slug } = router.query;
      const fetchTeamProfile = async () => {
        await fetch('/api/fetchteam', {
          body: JSON.stringify(slug),
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        })
        .then(response => response.json())
        .then(data => setProfile(data));
      }
      const fetchGamesByTeam = async () => {
        await fetch('/api/fetchgamesbyteam', {
          body: JSON.stringify(slug),
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        })
        .then(response => response.json())
        .then(data => setGames(data));
      }
      fetchTeamProfile();
      fetchGamesByTeam();
    }  
  }, [router.isReady]);
  if(profile == null) return <p>Equipe Introuvable</p>
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
        <div className='flex bg-green-700 p-4'>
            <Image
                  alt={profile.shortName}
                  unoptimized
                  width="120"
                  height="120"
                  className='align-middle inline rounded rounded-full'
                  src={resizeImage(180, 180, profile.photo.url)}
                />
            <div className='text-white px-4'>
              <div className='text-3xl my-2'>
                <span className='font-bold'>{profile.name}</span>
                <span className='text-gray-400 font-medium'>{` (${profile.shortName})`}</span>
              </div>
              <div className='flex'>
                <span className='px-2'>Points: <span className='font-bold'>{stats.points}</span></span>
                <span className='ml-6'>Record:<span className='px-2 font-bold'>{stats.wins}-{stats.losses}-{stats.forfeits}</span></span>
              </div>
            </div>   
        </div>
        <div className='border-b border-gray-300 pb-6 mb-6 mx-2'>
          <span className='text-center font-bold text-xl py-4 text-indigo-900 block'>STATISTIQUES: <span className='py-1 px-3 ml-2 border border-gray-300 bg-green-300/20 text-indigo-800 rounded-full'>{profile.name}</span></span>
          <table className='text-left text-black mx-auto'>
            <tr className='border-b border-gray-300'>
              <td className='pr-24'>Matchs Joues</td>
              <td className='pl-24 border-l border-gray-300 text-right font-bold text-indigo-900'>{stats.wins + stats.losses + stats.forfeits}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='pr-24'>Victoires</td>
              <td className='pl-24 border-l border-gray-300 text-right font-bold text-indigo-900'>{stats.wins}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='pr-24'>Defaites</td>
              <td className='pl-24 border-l border-gray-300 text-right font-bold text-indigo-900'>{stats.losses}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='pr-24'>Forfaits</td>
              <td className='pl-24 border-l border-gray-300 text-right font-bold text-indigo-900'>{stats.forfeits}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='pr-24'>Points Marques</td>
              <td className='pl-24 border-l border-gray-300 text-right font-bold text-indigo-900'>{stats.pointsScored}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='pr-24'>Points Encaisses</td>
              <td className='pl-24 border-l border-gray-300 text-right font-bold text-indigo-900'>{stats.pointsConceided}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='pr-24'>Points Par Match</td>
              <td className='pl-24 border-l border-gray-300 text-right font-bold text-indigo-900'>{stats.ppg}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='pr-24'>Points Encaises Par Match</td>
              <td className='pl-24 border-l border-gray-300 text-right font-bold text-indigo-900'>{stats.dppg}</td>
            </tr>
          </table>
        </div>
        <div>
            <span className='text-center font-bold text-xl py-4 text-indigo-900 block'>MATCHS JOUES: <span className='py-1 px-3 ml-2 border border-gray-300 bg-green-300/20 text-indigo-800 rounded-full'>{profile.name}</span></span>
            <div className='m-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {games.map((game, index) => {
                    return <GameCard game={game} key={index} showDeficit={false}/>
                  })
                }
            </div>
        </div>
      </div>   
  )
}
export default Team