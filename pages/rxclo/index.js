import React, { useEffect, useState } from 'react'
import { 
  fetchGamesFromGQL, 
  fetchStadiumsFromGQL, 
  fetchTeamsFromGQL} from '@/services/gqlGameRequests';

const Admin = () => {
    const [gamesD1M, setGamesD1M] = useState([]);
    const [gamesD2M, setGamesD2M] = useState([]);
    const [gamesD1F, setGamesD1F] = useState([]);
    const [teamsD1M, setTeamsD1M] = useState([]);
    const [teamsD2M, setTeamsD2M] = useState([]);
    const [teamsD1F, setTeamsD1F] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
    const [response, SetResponse] = useState();

    useEffect(()=>{
        fetchStadiumsFromGQL("EUBAGO").then((data) => setStadiums(data));
        
        fetchGamesFromGQL("EUBAGO", "D1M").then((data) => setGamesD1M(data));
        fetchGamesFromGQL("EUBAGO", "D1F").then((data) => setGamesD1F(data));
        fetchGamesFromGQL("EUBAGO", "D2M").then((data) => setGamesD2M(data));

        fetchTeamsFromGQL("EUBAGO", "D1M").then((data) => setTeamsD1M(data));
        fetchTeamsFromGQL("EUBAGO", "D1F").then((data) => setTeamsD1F(data));
        fetchTeamsFromGQL("EUBAGO", "D2M").then((data) => setTeamsD2M(data));
    }, [selectedLeague]);

    const updateGamesLocal = async ( league, division )=>{
       if(division == "D1M" && gamesD1M.length == 0) return;
       if(division == "D1F" && gamesD1F.length == 0) return;
       if(division == "D2M" && gamesD2M.length == 0) return;
       
        ///insert games into the file
        SetResponse("Inserting...");
        const result = await fetch('/api/storegamesdb', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              division,
              league,
              games:  division == "D1M" ? gamesD1M : 
                     (division == "D1F" ? gamesD1F : 
                     (division == "D2M" ? gamesD2M : null))
            })
          });
          const data = await result.json();
          SetResponse(data.message);
       }
    const updateTeamsLocal = async ( league, division )=>{
      if(division == "D1M" && teamsD1M.length == 0) return;
      if(division == "D1F" && teamsD1F.length == 0) return;
      if(division == "D2M" && teamsD2M.length == 0) return;
      
       ///insert teams into the file
       SetResponse("Inserting...");
       const result = await fetch('/api/storeteamsdb', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             division,
             league,
             teams:  division == "D1M" ? teamsD1M : 
                    (division == "D1F" ? teamsD1F : 
                    (division == "D2M" ? teamsD2M : null))
           })
         });
         const data = await result.json();
         SetResponse(data.message);
     }
    const updateStadiumsLocal = async ( league )=>{
        if(stadiums.length != 0){
         ///insert games into the file
         SetResponse("Inserting...");
         const result = await fetch('/api/storestadiums', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({league, stadiums})
           });
           const data = await result.json();
           SetResponse(data.message);
        }
        else SetResponse("Nothing to update")
     }
  return (
    <div className='text-black m-4'>
        <span className='block text-center text-2xl font-bold my-2 py-2 border-b border-gray-300'>Data Management Board</span>
        <select className="block text-pink-900 py-2 px-4 mx-auto text-center"
           onChange={(event) => setSelectedLeague(event.target.value)}>
           <option value="EUBAGO">EUBAGO - Goma</option>
      </select>
        <span className='block text-center font-bold py-4 text-xl text-red-900 font-bold'>{response}</span>
        <div className='flex justify-between'>
          <div className='border border-gray-300 rounded-md p-2 m-2'>
            <span className='font-bold border-b border-gray-400'><span>{selectedLeague}</span> - 1ere Division - Version Masculine</span>
            <div className='py-2 px-2 mt-2 flex justify-between items-center'>
               <span>Equipes(graphcms):<span className='font-bold pl-2'>{teamsD1M.length}</span></span>
               <button  onClick={() => updateTeamsLocal("EUBAGO", "D1M")} className='text-white bg-pink-400 rounded-md p-2 ml-2'>Update Local DB</button>
            </div>
            <div className='py-2 px-2 mt-2 flex justify-between items-center'>
               <span>Matchs(graphcms):<span className='font-bold pl-2'>{gamesD1M.length}</span></span>
               <button onClick={() => updateGamesLocal("EUBAGO", "D1M")} className='text-white bg-pink-400 rounded-md p-2 ml-2'>Update Local DB</button>
            </div>
          </div>
          <div className='border border-gray-300 rounded-md p-2 m-2'>
            <span className='font-bold border-b border-gray-400'><span>{selectedLeague}</span> - 1ere Division - Version Feminine</span>
            <div className='py-2 px-2 mt-2 flex justify-between items-center'>
               <span>Equipes(graphcms):<span className='font-bold pl-2'>{teamsD1F.length}</span></span>
               <button  onClick={() => updateTeamsLocal("EUBAGO", "D1F")} className='text-white bg-pink-400 rounded-md p-2 ml-2'>Update Local DB</button>
            </div>
            <div className='py-2 px-2 mt-2 flex justify-between items-center'>
               <span>Matchs(graphcms):<span className='font-bold pl-2'>{gamesD1F.length}</span></span>
               <button onClick={() => updateGamesLocal("EUBAGO", "D1F")} className='text-white bg-pink-400 rounded-md p-2 ml-2'>Update Local DB</button>
            </div>
          </div>
          <div className='border border-gray-300 rounded-md p-2 m-2'>
            <span className='font-bold border-b border-gray-400'><span>{selectedLeague}</span> - 2eme Division - Version Masculine</span>
            <div className='py-2 px-2 mt-2 flex justify-between items-center'>
               <span>Equipes(graphcms):<span className='font-bold pl-2'>{teamsD2M.length}</span></span>
               <button  onClick={() => updateTeamsLocal("EUBAGO", "D2M")} className='text-white bg-pink-400 rounded-md p-2 ml-2'>Update Local DB</button>
            </div>
            <div className='py-2 px-2 mt-2 flex justify-between items-center'>
               <span>Matchs(graphcms):<span className='font-bold pl-2'>{gamesD2M.length}</span></span>
               <button onClick={() => updateGamesLocal("EUBAGO", "D2M")} className='text-white bg-pink-400 rounded-md p-2 ml-2'>Update Local DB</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Admin
