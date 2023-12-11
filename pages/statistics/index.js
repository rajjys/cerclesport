import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { getGamesByTeams, addWinLossEntries, addTeamStats, sortTeamsByAStat, getBlowoutGames,sortTeamsByDiff} from '@/utils/gameFunctions';
import { resizeImage} from '@/utils/formatting';
import { GameCard } from '@/components';
import { divisionsNames } from '@/constants';

const Statistics = () => {
  const [games, setGames] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
  const [selectedDivision, setSelectedDivision] = useState("D1M");
  useEffect(() => {
    const fetchGames = async () => {
      await fetch('/api/fetchallgames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ division: selectedDivision,league: selectedLeague})
      })
      .then(response => response.json())
      .then(data => setGames(data));
    }
    fetchGames();
  }, [selectedDivision, selectedLeague]);
  const gamesByTeams = getGamesByTeams(games); ///Assigning games by each team
  const gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
  const gamesWithTeamStats = addTeamStats(gamesAndPoints); ///Adding stats per team like Wins, Losses, Last5 streak,...
  const sortedByPPG = sortTeamsByAStat(gamesWithTeamStats, "ppg");
  const sortedByDPPG = sortTeamsByAStat(gamesWithTeamStats, "dppg").reverse();
  const sortedByDiff = sortTeamsByDiff(gamesWithTeamStats);
  const blowoutGames = getBlowoutGames(games);

  return (
    games.length == 0 ? <p>Loading</p>: 
    <div className='text-indigo-900'>
      <div className='my-4 mx-4 py-2 bg-white rounded-lg shadow-md text-black text-xs md:text-sm mt-4'>
          <div className='border-b border-gray-300 mx-4 px-4 my-2 font-bold text-base md:text-lg'>
             <span className='block'>{selectedLeague} 2024 - {divisionsNames[selectedDivision]}</span>
             <span className='block'>Statistiques</span>
          </div>
           <div className='m-2'>
            <select className=" py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
                  onChange={(event) => setSelectedLeague(event.target.value)}>
                  <option value="EUBAGO">EUBAGO - Goma</option>
            </select>
            <select id="division" className="py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
                onChange={(event) => setSelectedDivision(event.target.value)}>
                <option value="D1M">1ere Division - M</option>
                <option value="D1F">1ere Division - F</option>
                <option value="D2M">2eme Division - M</option>
            </select>
           </div>
        </div>
      <div className='flex flex-wrap'>
              <div className='p-2 m-2 rounded-lg bg-white grow shadow-md'>
                <span className='font-bold text-xl px-4 text-center py-2 mb-2 block'>Leaders Offensifs</span>
                <div className='font-bold'>
                  <span className='hidden md:block text-gray-500 text-right pr-2 font-bold border-b border-gray-300'>Points Par Match</span>
                  <span className='block md:hidden text-right text-gray-500 pr-4 font-bold border-b border-gray-300'>PPM</span>
                  {sortedByPPG.map((team, index) => 
                  <Link href={`/team/${team[1][1].teamSlug}`} 
                        className='flex justify-between items-center p-1 m-1 text-indigo-950 hover:bg-gray-200 transition duration-300 ease-in-out ' 
                        key={index}>
                          <div className='flex items-center'>
                            <span className='pr-2 text-gray-400'>{index + 1}.</span>
                            <Image
                                  alt={team[0]}
                                  unoptimized
                                  width="40"
                                  height="40"
                                  className='align-middle rounded-full'
                                  src={resizeImage(60, 60, team[1][1].teamLogo)}
                                />
                                <span className='px-2 overflow-hidden whitespace-nowrap'>{team[0]}</span>
                            </div>
                              <span className='px-2 text-green-700 font-bold'>{team[1][1].ppg}</span>
                    </Link>)}
                </div>
              </div>
              <div className='p-2 m-2 rounded-lg bg-white text-indigo-900 grow shadow-md'>
                <span className='font-bold text-xl px-4 text-center py-2 mb-2 block'>Leaders Defensifs</span>
                <div className='font-bold'>
                  <span className='hidden md:block text-gray-500 text-right pr-2 font-bold border-b border-gray-300'>Points Encaisses Par Match</span>
                  <span className='block md:hidden text-right text-gray-500 pr-4 font-bold border-b border-gray-300'>PEPM</span>
                  {sortedByDPPG.map((team, index) => 
                  <Link href={`/team/${team[1][1].teamSlug}`} 
                        className='flex justify-between items-center p-1 m-1 text-indigo-950 hover:bg-gray-200 transition duration-300 ease-in-out ' 
                        key={index}>
                          <div className='flex items-center'>
                            <span className='pr-2 text-gray-400'>{index + 1}.</span>
                            <Image
                                  alt={team[0]}
                                  unoptimized
                                  width="40"
                                  height="40"
                                  className='align-middle rounded-full'
                                  src={resizeImage(60, 60, team[1][1].teamLogo)}
                                />
                                <span className='px-2 overflow-hidden whitespace-nowrap'>{team[0]}</span>
                            </div>
                              <span className='px-2 text-red-700 font-bold'>{team[1][1].dppg}</span>
                    </Link>)}
                </div>
              </div>
              <div className='p-2 m-2 rounded-lg bg-white grow shadow-md'>
                <span className='font-bold text-xl px-4 text-center py-2 mb-2 block'>Leaders Differentiels</span>
                <div className='font-bold'>
                  <span className='hidden md:block text-gray-500 text-right pr-2 font-bold border-b border-gray-300'>Points Par Match</span>
                  <span className='block md:hidden text-right text-gray-500 pr-4 font-bold border-b border-gray-300'>PPM</span>
                  {sortedByDiff.map((team, index) => 
                  { let diff = (team[1][1].ppg - team[1][1].dppg).toFixed(1);
                    let text_color = diff >= 0 ? "text-green-700" : "text-red-700";
                  return <Link href={`/team/${team[1][1].teamSlug}`} 
                        className='flex justify-between items-center p-1 m-1 text-indigo-950 hover:bg-gray-200 transition duration-300 ease-in-out ' 
                        key={index}>
                          <div className='flex items-center'>
                            <span className='pr-2 text-gray-400'>{index + 1}.</span>
                            <Image
                                  alt={team[0]}
                                  unoptimized
                                  width="40"
                                  height="40"
                                  className='align-middle rounded-full'
                                  src={resizeImage(60, 60, team[1][1].teamLogo)}
                                />
                                <span className='px-2 overflow-hidden whitespace-nowrap'>{team[0]}</span>
                            </div>
                              <span className={`px-2 ${text_color} font-bold`}>{diff}</span>
                    </Link>})}
                </div>
              </div>
          </div>
          <div>
            <span className='font-bold text-xl px-4 text-center py-2 mb-2 block'>10 Plus grands Deficits</span>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {blowoutGames.map((game, index) =>{
                return <GameCard game={game} showDeficit={true} key={index}/>
              }
              )}
            </div>
          </div>
    </div>
  )
}

export default Statistics