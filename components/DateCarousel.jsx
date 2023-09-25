import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 12, slidesToSlide: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1180 },
    items: 9, slidesToSlide: 2
  },
  laptop: {
    breakpoint: { max: 1180, min: 768 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 5
  },
  rotate: {
    breakpoint: { max: 640, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};


const DateCarousel = ({ dateKeys }) => {
  return (
    <div className='px-4'>
        <Carousel
            responsive={responsive}
            infinite={false}
            className="px-4">
                {dateKeys.map((datekey, index) => 
                        <span className='px-4 bg-indigo-900 border border-red-500 rounded-full text-white text-xs sm:text-sm md:text-base whitespace-nowrap' key={index}>
                            <a href={`#${datekey}`}>{datekey}</a>
                        </span>)}
        </Carousel>
    </div>
  )
}


export default DateCarousel