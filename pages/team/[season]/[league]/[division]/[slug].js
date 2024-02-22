import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GameCard } from '@/components';
import { addTeamStats, addWinLossEntries } from '@/utils/gameFunctions';
import { resizeImage } from '@/utils/formatting';
import { fullForms } from '@/constants';
import Head from 'next/head';
import getDb from '@/utils/getDB';

const Team = ( {profile, games}) => {
    let router = useRouter()
    ///const [games, setGames] = useState([]);///Team games
    ///const [profile, setProfile] = useState(); ///Team profile
    const { slug, division, league, season } = router.query;
  
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
        <Head>
          <title>{`${profile.name} - ${profile.shortName} - ${fullForms[division]}`}</title>
          <meta property="og:image" content={resizeImage(230, 130, profile.photo.url, "fit")} />
        </Head>
        <div className='bg-green-700 text-white pt-2'>
            <div className='flex justify-center items-center'>
                <span className='font-bold text-gray-100 border border-gray-400 rounded-full p-2 text-xs md:text-sm'>{league} 2024 - {fullForms[division]}</span>
            </div>
            <div className='flex p-4 items-center'>
                <Image
                      alt={profile.shortName}
                      unoptimized
                      width="120"
                      height="120"
                      loading="eager"
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
          <div className='font-bold text-xl py-4 flex flex-wrap justify-center items-center'>
              <span className='text-center text-indigo-900 block'>STATISTIQUES: </span>
              <span className='py-1 px-3 ml-2 border border-gray-300 bg-green-300/20 text-indigo-800 text-center rounded-full'>{profile.name}</span>
          </div>
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
        <div className='font-bold text-xl py-4 flex flex-wrap justify-center items-center'>
              <span className='text-center text-indigo-900 block'>MATCHS: </span>
              <span className='py-1 px-3 ml-2 border border-gray-300 bg-green-300/20 text-center text-indigo-800 rounded-full'>{profile.name}</span>
          </div>
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
export async function getServerSideProps({ query }) {
  //Get access to the db
    let db = await getDb();
    let teamProfile = await getTeamProfile(db, query);
    let gamesByTeam = await getGamesByTeam(db, query);
  return {
    props: {profile: teamProfile, games: gamesByTeam},
  };
}
async function getTeamProfile(db, query){
  const {slug, division, league, season} = query;
    //Request the data to Mongodb
    const fieldString = `${league}.${division}.teams`;
    let projectionObject = {_id: 0};
    projectionObject[fieldString] = 1;
    let doc = await db.collection('24').findOne({}, { projection: projectionObject });
    let teams = doc[league][division].teams;
    ///filter to one object
  let profile;
  for(let i=0; i < teams.length; i++){
      profile = teams[i];
     if(profile.slug == slug) break;
  }
return profile;
}
async function getGamesByTeam(db, query){
  const {slug, division, league, season} = query;
  const fieldString = `${league}.${division}.games`;
    let projectionObject = {_id: 0};
    projectionObject[fieldString] = 1;
    let doc1 = await db.collection('24').findOne({}, { projection: projectionObject });
    let games = doc1[league][division].games;

        ///filter to one object
      let gamesByTeam = [];
      let game;
      for(let i = 0; i < games.length; i++){
          game = games[i];
        if((game.team1.slug == slug) || (game.team2.slug == slug))
              gamesByTeam.push(game);
      }
      ///sort by date
      gamesByTeam.sort(function(game1, game2){
          let key1 = new Date(game1.dateAndTime);
          let key2 = new Date(game2.dateAndTime);
          return key2 - key1
      })
      return gamesByTeam;
}
export default Team