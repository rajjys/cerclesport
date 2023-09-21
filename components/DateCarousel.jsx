import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 12
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};


const DateCarousel = ({ dateKeys }) => {
  return (
    <div className='gd-carousel-wrapper px-4'>
        <Carousel
            responsive={responsive}
            infinite={false}
            className="gd-carousel">
                {dateKeys.map((datekey, index) => 
                        <span className='p-4 bg-indigo-900 rounded-full text-white whitespace-nowrap mx-2 dateSelector' key={index}>
                            <a href={`#${datekey}`}>{datekey}</a>
                        </span>)}
        </Carousel>
    </div>
  )
}


export default DateCarousel