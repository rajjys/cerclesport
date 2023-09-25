import React from 'react'
import Image from 'next/image';
import { formatMultiple } from '@/utils/dateFormat';
import Link from 'next/link';
const GameWidget = ( {gameInfo} ) => {

  const gamePlayed = gameInfo.gameState == "Terminated";
  const winOrLoss = gameInfo.scoreTeam1 > gameInfo.scoreTeam2
  const textColor1 = winOrLoss ? "text-black" : "text-gray-500";
  const textColor2 = winOrLoss ? "text-gray-600" : "text-black";
  const overTimed = gameInfo.otTeam1 != null;
  const date = formatMultiple(gameInfo.dateAndTime);
  const scoreBoard = (gamePlayed) ? 
                      <div className='text-xs px-2 text-center'>
                        <table>
                          <tr className='border-b border-gray-300'>
                            <th className='border-r border-gray-300'></th>
                            <th className='px-2'>Q1</th>
                            <th className='px-2'>Q2</th>
                            <th className='px-2'>Q3</th>
                            <th className='px-2'>Q4</th>
                            {overTimed && <th className='px-2'>OT</th>}
                            <th className='px-2 border-l border-gray-300'>T</th>
                          </tr>
                          <tr>
                            <td className='pr-4 pl-2 font-bold border-r border-gray-300'>{gameInfo.team1.shortName}</td>
                            <td>{gameInfo.q1Team1}</td>
                            <td>{gameInfo.q2Team1}</td>
                            <td>{gameInfo.q3Team1}</td>
                            <td>{gameInfo.q4Team1}</td>
                            {overTimed && <td>{gameInfo.otTeam1}</td>}
                            <td className='font-bold border-l border-gray-300'>{gameInfo.scoreTeam1}</td>
                          </tr>
                          <tr>
                            <td className='font-bold border-r border-gray-300 pr-4 pl-2'>{gameInfo.team2.shortName}</td>
                            <td>{gameInfo.q1Team2}</td>
                            <td>{gameInfo.q2Team2}</td>
                            <td>{gameInfo.q3Team2}</td>
                            <td>{gameInfo.q4Team2}</td>
                            {overTimed && <td>{gameInfo.otTeam2}</td>}
                            <td className='font-bold border-l border-gray-300'>{gameInfo.scoreTeam2}</td>
                          </tr>
                        </table>
                      </div> :
                      <div className='text-xs px-2 flex flex-col items-center'>
                          <span className=''>{date[0]}</span>
                          <span className=''>{date[1]}</span>
                          <span>{date[2]}</span>
                          <span>{gameInfo.place}</span>
                      </div>
  return (
    <div>
      <div className='bg-white text-black flex justify-center items-center py-2 overflow-auto'>
        <div className='flex items-center text-xl font-bold px-2 text-indigo-950'>
          <Link href={`/team/${gameInfo.team1.slug}`} className='hover:text-red-800 transition duration-300 ease-in-out'>
            <span className='hidden md:inline whitespace-nowrap'>{gameInfo.team1.name}</span>
            <span className='md:hidden'>{gameInfo.team1.shortName}</span>
          </Link>
          <Image
                  alt={gameInfo.team1.shortName}
                  unoptimized
                  width="60"
                  height="60"
                  className='align-middle inline rounded-full'
                  src={gameInfo.team1.photo.url}
                />
          <span className={`${textColor1} text-4xl`}>{gameInfo.scoreTeam1}</span>
          <span className='font-bold'>{winOrLoss && "<"}</span>         
        </div>
        <div className=''>
          <span className='px-4 md:hidden text-gray-600 font-bold'>-</span>
          <span className='hidden md:inline'>{scoreBoard}</span>
        </div>
        <div className='flex items-center text-xl font-bold px-2 text-indigo-950'>
            <span className='font-bold'>{!winOrLoss && ">"}</span>
            <span className={`${textColor2} text-4xl`}>{gameInfo.scoreTeam2}</span>
            <Image
                      alt={gameInfo.team2.shortName}
                      unoptimized
                      width="60"
                      height="60"
                      className='align-middle inline rounded-full'
                      src={gameInfo.team2.photo.url}
                    />
            <Link href={`/team/${gameInfo.team2.slug}`} className='hover:text-red-800 transition duration-300 ease-in-out'>
              <span className='md:hidden'>{gameInfo.team2.shortName}</span>
              <span className='hidden md:inline whitespace-nowrap'>{gameInfo.team2.name}</span>
            </Link>
            
        </div>
        
    </div>
    <div className='md:hidden bg-white text-black flex justify-center items-center py-2 border-t border-gray-300'>{scoreBoard}</div>
    </div>
    
  )
}

export default GameWidget;