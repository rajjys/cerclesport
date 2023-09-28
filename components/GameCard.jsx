import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { toHumanReadable } from '@/utils/dateFormat';

const GameCard = ({ game , showDeficit}) => {
  
  const winner = game.scoreTeam1 < game.scoreTeam2;
  let diff = Math.abs(game.scoreTeam1 - game.scoreTeam2)
  return (
      <Link href={`/game/${game.slug}`}>
                          <div className='rounded-lg bg-white p-2 m-1 lg:m-2 text-indigo-900 text-xs lg:text-sm'>
                              <span className='whitespace-nowrap text-center block'>{toHumanReadable(game.dateAndTime)}</span>
                              <div className='flex items-center justify-around p-2 my-2 border-y border-gray-300 font-bold'>
                                <span>{game.team1.shortName}</span>
                                <Image
                                    alt={game.team1.shortName}
                                    unoptimized
                                    width="30"
                                    height="30"
                                    className='inline rounded-full'
                                    src={game.team1.photo.url}
                                  />
                                <span>{game.scoreTeam1}</span>
                                <span>-</span>
                                <span>{game.scoreTeam2}</span>
                                <Image
                                    alt={game.team2.shortName}
                                    unoptimized
                                    width="30"
                                    height="30"
                                    className='inline rounded-full'
                                    src={game.team2.photo.url}
                                  />
                                <span>{game.team2.shortName}</span>
                              </div>
                              {showDeficit && <span className='whitespace-nowrap text-center block'>{diff} Points d'ecart</span>}
                              {!showDeficit && game.gameState == "Terminated" && <span className='text-center block'>Fin</span>}
                        </div>
      </Link>
  )
}

export default GameCard