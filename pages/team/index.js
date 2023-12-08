import { fetchAllTeams } from '@/services/gqlBlogRequests';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import { resizeImage } from '@/utils/formatting';

const Teams = () => {

  const [teams, setTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
  const [selectedDivision, setSelectedDivision] = useState("D1M");

  useEffect(() => {
    const fetchTeams = async () => {
      await fetch('/api/fetchallteams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ division: selectedDivision,league: selectedLeague})
      })
      .then(response => response.json())
      .then(data => setTeams(data));
    }
    fetchTeams();
  }, [selectedDivision, selectedLeague]);

  return (
    <div className='text-black'>
      <div className='my-4 mx-4 py-2 bg-white rounded-lg shadow-md'>
          <div className='border-b border-gray-300 mx-4 px-4 my-2 font-bold text-lg'>
             <span className='block'>{selectedLeague} 2024 - {divisionsNames[selectedDivision]}</span>
             <span className='block'>Equipes</span>
          </div>
           <div className='m-2'>
            <select className=" py-2 px-4 mx-4 bg-gray-200 rounded-md"
                  onChange={(event) => setSelectedLeague(event.target.value)}>
                  <option value="EUBAGO">EUBAGO - Goma</option>
            </select>
            <select id="division" className="py-2 px-4 mx-4 bg-gray-200 rounded-md"
                onChange={(event) => setSelectedDivision(event.target.value)}>
                <option value="D1M">1ere Division - M</option>
                <option value="D1F">1ere Division - F</option>
                <option value="D2M">2e Division - M</option>
            </select>
           </div>
        </div>
        <div className='grid grid-cols-4 p-4'>
            {teams.length !=0 && teams.map((team, index) => 
                            (<Link href={`/team/${team.slug}`} className='col-span-4 md:col-span-2 lg:col-span-1 flex items-center rounded-md m-2 p-2 text-indigo-950 hover:bg-gray-200 transition duration-300 ease-in-out ' key={index}>
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