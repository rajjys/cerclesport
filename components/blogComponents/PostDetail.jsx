import React from 'react'
import moment from 'moment'
import Image from 'next/image';
import { resizeImage } from '@/utils/formatting';
import DrawIcon from '@mui/icons-material/Draw';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Link from 'next/link';

const PostDetail = ({ post }) => {

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
  
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }
  
      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }
  
      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }
  
    switch (type) {
      case 'paragraph':
        return <div className="pt-1" key={index}>{modifiedText}</div>
      case 'heading-one':
        return <h1 className="mb-2 mt-6 font-bold" key={index}>{modifiedText}</h1>;
      case 'heading-two':
        return <h2 className="mb-2 mt-6 font-bold" key={index}>{modifiedText}</h2>;
      case 'heading-three':
        return (
          <h3 key={index} className="mb-2 mt-6 font-bold">
            {modifiedText}
          </h3>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="mb-2 mt-6 font-bold text-lg">
            {modifiedText}
          </h4>
        );
      case 'heading-five':
        return (
          <h5 key={index} className="mb-2 mt-6 font-bold">
            {modifiedText}
          </h5>
        );
      case 'heading-six':
        return (
          <h6 key={index} className="text-xs font-semibold mb-2 mt-4">
            {modifiedText}
          </h6>
        );
      case 'blockquote':
        return <blockquote key={index}>{modifiedText}</blockquote>;
      case 'code':
        return <code key={index}>{modifiedText}</code>;
      case 'unnumbered-list':
        return <div className='block'><ul key={index}>{modifiedText.map((item, i) => <li key={i}>{item}</li>)}</ul></div>;
      case 'numbered-list':
        return <ol key={index}>{modifiedText}</ol>;
      case 'list-item':
        return <li>{modifiedText}</li>;
      case 'code-block':
        return <pre key={index}><code>{modifiedText}</code></pre>;
      case 'table':
        // Assuming obj contains table data (rows and columns)
        return (
          <table key={index}>
            <tbody>
              {obj.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'image':
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      case 'link':
        // Render the link with the provided URL
        return (
 
          <Link href={obj.href} className='font-bold text-green-900 lg:hover:text-green-500 transition duration-300 
          ease-in-out'>{obj.children["0"].text}</Link>
        );
      default:
        return modifiedText;
    }
  };
  

  return (
    <div className='bg-white lg:pb-8 pb-12 mb-4'>
      <div className='relative overflow-hidden mb-2'>
        <Image 
                  src={resizeImage(710, 450, post.featuredImage.url, "scale")}
                  unoptimized
                  alt={post.title}
                  loading='eager'
                  className='rounded-t-md object-top w-full h-full '
                  width='200'
                  height='200'
        />   
      </div> 
      <div className='px-4 lg:px-10'>
        <div className='flex '>
          <div className='flex items-center justify-start mb-8 w-full'>
              <CalendarMonthIcon className='text-pink-500 mx-2'/>
              <span className="text-xs md:text-sm whitespace-nowrap font-bold">{moment(post.createdAt).format('MMM DD, YYYY')}</span> 
          </div>
          <div className='flex'>
            <DrawIcon className='text-pink-500 mx-2'/>
            <span className='text-xs md:text-sm whitespace-nowrap font-bold'>{post.author.name}</span>
          </div>
        </div>
        
        <h1 className='mb-8 text-3xl font-semibold'>{post.title}</h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) => { 
            return getContentFragment(itemIndex, item.text, item, item.type)
        }
          );
          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail