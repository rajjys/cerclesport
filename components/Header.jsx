import React, {useState,useEffect} from "react";
import { Navbar,MobileNav,Typography,Button,IconButton} from "@material-tailwind/react";
import Link from "next/link";
 
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
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link href="/schedule/" onClick={handleClick}>
            <span className='mx-2 p-2 align-middle text-white font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>Matchs</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link href="/standings/" onClick={handleClick}><span className='mx-2 p-2 align-middle text-white font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>Classement</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link href="/statistics/" onClick={handleClick}><span className='mx-2 p-2 align-middle text-white font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>Statistiques</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link  href="/videos/" onClick={handleClick}><span className='mx-2 p-2 align-middle text-white font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>Videos</span></Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link  href="/about/" onClick={handleClick}><span className='mx-2 p-2 align-middle text-white font-semibold rounded hover:bg-slate-500 transition duration-300 ease-in-out'>Contacts</span></Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="w-full py-2 px-4 lg:px-8 lg:py-4 bg-indigo-950">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-bold text-red-500">
          Cercle Sport
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block mb-2 px-6 border rounded-full border-yellow-300 bg-indigo-900 w-auto">
          <span>Login</span>
        </Button>
        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit lg:hover:bg-transparent lg:focus:bg-transparent lg:active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
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