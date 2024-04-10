import { fullForms, supportedLeagues } from '@/constants';
import { fetchGamesFromGQL, fetchTeamsFromGQL } from '@/services/gqlGameRequests';
import { addTeamStats, addWinLossEntries, getBlowoutGames, getGamesByTeams, sortTeamsByAStat, sortTeamsByDiff } from '@/utils/gameFunctions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Admin = () => {

    const router = useRouter();
    const [selectedLeague, setSelectedLeague] =  useState();
    const [showProcessModal, setShowProcessModal] = useState(false);
    const [processState, setProcessState] = useState([]);
    const [modifedTeams, setModifiedTeams] = useState([]);
    const [modifedGames, setModifiedGames] = useState([]);
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
        if(router.isReady)
        {   
            if(!router.query.league) router.query.league = JSON.parse(localStorage.getItem('league')) || 'EUBAGO';;
            const league = router.query.league;
            setSelectedLeague(league);
            ///Initialize every state array
            setProcessState([]);
            setModifiedGames([]);
            setModifiedTeams([]);
            setGamesd1fMongo([]);
            setGamesd1mMongo([]);
            setGamesd2mMongo([]);
            setTeamsd1fMongo([]);
            setTeamsd1mMongo([]);
            setTeamsd2mMongo([]);
            setGamesd1fGQL([]);
            setGamesd1mGQL([]);
            setGamesd2mGQL([]);
            setTeamsd1fGQL([]);
            setTeamsd1mGQL([]);
            setTeamsd2mGQL([]);
            ///Fetching data from MongoDB synchrounously
                      fetchGamesFromMongo(league, "D1M")
            .then(()=>fetchGamesFromMongo(league, "D1F"))
            .then(()=>fetchGamesFromMongo(league, "D2M"))
            .then(()=>fetchTeamsFromMongo(league, "D1M"))
            .then(()=>fetchTeamsFromMongo(league, "D1F"))
            .then(()=>fetchTeamsFromMongo(league, "D2M"))
            .then(()=>
            ///Fetching Games from Hygraph synchronously to avoid TooManyRequests Exception/Error
                    fetchGamesFromGQL(league, "D1M").then(data => setGamesd1mGQL(data)))
                .then(()=> 
                    fetchGamesFromGQL(league, "D1F").then(data => setGamesd1fGQL(data)))
                .then(()=>
                    fetchGamesFromGQL(league, "D2M").then(data => setGamesd2mGQL(data)))
                .then(()=>    ////Fetching Teams from GQL
                    fetchTeamsFromGQL(league, "D1M").then(data =>setTeamsd1mGQL(data)))
                .then(()=>
                    fetchTeamsFromGQL(league, "D1F").then(data => setTeamsd1fGQL(data)))
                .then(()=>
                    fetchTeamsFromGQL(league, "D2M").then(data => setTeamsd2mGQL(data)));
        }
    }, [router]);
    useEffect(() => updateModifiedFields(), 
    [gamesd1fGQL, gamesd1fMongo, gamesd1mGQL,gamesd1mMongo,gamesd2mGQL,gamesd2mMongo, 
    teamsd1fMongo, teamsd1fGQL, teamsd1mGQL, teamsd1mMongo, teamsd2mGQL, teamsd2mMongo])
    const fetchGamesFromMongo = async (league, division) => {
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
    const fetchTeamsFromMongo = async (league, division) => {
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
        const query = { ...router.query }
        if (name === 'league') {
        query.league = value;
        localStorage.setItem('league', JSON.stringify(value));
        }
        router.push({
            pathname: '/amind',
            query: query
          }, undefined, { shallow: true });
      }
    const handleClick = async() => {
        setProcessState([]);
        setShowProcessModal(true);
        ///Update games object. Write the games data from GQL into MongoDB
        if(modifedGames.length != 0){
            modifedGames.map(division => {
                ///Choose games source from division
                let games = division == "D1M" ? gamesd1mGQL : 
                           (division == "D1F" ? gamesd1fGQL : 
                           (division == "D2M" ? gamesd2mGQL : null))
                ///Depending on which fields were modified(game fields), 
                ///generate data for standings, stats and blowouts games
                ///Generate standings for this division
                let gamesByTeams = getGamesByTeams(games); ///Assigning games by each team
                let gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
                let gamesWithTeamStats = addTeamStats(gamesAndPoints); ///Adding stats per team. Wins, Losses, Last5streak,...
                let standings = sortTeamsByAStat(gamesWithTeamStats, "points"); ///Returns the equivalent array, sorted by points, wins or points scored difference 
                ///Generate team stats
                let statsByPPG = sortTeamsByAStat(gamesWithTeamStats, "ppg");/// points per game
                let statsByDPPG = sortTeamsByAStat(gamesWithTeamStats, "dppg").reverse(); ///points conceided per game
                let statsByDiff = sortTeamsByDiff(gamesWithTeamStats); ///Differential
                let blowoutGames = getBlowoutGames(games); ///Games with the biggest margins the whole season
                ///Generate player stats
                ///We have 3 sets: Top volume scorer, Best PPG,  
                ///Most 3PT Made, Most 2PT made, Most Free throws made 
                ////Best volume Shooter
                ///This will only be evaluated  for D1M
                let stats = {
                        ppg: statsByPPG,
                        dppg : statsByDPPG,
                        diffppg : statsByDiff,
                        blowouts: blowoutGames
                    }
                          storeGamesToMongoDB(selectedLeague, division)
                .then(()=>storeStandingsToMongoDB(selectedLeague, division, standings))
                .then(()=>storeStatsToMongoDB(selectedLeague, division, stats));
            });
                
        }
            ///Update teams object. Write the teams data from GQL into MongoDB
        if(modifedTeams.length != 0){
                modifedTeams.map(division => {
                    storeTeamsToMongoDB(selectedLeague, division)}
                )
            }
    }
    const storeGamesToMongoDB = async ( league, division) => {
         ///stores games data of specific division from GQL to MongoDB
         const result = await fetch('/api/storegames', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               division,
               league,
               games : division == "D1M" ? gamesd1mGQL : 
                      (division == "D1F" ? gamesd1fGQL : 
                      (division == "D2M" ? gamesd2mGQL : null))
             })
           }).then(result => result.json()).then((data)=>{
                if(data.message == "ok"){
                    setProcessState([...processState, "Updated Games for: " + fullForms[division]]);
                }
                else setProcessState([...processState, "Failed to update Games for: " + fullForms[division]]);
              }   
           );
        }
    const storeTeamsToMongoDB = async ( league, division) => {
            ///stores games data of specific division from GQL to MongoDB
            const result = await fetch('/api/storeteams', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  division,
                  league,
                  teams: division == "D1M" ? teamsd1mGQL : 
                        (division == "D1F" ? teamsd1fGQL : 
                        (division == "D2M" ? teamsd2mGQL : null))
                })
              }).then(result => result.json()).then((data)=>{
                   if(data.message == "ok"){
                    setProcessState([...processState, "Updated Teams for: " + fullForms[division]]);
                   }
                   else setProcessState([...processState, "Failed to Update Teams for: " + fullForms[division]]);
                 }
              );
           }
    const storeStandingsToMongoDB = async (league, division, standings) => {
            ///store computed "standings" data of specific division from to MongoDB, from GQL
            const result = await fetch('/api/storestandings', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  division,
                  league,
                  standings
                })
              }).then(result => result.json()).then((data)=>{
                   if(data.message == "ok"){
                    setProcessState([...processState, "Updated Standings for: " + fullForms[division]]);
                   }
                   else setProcessState([...processState, "Failed to Update Standings for: " + fullForms[division]]);
                 }
              );         
        }
    const storeStatsToMongoDB = async( league, division, stats) => {
                ///stores games data of specific division from GQL to MongoDB
            const result = await fetch('/api/storestats', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  division,
                  league,
                  stats
                })
              }).then(result => result.json()).then((data)=>{
                   if(data.message == "ok"){
                    setProcessState([...processState, "Updated Stats for: " + fullForms[division]]);
                   }
                   else setProcessState([...processState, "Fail to Update Stats for: " + fullForms[division]]);
                 }
              );
         
            }
    function updateModifiedFields(){
        let teams = [], games = [];
        if(!ArraysEqual(gamesd1mGQL, gamesd1mMongo)) games.push("D1M");
        if(!ArraysEqual(gamesd1fGQL, gamesd1fMongo)) games.push("D1F");
        if(!ArraysEqual(gamesd2mGQL, gamesd2mMongo)) games.push("D2M");
        if(!ArraysEqual(teamsd1mGQL, teamsd1mMongo)) teams.push("D1M");
        if(!ArraysEqual(teamsd1fGQL, teamsd1fMongo)) teams.push("D1F");
        if(!ArraysEqual(teamsd2mGQL, teamsd2mMongo)) teams.push("D2M");
        setModifiedGames(games);
        setModifiedTeams(teams);
      }
    return (
        <div className='text-black m-4 bg-white'>
            <div className='flex justify-center flex-wrap'>
                <select className="block py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
                    onChange={handleChange} name='league' id='league' value={selectedLeague}>
                    { Object.keys(supportedLeagues).
                             map((league, index) =>
                                    <option value={league} key={index}>{fullForms[league]}</option>)
                    }
                </select>
                <div className='p-2'>
                    <span className='py-2 px-4 font-bold mr-4'>{selectedLeague}</span>
                    {(modifedGames.length == 0 && modifedTeams.length == 0) && 
                        <span className='text-green-700 font-bold px-4'>MongoDB is Up To Date with Hygraph Content</span>}
                    {(modifedGames.length != 0 || modifedTeams.length != 0) && 
                        <span className='text-red-700 font-bold px-4'>Hygraph Content was Modified</span>}
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
                                    <td className='text-center'>
                                        {ArraysEqual(gamesd1mGQL, gamesd1mMongo)? 
                                            <span className='text-green-700 font-bold'>Up To Date</span> : 
                                            <span className='text-red-700 font-bold'>Modified</span>}
                                    </td>
                                </tr>
                                <tr className=' border border-gray-300'>
                                    <td className='border-r border-gray-300'>D1F</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd1fGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd1fMongo.length}</td>
                                    <td className='text-center'>
                                        {ArraysEqual(gamesd1fGQL, gamesd1fMongo)? 
                                                <span className='text-green-700 font-bold'>Up To Date</span> :
                                                <span className='text-red-700 font-bold'>Modified</span>}
                                    </td>
                                </tr>
                                <tr className='border border-gray-300'>
                                    <td className='border-r border-gray-300'>D2M</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd2mGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{gamesd2mMongo.length}</td>
                                    <td className='text-center'>
                                        {ArraysEqual(gamesd2mGQL, gamesd2mMongo)? 
                                                <span className='text-green-700 font-bold'>Up To Date</span>:
                                                <span className='text-red-700 font-bold'>Modified</span>}
                                    </td>
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
                                    <td className='text-center'>
                                        {ArraysEqual(teamsd1mGQL, teamsd1mMongo) ? 
                                            <span className='text-green-700 font-bold'>Up To Date</span> :  
                                            <span className='text-red-700 font-bold'>Modified</span>}
                                    </td>
                                </tr>
                                <tr className=' border border-gray-300'>
                                    <td className='border-r border-gray-300'>D1F</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd1fGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd1fMongo.length}</td>
                                    <td className='text-center'>
                                        {ArraysEqual(teamsd1fGQL, teamsd1fMongo)?
                                             <span className='text-green-700 font-bold'>Up To Date</span>:
                                             <span className='text-red-700 font-bold'>Modified</span>}
                                    </td>
                                </tr>
                                <tr className='border border-gray-300'>
                                    <td className='border-r border-gray-300'>D2M</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd2mGQL.length}</td>
                                    <td className='text-center border-r border-gray-300'>{teamsd2mMongo.length}</td>
                                    <td className='text-center'>
                                        {ArraysEqual(teamsd2mGQL, teamsd2mMongo)?
                                        <span className='text-green-700 font-bold'>Up To Date</span>:
                                        <span className='text-red-700 font-bold'>Modified</span>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button onClick={handleClick} type='button' id='updateDB'
                    className={`block w-full pselect-none rounded-full bg-gradient-to-tr from-gray-900 
                    to-gray-700 py-3 text-center align-middle font-sans text-lg font-bold uppercase 
                    text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg 
                    hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none 
                    disabled:opacity-50 disabled:shadow-none `} disabled={modifedGames.length == 0 && modifedTeams.length == 0}>
                        Update Database Content</button>
                        {/*Modal Window*/}
                        {showProcessModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                                <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
                                    <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900">Tasks</h3>
                                    <div className="mt-2 px-7 py-3">
                                        {processState.map((msg, index) =>
                                        <span className='text-green-800 py-2 block w-full' key={index}>{index + 1}. {msg}</span>)}
                                    </div>
                                    <div className="flex justify-center mt-4">

                                        {/*closing the modal */}
                                        <button type='button' onClick={()=>setShowProcessModal(false)} className={`pselect-none rounded-full px-4 bg-gradient-to-tr from-gray-900 
                                                to-gray-700 py-3 text-center align-middle font-sans text-md font-bold uppercase 
                                                text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg 
                                                hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none 
                                                disabled:opacity-50 disabled:shadow-none 
                                                `}>Close</button>
                                            
                                    </div>
                                    </div>
                                </div>
                            </div>}
            </div>
        </div>
  )
}
const ArraysEqual = (gqlObject, mongodbObject) => {
    return (JSON.stringify(gqlObject) === JSON.stringify(mongodbObject));
}
    

export default Admin