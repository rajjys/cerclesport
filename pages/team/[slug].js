import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { getGamesByTeam } from '@/services';

const Team = () => {
    let router = useRouter()
    const { slug } = router.query;
    const [games, setGames] = useState([]);///Team games
    const [profile, setProfile] = useState(); ///Team profile
  useEffect(() => {
    let team = slug;
    getGamesByTeam(team).then((data) => setGames(data));
    getTeamProfile(team).then((data) => setProfile(data));
  }, []);
  if(games.length == 0 || profile.length == 0) return <p>Chargement...</p>
  return (
    <div>{slug}</div>
  )
}

export default Team