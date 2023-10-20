import React, {useState, useEffect} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getCategories } from '@/services';
import { CategoryPostCard } from '.';

var settings = {
  dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
           slidesToShow: 4,
          }
        },
        {
          breakpoint: 1024,
          settings: {
           slidesToShow: 3,
          }
        }, {
          breakpoint: 768,
          settings: {
           slidesToShow: 2,
          }
        },
        {
          breakpoint: 640,
          settings: {
           slidesToShow: 1,
          }
         }
      ]
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories)})
      setDataLoaded(true);
  }, [])
  return (
    <div className='bg-white/75  shadow-lg rounded-lg p-4 mb-4 pb-12'>
      <h3 className='text-xl font-semibold border-b pb-4'>
        Categories
      </h3>
      <Slider {...settings}>
      {dataLoaded && categories.map((category, index) => (
          <CategoryPostCard slug={category.slug} name={category.name} key={`${category.name} + ${index}`}/>
      ))}
      </Slider>
    </div>
  )
}

export default Categories