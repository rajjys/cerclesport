import { fetchGamesFromGQL, fetchTeamsFromGQL } from '@/services/gqlGameRequests';
import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'

const Admin = () => {
    const [status, setStatus] = useState("Up To Date");
    const [selectedLeague, setSelectedLeague] =  useState("EUBAGO");
////Games
    const [gamesd1mGQL, setGamesd1mGQL] = useState([]);
    const [gamesd1fGQL, setGamesd1fGQL] = useState([]);
    const [gamesd2mGQL, setGamesd2mGQL] = useState([]);
    const [gamesd1mMongo, setGamesd1mMongo] = useState([]);
    const [gamesd1fMongo, setGamesd1fMongo] = useState([]);
    const [gamesd2mMongo, setGamesd2mMongo] = useState([]);
////Teams
    const [teamsd1mGQL, setTeamsd1mGQL] = useState([]);
    const [teamsd1fGQL, setTeamsd1fGQL] = useState([]);
    const [teamsd2mGQL, setTeamsd2mGQL] = useState([]);
    const [teamsd1mMongo, setTeamsd1mMongo] = useState([]);
    const [teamsd1fMongo, setTeamsd1fMongo] = useState([]);
    const [teamsd2mMongo, setTeamsd2mMongo] = useState([]);

    useEffect(() => {
        ///Fetching games from MongoDB
        fetchGames(selectedLeague, "D1M");
        fetchGames(selectedLeague, "D1F");
        fetchGames(selectedLeague, "D2M");
        ///Fetching Games from Hygraph
        fetchGamesFromGQL(selectedLeague, "D1M").then(data => setGamesd1mGQL(data));
        fetchGamesFromGQL(selectedLeague, "D1F").then(data => setGamesd1fGQL(data));
        fetchGamesFromGQL(selectedLeague, "D2M").then(data => setGamesd2mGQL(data));
        ///Fetching teams from MongoDB
        fetchTeams(selectedLeague, "D1M");
        fetchTeams(selectedLeague, "D1F");
        fetchTeams(selectedLeague, "D2M");
        ///Fetching Games from Hygraph
        fetchTeamsFromGQL(selectedLeague, "D1M").then(data => setTeamsd1mGQL(data));
        fetchTeamsFromGQL(selectedLeague, "D1F").then(data => setTeamsd1fGQL(data));
        fetchTeamsFromGQL(selectedLeague, "D2M").then(data => setTeamsd2mGQL(data));

    }, [selectedLeague]);

    const fetchGames = async (league, division) => {
        await fetch('/api/fetchallgames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ division, league})
        })
        .then(response => response.json())
        .then(data => {
              switch(division){
                case "D1M": setGamesd1mMongo(data);break;
                case "D1F": setGamesd1fMongo(data);break;
                case "D2M": setGamesd2mMongo(data);break;
              }
          }
        );
      }
      const fetchTeams = async (league, division) => {
        await fetch('/api/fetchallteams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ division, league})
        })
        .then(response => response.json())
        .then(data => {
              switch(division){
                case "D1M": setTeamsd1mMongo(data);break;
                case "D1F": setTeamsd1fMongo(data);break;
                case "D2M": setTeamsd2mMongo(data);break;
              }
          }
        );
      }
     
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedLeague(value);
      }
  return (
        <div className='text-black m-4 bg-white'>
            <div className='flex justify-center flex-wrap'>
                <select className="block py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
                    onChange={handleChange} name='league' id='league'>
                    <option value="EUBAGO">EUBAGO - Goma</option>
                    <option value="EUBABUK">EUBABUK - Bukavu</option>
                </select>
                <div className='p-2'>
                    <span className='py-2 px-4 font-bold mr-4'>{selectedLeague}</span>
                    <span className='font-bold py-2 px-4 text-green-700'>{status}</span>
                </div>
            </div>
            
            <div className='text-lg m-2 pb-4'>
                <div className='flex flex-wrap justify-around mb-4'>
                    <div>
                    <span className='font-bold text-xl text-center'>MATCHS</span>
                        <table>
                            <thead>
                                <tr className=' border border-gray-300'>
                                    <th className='px-2 border-r border-gray-300'>Division</th>
                                    <th className='px-2 border-r border-gray-300'>HygraphDB</th>
                                    <th className='px-2 border-r border-gray-300'>MongoDB</th>
                                    <th className='px-2'>difference</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=' border border-gray-300'>
                                    <td className='border-r border-gray-300'>D1M</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd1mGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd1mMongo.length}</td>
                                    <td className='text-center'>{ArraysEqual(gamesd1mGQL, gamesd1mMongo)}</td>
                                </tr>
                                <tr className=' border border-gray-300'>
                                    <td className='border-r border-gray-300'>D1F</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd1fGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd1fMongo.length}</td>
                                    <td className='text-center'>{ArraysEqual(gamesd1fGQL, gamesd1fMongo)}</td>
                                </tr>
                                <tr className='border border-gray-300'>
                                    <td className='border-r border-gray-300'>D2M</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd2mGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd2mMongo.length}</td>
                                    <td className='text-center'>{ArraysEqual(gamesd2mGQL, gamesd2mMongo)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                    <span>EQUIPES</span>
                    <table>
                            <thead>
                                <tr className=' border border-gray-300'>
                                    <th className='px-2 border-r border-gray-300'>Division</th>
                                    <th className='px-2 border-r border-gray-300'>HygraphDB</th>
                                    <th className='px-2 border-r border-gray-300'>MongoDB</th>
                                    <th className='px-2'>difference</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=' border border-gray-300'>
                                    <td className='border-r border-gray-300'>D1M</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd1mGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd1mMongo.length}</td>
                                    <td className='text-center'>{ArraysEqual(teamsd1mGQL, teamsd1mMongo)}</td>
                                </tr>
                                <tr className=' border border-gray-300'>
                                    <td className='border-r border-gray-300'>D1F</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd1fGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd1fMongo.length}</td>
                                    <td className='text-center'>{ArraysEqual(teamsd1fGQL, teamsd1fMongo)}</td>
                                </tr>
                                <tr className='border border-gray-300'>
                                    <td className='border-r border-gray-300'>D2M</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd2mGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd2mMongo.length}</td>
                                    <td className='text-center'>{ArraysEqual(teamsd2mGQL, teamsd2mMongo)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button onClick={()=>{}} type='button'
                    className='block w-full pselect-none rounded-full bg-gradient-to-tr from-gray-900 
                    to-gray-700 py-3 text-center align-middle font-sans text-lg font-bold uppercase 
                    text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg 
                    hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none 
                    disabled:opacity-50 disabled:shadow-none'>
                        Update Database Content</button>
            </div>
        </div>
  )
}
const ArraysEqual = (arr1, arr2) => {
    if(JSON.stringify(arr1) === JSON.stringify(arr2))
    return <span className='text-green-700'>Up To Date</span>;
    else return <span className='text-red-700'>Modified</span>;
}
    

export default Admin