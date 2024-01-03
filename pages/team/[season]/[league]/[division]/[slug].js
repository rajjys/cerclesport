import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GameCard } from '@/components';
import { addTeamStats, addWinLossEntries } from '@/utils/gameFunctions';
import { resizeImage } from '@/utils/formatting';
import { divisionsNames } from '@/constants';

const Team = () => {
    let router = useRouter()
    const [games, setGames] = useState([]);///Team games
    const [profile, setProfile] = useState(); ///Team profile
    const { slug, division, league, season } = router.query;
  useEffect(() => {
    if (router.isReady){
      const fetchTeamProfile = async () => {
        await fetch('/api/fetchteam', {
          body: JSON.stringify({slug, division, league, season}),
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
          body: JSON.stringify({slug, division, league, season}),
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
  if(profile == undefined) return <p>Chargement...</p>

  const gameObj = {}
  gameObj[profile.name] = games;
  let gamesWithStats = {};
  let stats = {};
  if(games.length != 0) {
    gamesWithStats = addTeamStats(addWinLossEntries(gameObj));///Get stats for this team
    stats = gamesWithStats[profile.name][1];
  }
  return (
      <div>
        <div className='bg-green-700 text-white pt-2'>
            <div className='flex justify-center items-center'>
                <span className='font-bold text-gray-100 border border-gray-400 rounded-full p-2 text-xs md:text-sm'>{league} 2024 - {divisionsNames[division]}</span>
            </div>
            <div className='flex p-4 items-center'>
                <Image
                      alt={profile.shortName}
                      unoptimized
                      width="120"
                      height="120"
                      className='align-middle inline rounded rounded-full'
                      src={resizeImage(180, 180, profile.photo.url)}
                    />
                <div className='px-2'>
                  <div className='text-3xl my-2'>
                    <span className='font-bold'>{profile.name}</span>
                    <span className='text-gray-400 font-medium'>{` (${profile.shortName})`}</span>
                  </div>
                  <div className='flex justify-end'>
                    <span className='px-2'>Points: <span className='font-bold'>{stats.points}</span></span>
                    <span className='ml-6'>Bilan:<span className='pl-2 font-bold'>{stats.wins}-{stats.losses}-{stats.forfeits}</span></span>
                  </div>
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
                    return <GameCard game={game} key={index} showDeficit={false} league={league} division={division}/>
                  })
                }
            </div>
        </div>
      </div>   
  )
}
export default Team