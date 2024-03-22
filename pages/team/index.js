import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import { resizeImage } from '@/utils/formatting';
import { useRouter } from 'next/router';
import { fullForms, supportedLeagues } from '@/constants';
import Head from 'next/head';

const Teams = () => {

  const [teams, setTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
  const [selectedDivision, setSelectedDivision] = useState("D1M");
  const router = useRouter();
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
      fetchTeams(league, division);
    }
  }, [router]);
  const fetchTeams = async (league, division) => {
    await fetch('/api/fetchallteams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ league, division })
    })
    .then(response => response.json())
    .then(data => setTeams(data));
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
      pathname: '/team',
      query: query
    }, undefined, { shallow: true });
  }

  return (
    <div className='text-black'>
      <Head>
          <title>Equipes: {`${selectedLeague} - ${selectedDivision}`}</title>
      </Head>
      <div className='my-4 mx-4 py-2 bg-white rounded-lg shadow-md text-xs md:text-sm mt-4'>
          <div className='border-b border-gray-300 mx-4 px-4 my-2 font-bold text-base md:text-lg'>
             <span className='block'>{selectedLeague} 2024 - {fullForms[selectedDivision]}</span>
             <span className='block'><span className='text-red-800 pr-2'>{teams.length}</span>Equipes</span>
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
        <div className='grid grid-cols-4 p-4'>
            {teams.length !=0 && teams.map((team, index) => 
                            (<Link href={`/team/24/${selectedLeague}/${selectedDivision}/${team.slug}`} className='col-span-4 md:col-span-2 lg:col-span-1 flex items-center rounded-md m-2 p-2 text-indigo-950 hover:bg-gray-200 transition duration-300 ease-in-out ' key={index}>
                                <Image
                                      alt={team.shortName}
                                      unoptimized
                                      width="30"
                                      height="30"
                                      className='align-middle rounded-full'
                                      src={resizeImage(60, 60, team.photo.url)}
                                    />
                                    <span className='px-2 overflow-hidden whitespace-nowrap font-bold'>{team.name}</span>
                                    <span className='text-gray-400 font-medium'>{`(${team.shortName})`}</span>
                            </Link>))}
      </div>
    </div>
  )
}
const divisionsNames = {
  "D1M" : "1e DIVISION - MASCULIN",
  "D1F" : "1e DIVISION - FEMININ",
  "D2M" : "2e DIVISION - MASCULIN"
 }
export default Teams