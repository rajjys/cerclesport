import React,{useState, useEffect} from 'react'
import { GameCard } from '@/components';
import { fullForms, supportedLeagues } from '@/constants';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NoData from '@/components/NoData';
import ScheduledGameCard from '@/components/ScheduledGameCard';

const Games = () => {
    const router = useRouter();
    const [games, setGames] = useState([]);
    const [scheduledGames, setScheduledGames] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
    const [selectedDivision, setSelectedDivision] = useState("D1M");
    useEffect(() => {
      if (router.isReady){
        // Get the query parameters or use default values
      if(!router.query.league) router.query.league = JSON.parse(localStorage.getItem('league')) || 'EUBAGO';
      if(!router.query.division) router.query.division = JSON.parse(localStorage.getItem('division')) || 'D1M';
      const league = router.query.league;
      const division = router.query.division;
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
      .then(data => {
        ///We need to separate played games from Upcoming games
        let played = [], scheduled = [];
        for(let i = 0; i < data.length; i++){
          if(data[i].gameState == "Ended" || data[i].gameState == "Forfeited") played.push(data[i]);
          ///else if game is scheduled and date is later than now, push it to scheduled games
          else if(data[i].gameState == "Scheduled") {
            let dateAndTime = new Date(data[i].dateAndTime);
            if(dateAndTime > new Date()) ///add game to schedule only if it's in the future
              scheduled.unshift(data[i]);} ////Inserting at the beginning of the array
        }
        setGames(played);
        setScheduledGames(scheduled);
        console.log(scheduled);
      });
    }
    // Update the query parameters when the selected values change
    const handleChange = (e) => {
      const { name, value } = e.target
      const query = { ...router.query }
    
      if (name === 'league') {
        query.league = value
        query.division = supportedLeagues[value][0];///Reset the division dropdown when the league is changed
        localStorage.setItem('league', JSON.stringify(value));
        localStorage.setItem('division', JSON.stringify(supportedLeagues[value][0]));///Reset division preference when league changes
      } else if (name === 'division') {
        query.division = value
        localStorage.setItem('division', JSON.stringify(value));
      }
    
      router.push({
        pathname: '/schedule',
        query: query
      }, undefined, { shallow: true });
    }

    return (
      <div className='text-black'>
        <Head>
          <title>Matchs: {`${selectedLeague} - ${selectedDivision}`}</title>
        </Head>
        <div className='my-4 mx-4 py-2 bg-white rounded-lg shadow-md text-xs md:text-sm mt-4'>
          <div className='border-b border-gray-300 mx-4 px-4 my-2 font-bold text-base md:text-lg'>
             <span className='block'>{selectedLeague} 2024 - {fullForms[selectedDivision]}</span>
             <span className='block'>Tout les Matchs</span>
          </div>
           <div className='m-2'>
            <select className="py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
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
        <div>
          <span className='font-bold text-lg text-indigo-950 p-2 block text-center'>PROGRAMME</span>
          <div className='m-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            { (scheduledGames.length != 0) && scheduledGames.slice(0, 12).map((game, index) => {
                  return <ScheduledGameCard game={game} key={index} league={selectedLeague} division={selectedDivision}/>
                })
            }
          </div>
          {(scheduledGames.length == 0) && <NoData/>}
        </div>
        <div>
          <span className='font-bold text-lg text-indigo-950 p-2 block text-center'>RESULTATS</span>
          <div className='m-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            { (games.length != 0) && games.slice(0, 12).map((game, index) => {
                  return <GameCard game={game} key={index} showDeficit={false} league={selectedLeague} division={selectedDivision}/>
                })
            }
          </div>
          {(games.length == 0) && <NoData/>}  
        </div>
        
    </div>
    )
}


export default Games