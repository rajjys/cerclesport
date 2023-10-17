import React, { useEffect, useState } from 'react'
import { fetchAllGamesGQL } from '@/services';

const Admin = () => {
    const [dbGames, setdbGames] = useState([]);
    const [gqlGames, setgqlGames] = useState([])
    const [response, setResponse] = useState();
    useEffect(()=>{
        fetchAllGamesGQL().then((data) => setgqlGames(data))
        async function fetchDBGames(){
            const response = await fetch('/api/fetchgames');
            const data = await response.json();
            setdbGames(data);
        };
        fetchDBGames();
        console.log(gqlGames);
        console.log(dbGames);
    }, []);

    
    

    const updateGamesDB = async ()=>{
        deleteAllDBGames();
        insertGamesGQLtoDB()
    }
    const insertGamesGQLtoDB = async ()=>{
        if(dbGames.length != 0){
            const res = await fetch('/api/insert-data', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(gqlGames),
              });
              setResponse(res);
        }
        else{
            setResponse("Nothing to insert");
        }  
    }
    const deleteAllDBGames = async ()=>{
        
    }
  return (
    <div>
        <div className='bg-white text-black text-md rounded m-4 p-2'>
            <span className='block mb-2'>MongoDB Games: <span>{`${dbGames.length}`}</span></span>
            <span className='block mb-2'>GQL DB Games: <span>{`${gqlGames.length}`}</span></span>
            <button className='rounded border border-gray-300 p-2 m-2 text-black bg-white' onClick={updateGamesDB}>Up DB</button>
            <button className='rounded border border-gray-300 p-2 m-2 text-black bg-white' onClick={deleteAllDBGames}>Del MongoDB</button>
            <span className='bold text-lg p-4 block'>{response}</span>
        </div>
    </div>
  )
}

export default Admin
