import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='container mx-auto px-0 md:px-10 mb-2'>
        <div className='flex justify-between border-b w-full inline-block border-blue-400 pb-1 pt-6'>
            <div className='md:float-left block'>
                <Link href='/'>
                    <span className='font-bold text-4xl text-white pt-1 pb-0 p-2 m-2 rounded hover:bg-slate-500 transition duration-300 hover:scale-110 ease-in-out'>
                        Cercle Sportif
                    </span>
                </Link>
            </div>
            <div className='flex flex-col lg:block lg:float-left '>
                        <Link href="/schedule/">
                            <span className=' mt-2 align-middle text-white ml-4 p-2 font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>
                                Matchs
                            </span>
                        </Link>
                        <Link href="/standings/">
                            <span className=' mt-2 align-middle text-white ml-4 p-2 font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>
                                Classement
                            </span>
                        </Link>
                        <Link href="/statistics/">
                            <span className='mt-2 align-middle text-white ml-4 p-2 font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>
                                Statistiques
                            </span>
                        </Link>
                        <Link  href="/videos/">
                            <span className=' mt-2 align-middle text-white ml-4 p-2 font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>
                                Videos
                            </span>
                        </Link>
                        <Link  href="/about/">
                            <span className='mt-2 align-middle text-white ml-4 p-2 font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>
                                Contacts
                            </span>
                        </Link>
            </div>
        </div>
    </div>
  )
}

export default Header