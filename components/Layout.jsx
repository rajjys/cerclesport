import React from 'react'
import { Header, HeaderComp } from '.'

const Layout = ({children}) => {
    return (
        <>
            <div className='sticky top-0'>
                <Header/>
            </div>
            
            {children}    
        </>
      )
}

export default Layout