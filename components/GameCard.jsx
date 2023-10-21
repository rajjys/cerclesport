import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { resizeImage, toHumanReadable, toHumanReadableTime } from '@/utils/formatting';

const GameCard = ({ game , showDeficit}) => {
  const winOrLoss = game.scoreTeam1 > game.scoreTeam2
  const textColor1 = winOrLoss ? "text-black" : "text-gray-500";
  const textColor2 = winOrLoss ? "text-gray-600" : "text-black";
  let diff = Math.abs(game.scoreTeam1 - game.scoreTeam2)
  return (
              <Link href={`/game/${game.slug}`} className='rounded-lg bg-white p-2 lg:m-2 text-indigo-900 text-xs lg:text-sm'>
                              <span className='whitespace-nowrap text-center block'>{toHumanReadable(game.dateAndTime)}</span>
                              <span className='whitespace-nowrap text-center block'>{toHumanReadableTime(game.dateAndTime)}</span>
                              <div className='flex items-center justify-around p-2 my-2 border-y border-gray-300 font-bold'>
                                <span>{game.team1.shortName}</span>
                                <Image
                                    alt={game.team1.shortName}
                                    unoptimized
                                    width="30"
                                    height="30"
                                    className='inline rounded-full'
                                    src={resizeImage(60, 60,game.team1.photo.url)}
                                  />
                                <span className={`${textColor1}`}>{game.scoreTeam1}</span>
                                <span>-</span>
                                <span  className={`${textColor2}`}>{game.scoreTeam2}</span>
                                <Image
                                    alt={game.team2.shortName}
                                    unoptimized
                                    width="30"
                                    height="30"
                                    className='inline rounded-full'
                                    src={resizeImage(60, 60, game.team2.photo.url)}
                                  />
                                <span>{game.team2.shortName}</span>
                              </div>
                              {showDeficit && <span className='whitespace-nowrap text-center block'>{diff} Points d'ecart</span>}
                              {!showDeficit && game.gameState == "Terminated" && <span className='text-center block'>Fin</span>}
                </Link>
  )
}

export default GameCard