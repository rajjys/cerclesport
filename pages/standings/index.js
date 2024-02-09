import { StandingsTable } from '@/components';
import React, {useState, useEffect} from 'react';
import { getGamesByTeams, addWinLossEntries, addTeamStats, sortTeamsByAStat} from '@/utils/gameFunctions';
import { fullForms, supportedLeagues } from '@/constants';
import { useRouter } from 'next/router';


const Standings = () => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
  const [selectedDivision, setSelectedDivision] = useState("D1M");
  useEffect(() => {
    if (router.isReady){
      // Get the query parameters or use default values
    const league = router.query.league || 'EUBAGO'
    const division = router.query.division || 'D1M'
    // Set the state for the selected values
    setSelectedLeague(league)
    setSelectedDivision(division)
    // Fetch the data from a backend API or a local file
    fetchGames(league, division);
    }
  }, [router]);
  const fetchGames = async (league, division) => {
    await fetch('/api/fetchallgames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ league, division })
    })
    .then(response => response.json())
    .then(data => setGames(data));
  }
  // Update the query parameters when the selected values change
  const handleChange = (e) => {
    const { name, value } = e.target
    const query = { ...router.query }
  
    if (name === 'league') {
      query.league = value;
      query.division = supportedLeagues[value][0];
    } else if (name === 'division') {
      query.division = value
    }
  
    router.push({
      pathname: '/standings',
      query: query
    }, undefined, { shallow: true });
  }

  const gamesByTeams = getGamesByTeams(games); ///Assigning games by each team
  const gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
  const gamesWithTeamStats = addTeamStats(gamesAndPoints); ///Adding stats per team like Wins, Losses, Last5 streak,...
  const sortedGames = sortTeamsByAStat(gamesWithTeamStats, "points"); ///Returns the equivalent array, sorted by points, wins or points scored difference 
  return (
    <div className='text-black'>
      <div className='my-4 mx-4 py-2 bg-white rounded-lg shadow-md text-xs md:text-sm mt-4'>
          <div className='border-b border-gray-300 mx-4 px-4 my-2 font-bold text-base md:text-lg'>
             <span className='block'>{selectedLeague} 2024 - {fullForms[selectedDivision]}</span>
             <span className='block'>Classement</span>
          </div>
           <div className='m-2'>
            <select className=" py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
                  onChange={handleChange} name='league' id='league' value={selectedLeague}>
                  { Object.keys(supportedLeagues).
                           map((league, index) =><option value={league} key={index}>{fullForms[league]}</option>)
                    }
            </select>
            <select className="py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
                onChange={handleChange} name='division' id='division' value={selectedDivision}>
                {supportedLeagues[selectedLeague].
                map((division, index)=><option value={division} key={index}>{fullForms[division]}</option>)}
            </select>
           </div>
        </div>
      <div className='grid place-items-center overflow-auto mb-4'>
          {(games.length != 0) && <StandingsTable standingsArray={sortedGames} league={selectedLeague} division={selectedDivision}/>}
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