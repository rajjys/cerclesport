import React, { useEffect, useState } from 'react'
import { fetchAllGamesGQL, fetchAllStadiums, fetchAllTeams } from '@/services';

const Admin = () => {
    const [gamesGQL, setGamesGQL] = useState([]);
    const [teams, setTeams] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [response, SetResponse] = useState();

    useEffect(()=>{
        fetchAllGamesGQL().then((data) => setGamesGQL(data));
        fetchAllTeams().then((data) => setTeams(data));
        fetchAllStadiums().then((data) => setStadiums(data));
    }, []);

    const updateGamesLocal = async ()=>{
       if(gamesGQL.length != 0){
        ///insert games into the file
        SetResponse("Inserting...");
        const result = await fetch('/api/storegames', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(gamesGQL)
          });
          const data = await result.json();
          SetResponse(data.message);
       }
       else SetResponse("Nothing to update")
    }
    const updateTeamsLocal = async ()=>{
        if(teams.length != 0){
         ///insert games into the file
         SetResponse("Inserting...");
         const result = await fetch('/api/storeteams', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(teams)
           });
           const data = await result.json();
           SetResponse(data.message);
        }
        else SetResponse("Nothing to update")
     }
     const updateStadiumsLocal = async ()=>{
        if(stadiums.length != 0){
         ///insert games into the file
         SetResponse("Inserting...");
         const result = await fetch('/api/storestadiums', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(stadiums)
           });
           const data = await result.json();
           SetResponse(data.message);
        }
        else SetResponse("Nothing to update")
     }
  return (
    <div>
        <span className='bold text-lg bg-white text-black rounded p-2 m-2 block'>{response}</span>
        <div className='bg-white text-black text-md rounded m-4 p-2'>
            <span className='block mb-2'>Games from graphcms: <span>{`${gamesGQL.length}`}</span></span>
            <button className='rounded-full  border border-gray-300 p-2 m-2 text-white bold bg-pink-400' onClick={updateGamesLocal}>Update games local</button>
        </div>
        <div className='bg-white text-black text-md rounded m-4 p-2'>
            <span className='block mb-2'>Teams from graphcms: <span>{`${teams.length}`}</span></span>
            <button className='rounded-full  border border-gray-300 p-2 m-2 text-white bold bg-pink-400' onClick={updateTeamsLocal}>Update teams local</button>
        </div>
        <div className='bg-white text-black text-md rounded m-4 p-2'>
            <span className='block mb-2'>Stadiums from graphcms: <span>{`${stadiums.length}`}</span></span>
            <button className='rounded-full  border border-gray-300 p-2 m-2 text-white bold bg-pink-400' onClick={updateStadiumsLocal}>Update stadiums local</button>
        </div>
    </div>
  )
}

export default Admin
