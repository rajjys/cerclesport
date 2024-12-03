import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const playoff = () => {
    const router = useRouter();
    const [games, setGames] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("EUBAGO");
    const [selectedDivision, setSelectedDivision] = useState("D1M");
    useEffect(() => {
      if (router.isReady){
        // Get the query parameters or use default values
        /* If there is no league or division argument in the url, 
        check it from localstorage, 
        otherwise let the user select it */
      if(!router.query.league) router.query.league = JSON.parse(localStorage.getItem('league')) || 'EUBAGO';
      if(!router.query.division) router.query.division = JSON.parse(localStorage.getItem('division')) || 'D1M';
      const league = router.query.league;
      const division = router.query.division;
      // Set the state for the selected values
      setSelectedLeague(league)
      setSelectedDivision(division)
      // Fetch the data from a backend API or a local file
      fetchPlayoffGames(league, division);
      }
    }, [router]);
  return (
    <div className='text-black'>
      playoff
    </div>
  )
}

export default playoff
