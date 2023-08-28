import React,{useState, useEffect} from 'react'
import { getAllGames } from '@/services';
import { GameCard } from '@/components';
import toLocalString from '@/utils/dateFormat';

const Games = () => {
    const [games, setGames] = useState([]);
    useEffect(() => {
        getAllGames().then((data) => {
          setGames(data);
        })
    }, []);

    if(games.length == 0) return <p>Loading</p>
    let sortedGames = [];
    let latestDate = games[0].dateAndTime.split('T')[0];
    let sameDayGames = [];
    for(let i = 0; i < games.length; i++){
      if(latestDate == games[i].dateAndTime.split('T')[0]){
        sameDayGames.push(games[i]);
      }
      else {
        sortedGames.push(sameDayGames);
        sameDayGames = [];
        latestDate = games[i].dateAndTime.split('T')[0];
        sameDayGames.push(games[i]);
      }
      if(i == games.length - 1)
       if(sameDayGames.length != 0) sortedGames.push(sameDayGames);
    }
    return (
      <div className='my-4'>
        {sortedGames.map((sameDayGames, index) => {
          return <div key={index}>
            <p className='text-indigo-900 text-lg ml-10'>{toLocalString(sameDayGames[0].dateAndTime.split('T')[0])}</p>
            <div className='grid grid-cols-2 gap-4 p-4'>
            { sameDayGames.map((game, index) => {
               return <GameCard game={game} key={index}/>})}
            </div>
          </div>
        })}
    </div>
    )
}



export default Games