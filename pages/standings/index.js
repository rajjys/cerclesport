import { getAllGames } from '@/services';
import React, {useState, useEffect} from 'react';


const Standings = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);
  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  designTable(games);

  return (
    <div>Standings</div>
  )
}
function designTable( games ){
  ///create object to hold games by team
  const gamesByTeam = games.reduce((acc, curr) => {
    const {team1, team2} = curr;
    const team1Name = team1.name;
    const team2Name = team2.name;
    acc[team1Name] = acc[team1Name] || [];
    acc[team2Name] = acc[team2Name] || [];
    acc[team1Name].push(curr);
    acc[team2Name].push(curr);
    return acc;
  }, {});
  console.log(gamesByTeam);
}

export default Standings