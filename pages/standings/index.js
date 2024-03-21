import { StandingsTable } from '@/components';
import React, {useState, useEffect} from 'react';
import { fullForms, supportedLeagues } from '@/constants';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NoData from '@/components/NoData';


const Standings = () => {
  const router = useRouter();
  const [standings, setStandings] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
  const [selectedDivision, setSelectedDivision] = useState("D1M");
  useEffect(() => {
    if (router.isReady){
      // Get the query parameters or use default values
    if(!router.query.league) router.query.league = JSON.parse(localStorage.getItem('league')) || 'EUBAGO';
    if(!router.query.division) router.query.division = JSON.parse(localStorage.getItem('division')) || 'D1M';
    const league = router.query.league;
    const division = router.query.division || 'D1M';
    // Set the state for the selected values
    setSelectedLeague(league)
    setSelectedDivision(division)
    // Fetch the data from a backend API or a local file
    fetchStandings(league, division);
    }
  }, [router]);
  const fetchStandings = async (league, division) => {
    await fetch('/api/fetchstandings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ league, division })
    })
    .then(response => response.json())
    .then(data => setStandings(data));
  }
  // Update the query parameters when the selected values change
  const handleChange = (e) => {
    const { name, value } = e.target
    const query = { ...router.query }
    if (name === 'league') {
      query.league = value;
      query.division = supportedLeagues[value][0];
      localStorage.setItem('league', JSON.stringify(value));
      localStorage.setItem('division', JSON.stringify(supportedLeagues[value][0]));///Reset division preference when league changes
    } else if (name === 'division') {
      query.division = value
      localStorage.setItem('division', JSON.stringify(value));
    }
  
    router.push({
      pathname: '/standings',
      query: query
    }, undefined, { shallow: true });
  }

  return (
    <div className='text-black'>
      <Head>
        <title>Classement: {`${selectedLeague} - ${selectedDivision}`}</title>
      </Head>
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
          {(standings.length != 0) && <StandingsTable standingsArray={standings} league={selectedLeague} division={selectedDivision}/>}
          {(standings.length == 0) && <NoData/>} 
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