import React,{useState, useEffect} from 'react'
import { GameCard } from '@/components';
import { divisionsNames } from '@/constants';

const Games = () => {
    const [games, setGames] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
    const [selectedDivision, setSelectedDivision] = useState("D1M");
    useEffect(() => {
      const fetchGames = async () => {
        await fetch('/api/fetchallgames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ division: selectedDivision,league: selectedLeague})
        })
        .then(response => response.json())
        .then(data => setGames(data));
      }
      fetchGames();
    }, [selectedDivision, selectedLeague]);
    
    return (
      <div className='text-black'>
        <div className='my-4 mx-4 py-2 bg-white rounded-lg shadow-md text-xs md:text-sm mt-4'>
          <div className='border-b border-gray-300 mx-4 px-4 my-2 font-bold text-base md:text-lg'>
             <span className='block'>{selectedLeague} 2024 - {divisionsNames[selectedDivision]}</span>
             <span className='block'>Tout les Matchs</span>
          </div>
           <div className='m-2'>
            <select className=" py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
                  onChange={(event) => setSelectedLeague(event.target.value)}>
                  <option value="EUBAGO">EUBAGO - Goma</option>
            </select>
            <select id="division" className="py-2 px-4 mx-4 my-1 bg-gray-200 rounded-md"
                onChange={(event) => setSelectedDivision(event.target.value)}>
                <option value="D1M">1ere Division - M</option>
                <option value="D1F">1ere Division - F</option>
                <option value="D2M">2e Division - M</option>
            </select>
           </div>
        </div>
        
        <div className='m-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        { (games.length != 0) && games.map((game, index) => {
               return <GameCard game={game} key={index} showDeficit={false} 
                                league={selectedLeague} division={selectedDivision}/>
             })
            }
      </div>
    </div>
    )
}


export default Games