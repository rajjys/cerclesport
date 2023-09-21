import React from 'react'
import { Header } from '.'

const Layout = ({children}) => {
    return (
        <>
            <div className='sticky top-0 z-30'>
                <Header/>
            </div>
            
            {children}    
        </>
      )
}

export default Layout