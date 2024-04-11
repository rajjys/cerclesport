import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { resizeImage, getHumanReadableTime, getNumericDate } from '@/utils/formatting';

const GameCard = ({ game , showDeficit, league, division}) => {

  const winOrLoss = game.scoreTeam1 > game.scoreTeam2
  const textColor1 = winOrLoss ? "text-black" : "text-gray-500";
  const textColor2 = winOrLoss ? "text-gray-600" : "text-black";
  let diff = Math.abs(game.scoreTeam1 - game.scoreTeam2);
  return (
              <Link href={`/game/24/${league}/${division}/${game.slug}`} className='rounded-lg bg-white p-2 my-1 text-indigo-900 text-xs lg:text-sm shadow-md'>
                              <div className='flex justify-center'>
                                  <span className={`whitespace-nowrap text-center font-bold pr-4 border-r border-gray-300`}>{getNumericDate(game.dateAndTime)}</span>
                                  <span className={`whitespace-nowrap text-center text-red-800 font-bold pl-4`}>{getHumanReadableTime(game.dateAndTime)}</span>
                              </div>
                              <div className='flex items-center justify-around p-2 my-2 border-y border-gray-300 font-bold'>
                                <Image
                                    alt={game.team1.shortName}
                                    unoptimized
                                    width="30"
                                    height="30"
                                    className='inline rounded-full'
                                    src={resizeImage(60, 60,game.team1.photo.url)}
                                  />
                                <span>{game.team1.shortName}</span>
                                <span className={`${textColor1}`}>{game.scoreTeam1}</span>
                                <span>-</span>
                                <span  className={`${textColor2}`}>{game.scoreTeam2}</span>
                                <span>{game.team2.shortName}</span>
                                <Image
                                    alt={game.team2.shortName}
                                    unoptimized
                                    width="30"
                                    height="30"
                                    className='inline rounded-full'
                                    src={resizeImage(60, 60, game.team2.photo.url)}
                                  />
                                
                              </div>
                              {showDeficit && <span className={`whitespace-nowrap text-center block`}>{diff} Points d'ecart</span>}
                              {league && <span className='text-center block text-xs font-bold'>{league} - {division}</span>}
                </Link>
  )
}

export default GameCard