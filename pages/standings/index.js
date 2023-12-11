import { StandingsTable } from '@/components';
import React, {useState, useEffect} from 'react';
import { getGamesByTeams, addWinLossEntries, addTeamStats, sortTeamsByAStat} from '@/utils/gameFunctions';
import { divisionsNames } from '@/constants';


const Standings = () => {
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

  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  const gamesByTeams = getGamesByTeams(games); ///Assigning games by each team
  const gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
  const gamesWithTeamStats = addTeamStats(gamesAndPoints); ///Adding stats per team like Wins, Losses, Last5 streak,...
  const sortedGames = sortTeamsByAStat(gamesWithTeamStats, "points"); ///Returns the equivalent array, sorted by points, wins or points scored difference 
  return (
    <div className='text-black'>
      <div className='my-4 mx-4 py-2 bg-white rounded-lg shadow-md text-xs md:text-sm mt-4'>
          <div className='border-b border-gray-300 mx-4 px-4 my-2 font-bold text-base md:text-lg'>
             <span className='block'>{selectedLeague} 2024 - {divisionsNames[selectedDivision]}</span>
             <span className='block'>Classement</span>
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
      <div className='grid place-items-center overflow-auto mb-4'>
          <StandingsTable standingsArray={sortedGames}/>
      </div>
      <div className='text-xs text-black flex flex-wrap justify-between mb-4 pb-4 border-b border-gray-300'>
        <span className='px-2 whitespace-nowrap'><b>MJ</b>: Matchs Joués</span>
        <span className='px-2 whitespace-nowrap'><b>V</b>: Victoires</span>
        <span className='px-2 whitespace-nowrap'><b>D</b>: Defaites</span>
        <span className='px-2 whitespace-nowrap'><b>F</b>: Forfaits</span>
        <span className='px-2 whitespace-nowrap'><b>PTS</b>: Points</span>
        <span className='px-2 whitespace-nowrap'><b>POUR</b>: Points marqués</span>
        <span className='px-2 whitespace-nowrap'><b>CONTRE</b>: Points Encaissés</span>
        <span className='px-2 whitespace-nowrap'><b>DIFF</b>: difference des points</span>
        <span className='px-2 whitespace-nowrap'><b>LAST5</b>: 5 derniers matchs</span>
      </div>
    </div>
  )
 
}
export default Standings