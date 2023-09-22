import React,{useState, useEffect} from 'react'
import { getAllGames } from '@/services';
import { GameCard } from '@/components';
import DateCarousel from '@/components/DateCarousel';
import { toHumanReadable } from '@/utils/dateFormat';

const Games = () => {
    const [games, setGames] = useState([]);
    useEffect(() => {
        getAllGames().then((data) => {
          setGames(data);
        })
    }, []);

    if(games.length == 0) return <p>Loading</p> ///If has not loaded yet

    const reducedGames = games.reduce((acc, curr) => {
      const date =  curr.dateAndTime.split('T')[0];
      if (!acc[date]) {
         acc[date] = [];
       }      
       acc[date].push(curr);
       return acc;
    }, {});  ///games array reduced to an object of key-value pair where the key is date from dateAndTime
    const dateKeys = Object.keys(reducedGames).reverse();///Get all the dates as key array

    return (
      <div className=''>
        <div className='py-4 mb-2  bg-indigo-950 top-12 lg:top-16 sticky'>
          <DateCarousel dateKeys={dateKeys}/>
        </div>
        { 
        dateKeys.map((dateKey, index) => {
          return <div key={index} id={dateKey}>
            <p className='text-indigo-900 text-lg ml-10'>{toHumanReadable(dateKey)}</p>
            <div className='grid grid-cols-2 gap-4 p-4'>
            { reducedGames[dateKey].map((game, index) => {
               return <GameCard game={game} key={index}/>})}
            </div>
          </div>
        })
          }
    </div>
    )
}



export default Games