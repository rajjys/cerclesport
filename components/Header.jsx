import React, {useState,useEffect} from "react";
import { Navbar,MobileNav,Typography,Button,IconButton} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
 
const Header = () => {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );
      return window.removeEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );
  }, []);
  const handleClick = () => {
    if(openNav)
    setOpenNav(false);
  };
  const navList = (
    <ul className="flex flex-col  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center  text-black">
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal mx-2">
        <Link href="/" onClick={handleClick}><span className='p-2 align-middle text-white font-bold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Accueil</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal mx-2">
        <Link href="/schedule/" onClick={handleClick}>
            <span className='p-2 align-middle text-white font-semibold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Matchs</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal mx-2">
        <Link href="/standings/" onClick={handleClick}><span className='p-2 align-middle text-white font-semibold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Classement</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal mx-2 hidden">
        <Link href="/playoff/" onClick={handleClick}><span className='p-2 align-middle text-white font-semibold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Playoff</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal mx-2">
        <Link href="/blog/" onClick={handleClick}><span className='p-2 align-middle text-white font-semibold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Blog</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal mx-2">
        <Link href="/statistics/" onClick={handleClick}><span className='p-2 align-middle text-white font-semibold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Statistiques</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal mx-2">
        <Link href="/team/" onClick={handleClick}><span className='p-2 align-middle text-white font-semibold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Equipes</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal hidden mx-2">
        <Link  href="/videos/" onClick={handleClick}><span className='p-2 align-middle text-white font-semibold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Videos</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal hidden mx-2">
        <Link  href="/about/" onClick={handleClick}><span className='p-2 align-middle text-white font-semibold lg:rounded lg:hover:bg-slate-500 lg:transition lg:duration-300 lg:ease-in-out'>Contacts</span></Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="w-full py-1 md:py-2 px-4 lg:px-8  bg-indigo-950 border-none">
      <div className=",x-2 lg:mx-8 flex items-center justify-between text-blue-gray-900">
        <Link as=""
          href="/"
          className="mr-4 cursor-pointer font-bold text-red-500 ">
          <Image 
                src={`/favicon.ico`}
                alt="Cercle Sport"
                width='55'
                height='55'
                className="inline"
              />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block px-6 border rounded-full border-yellow-300 bg-indigo-900 w-auto">
          <span>Login</span>
        </Button>
        <IconButton
          variant="text"
          className="flex items-start text-left h-6 w-6 lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
            {openNav ? (<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) :(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto ">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2 ml-2 px-6 border rounded-full border-yellow-300 bg-indigo-900 inline-block w-auto">
            <span>Login</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
export default Header;