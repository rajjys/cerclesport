import React, { useEffect, useState } from 'react'
import { fetchAllGamesGQL } from '@/services';
import { gamesLocal, insert } from '@/data/games';

const Admin = () => {
    const [gamesGQL, setGamesGQL] = useState([])
    const [response, SetResponse] = useState();
    useEffect(()=>{
        fetchAllGamesGQL().then((data) => setGamesGQL(data))
    }, []);

    const insertGamesLocal = async ()=>{
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
       else SetResponse("Nothing to insert")
    }
    const deleteAllDBGames = async ()=>{
        
    }
  return (
    <div>
        <div className='bg-white text-black text-md rounded m-4 p-2'>
            
            <span className='block mb-2'>GQL Games: <span>{`${gamesGQL.length}`}</span></span>
            <button className='rounded border border-gray-300 p-2 m-2 text-black bg-white' onClick={insertGamesLocal}>Up DB</button>
            <button className='rounded border border-gray-300 p-2 m-2 text-black bg-white' onClick={deleteAllDBGames}>Del MongoDB</button>
            <span className='p-2 m-2 border border-gray-300 block'>{response}</span>
        </div>
    </div>
  )
}

export default Admin
