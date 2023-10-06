import { getAllPlayoffData } from '@/services';
import React, {useState, useEffect} from 'react'

const Playoff = () => {
    const [playoffData, setPlayoffData] = useState([]);
    useEffect(()=>{
        ////getAllPlayoffData().then((data)=>setPlayoffData(data));
    }, [])
    ///const data = [...playoffData];///For mutability

  return (
    <div>
    </div>
  )
}

export default Playoff
