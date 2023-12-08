import { fetchAllTeams } from '@/services/gqlBlogRequests';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import { resizeImage } from '@/utils/formatting';

const Teams = () => {

  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const fetchTeams = async () => {
      await fetch('/api/fetchallteams')
      .then(response => response.json())
      .then(data => setTeams(data));
    }
    fetchTeams();
  }, []);
  console.log(teams);
  return (
    teams.length == 0 ?
    <p className='text-black'> Loading</p> :
    <div className='text-black text-sm md:text-base pt-4'>
      <span className='text-xl font-bold text-indigo-900 m-8'>Equipes Division 1 - Version Masculin</span>
      <div className='grid grid-cols-4 p-4'>
        {teams.map((team, index) => 
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

export default Teams