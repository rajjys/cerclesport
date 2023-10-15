import React,{useState, useEffect} from 'react'
import { fetchAllGames } from '@/services';
import { GameCard } from '@/components';

const Games = () => {
    const [games, setGames] = useState([]);
    useEffect(() => {
        fetchAllGames().then((data) => setGames(data))
    }, []);

    return (
      <div className='text-black'>
        <span className='font-bold text-xl px-4 text-center py-2 my-2 block'>Tout les Matchs</span>
        <div className='m-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            { games.map((game, index) => {
                return <GameCard game={game} key={index} showDeficit={false}/>
              })
            }
      </div>
    </div>
    )
}



export default Games