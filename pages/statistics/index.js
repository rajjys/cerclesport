import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { resizeImage} from '@/utils/formatting';
import { GameCard } from '@/components';
import { fullForms, supportedLeagues } from '@/constants';
import { useRouter } from 'next/router';
import Head from 'next/head';


const Statistics = () => {
  const router = useRouter();
  const [stats, setStats] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
  const [selectedDivision, setSelectedDivision] = useState("D1M");

  useEffect(() => {
    if (router.isReady){
      // Get the query parameters or use default values
    if(!router.query.league) router.query.league = JSON.parse(localStorage.getItem('league')) || 'EUBAGO'
    if(!router.query.division) router.query.division = JSON.parse(localStorage.getItem('division')) || 'D1M';
    const league = router.query.league;
    const division = router.query.division
    
    // Set the state for the selected values
    setSelectedLeague(league)
    setSelectedDivision(division)
    // Fetch the data from a backend API or a local file
    fetchStats(league, division);
    }
  }, [router]);
  const fetchStats = async (league, division) => {
    await fetch('/api/fetchstats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ league, division })
    })
    .then(response => response.json())
    .then(data => setStats(data));
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
      pathname: '/statistics',
      query: query
    }, undefined, { shallow: true });
  }

  return (
    <div className='text-indigo-900'>
      <Head>
        <title>Statistiques: {`${selectedLeague} - ${selectedDivision}`}</title>
      </Head>
      <div className='my-4 mx-4 py-2 bg-white rounded-lg shadow-md text-black text-xs md:text-sm mt-4'>
          <div className='border-b border-gray-300 mx-4 px-4 my-2 font-bold text-base md:text-lg'>
             <span className='block'>{selectedLeague} 2024 - {fullForms[selectedDivision]}</span>
             <span className='block'>Statistiques</span>
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
      {(stats.length != 0) && <div className='flex flex-wrap'>
              <div className='p-2 m-2 rounded-lg bg-white grow shadow-md'>
                <span className='font-bold text-xl px-4 text-center py-2 mb-2 block'>Leaders Offensifs</span>
                <div className='font-bold'>
                  <span className='hidden md:block text-gray-500 text-right pr-2 font-bold border-b border-gray-300'>Points Par Match</span>
                  <span className='block md:hidden text-right text-gray-500 pr-4 font-bold border-b border-gray-300'>PPM</span>
                  {stats.ppg.map((team, index) => 
                  <Link href={`/team/24/${selectedLeague}/${selectedDivision}/${team[1][1].teamSlug}`} 
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
                  {stats.dppg.map((team, index) => 
                  <Link href={`/team/24/${selectedLeague}/${selectedDivision}/${team[1][1].teamSlug}`} 
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
                  {stats.diffppg.map((team, index) => 
                  { let diff = (team[1][1].ppg - team[1][1].dppg).toFixed(1);
                    let text_color = diff >= 0 ? "text-green-700" : "text-red-700";
                  return <Link href={`/team/24/${selectedLeague}/${selectedDivision}/${team[1][1].teamSlug}`} 
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
          </div>}
          {(stats.length != 0 ) && <div>
            <span className='font-bold text-xl px-4 text-center py-2 mb-2 block'>10 Plus grands Deficits</span>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4'>
              {stats.blowouts.map((game, index) =>{
                return <GameCard game={game} showDeficit={true} key={index} league={selectedLeague} division={selectedDivision}/>
              }
              )}
            </div>
          </div>}
    </div>
  )
}

export default Statistics