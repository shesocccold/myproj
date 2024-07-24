import React from 'react'
import {Link,NavLink} from 'react-router-dom'

export const PopularPosts = ({post}) => {
  return <div className='br-grey-600 my-1  mx-auto'>
    <Link to ={`${post._id}`}className='flex text-us text-black p-2 hover:bg-customColor1 hover:text-white'>
            {post.title} 
            </Link>
    </div>
  
}
