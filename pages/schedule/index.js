import React,{useState, useEffect} from 'react'
import { getAllGames } from '@/services';
import { GameCard } from '@/components';

const Games = () => {
    const [games, setGames] = useState([]);
    useEffect(() => {
        getAllGames().then((data) => {
          setGames(data);
        })
    }, []);
    return (
      <div className='grid grid-cols-2 gap-x-4 border-b border-yellow-500 pb-8 mb-8'>
        {games.map((game, index) => <GameCard game={game} key={index}/>)}
      </div>
    )
}

export default Games