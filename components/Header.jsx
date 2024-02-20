import React, {useState,useEffect} from "react";
import { Navbar, Typography,Button,IconButton, Collapse} from "@material-tailwind/react";
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
 
const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
 
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
    <ul className="flex lg:mb-0 lg:mt-0 justify-between lg:justify-center items-center text-white">
      <Typography as="li" variant="small" color="blue-gray" className="py-1 font-normal lg:hidden">
        <Link href="/" onClick={handleClick}>
          <Image 
                  src={`/favicon.ico`}
                  alt="Cercle Sport"
                  width='40'
                  height='40'
                  className="inline"
                />
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className={`grow lg:grow-0 text-center py-3 
      font-normal rounded-t-lg lg:rounded-lg lg:hover:bg-slate-500/40 lg:hover:text-yellow-200 active:bg-slate-500/40 transition duration-300 
      ease-in-out ${router.pathname === '/schedule' && " border-b-4 border-yellow-300 lg:border-none text-yellow-400"}`}>
        <Link href="/schedule/" onClick={handleClick} className="inline">
            <SportsBasketballIcon className="lg:hidden"/>
            <span className='hidden lg:inline p-2 align-middle text-lg font-semibold'>
              Matchs
            </span>
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className={`grow lg:grow-0 text-center py-3 
      font-normal rounded-t-lg lg:rounded-lg lg:hover:bg-slate-500/40 lg:hover:text-yellow-200 active:bg-slate-500/40 transition duration-300 
      ease-in-out ${router.pathname === '/standings' && " border-b-4 border-yellow-300 lg:border-none text-yellow-400"}`}>
        <Link href="/standings/" onClick={handleClick}>
          <FormatListNumberedIcon  className="lg:hidden"/>
          <span className='hidden lg:inline py-2 px-4 align-middle text-lg font-semibold'>
            Classement</span>
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className={`hidden grow lg:grow-0 text-center py-3 
      font-normal rounded-t-lg lg:rounded-lg lg:hover:bg-slate-500/40 lg:hover:text-yellow-200 active:bg-slate-500/40 transition duration-300 
      ease-in-out ${router.pathname === '/playoff' && " border-b-4 border-yellow-300 lg:border-none text-yellow-400"}`}>
        <Link href="/playoff/" onClick={handleClick}>
          <span className='hidden lg:inline py-2 px-4 align-middle text-lg font-semibold'>Playoff</span>
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className={`grow lg:grow-0 text-center py-3 
      font-normal rounded-t-lg lg:rounded-lg lg:hover:bg-slate-500/40 lg:hover:text-yellow-200 active:bg-slate-500/40 transition duration-300 
      ease-in-out ${router.pathname === '/blog' && " border-b-4 border-yellow-300 lg:border-none text-yellow-400"}`}>
        <Link href="/blog/" onClick={handleClick}>
          <NewspaperIcon className="lg:hidden mx-2"/>
          <span className='hidden lg:inline py-2 px-4 align-middle text-lg font-semibold'>Blog</span>
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className={`grow lg:grow-0 text-center py-3 
      font-normal rounded-t-lg lg:rounded-lg lg:hover:bg-slate-500/40 lg:hover:text-yellow-200 active:bg-slate-500/40 transition duration-300 
      ease-in-out ${router.pathname === '/statistics' && " border-b-4 border-yellow-300 lg:border-none text-yellow-400"}`}>
        <Link href="/statistics/" onClick={handleClick}>
          <BarChartIcon className="lg:hidden" />
          <span className='hidden lg:inline py-2 px-4 align-middle text-lg font-semibold'>Statistiques</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className={`grow lg:grow-0 text-center py-3 
      font-normal rounded-t-lg lg:rounded-lg lg:hover:bg-slate-500/40 lg:hover:text-yellow-200 active:bg-slate-500/40 transition duration-300 
      ease-in-out ${router.pathname === '/team' && " border-b-4 border-yellow-300 lg:border-none text-yellow-400"}`}>
        <Link href="/team/" onClick={handleClick}>
          <GroupsIcon className="lg:hidden "/>
          <span className='hidden lg:inline py-2 px-4 align-middle text-lg font-semibold'>Equipes</span></Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="w-full px-2 py-0 lg:py-2 lg:px-8 bg-indigo-950 border-none rounded-none">
      <div className="lg:mx-8 flex items-center justify-between text-blue-gray-900">
        <Link as=""
          href="/"
          className="hidden lg:inline mr-4 cursor-pointer font-bold text-red-500 ">
          <Image 
                src={`/favicon.ico`}
                alt="Cercle Sport"
                width='55'
                height='55'
                className="inline"
              />
        </Link>
        <div className="flex-1 grow">{navList}</div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block px-6 border rounded-full border-yellow-300 bg-indigo-900 w-auto">
          <span>S'inscrire</span>
        </Button>
        <IconButton
          variant="text"
          className="flex items-start text-left h-6 w-6 hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
            {openNav ? (<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6 text-red-800"
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
              className="h-6 w-6 text-white"
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
      <Collapse open={openNav} className="text-gray-300">
        <div className="container mx-auto ">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2 ml-2 px-6 border rounded-full border-yellow-300 bg-indigo-900 inline-block w-auto">
            <span>S'inscrire</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
export default Header;