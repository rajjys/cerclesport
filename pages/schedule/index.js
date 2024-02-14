import React,{useState, useEffect} from 'react'
import { GameCard } from '@/components';
import { fullForms, supportedLeagues } from '@/constants';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Games = () => {
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
        query.league = value
        query.division = supportedLeagues[value][0];///Reset the division dropdown when the league is changed
      } else if (name === 'division') {
        query.division = value
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
        
        <div className='m-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        { (games.length != 0) && games.map((game, index) => {
               return <GameCard game={game} key={index} showDeficit={false} 
                                league={selectedLeague} division={selectedDivision}/>
             })
            }
      </div>
    </div>
    )
}


export default Games