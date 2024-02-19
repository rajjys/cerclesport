import React from 'react'
import { Header } from '.'
import { Analytics } from '@vercel/analytics/react';

const Layout = ({children}) => {
    return (
        <>
            <div className='sticky top-0 z-30'>
                <Header/>
            </div>
            
            {children}  
            <Analytics  />
        </>
      )
}

export default Layout