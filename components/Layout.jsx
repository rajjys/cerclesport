import React from 'react'
import { Header } from '.'

const Layout = ({children}) => {
    return (
        <>
            <div className='bg-indigo-950 py-4'>
                <Header/>
            </div>
            
            {children}    
        </>
      )
}

export default Layout