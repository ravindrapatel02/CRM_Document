import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
    return (
        <div className='w-100 mx-auto mt-20  justify-center items-center space-y-4 text-center'>
        <h1 className='text-4xl font-semibold'>404 - Page Not Found</h1>
        <h4 className='py-10 text-lg text-red-500 font-semibold capitalize'>
        Oops! Looks like this is not a page
        </h4>
         
        <div className="mb-11">
        <img src={'/404-error.png'} alt={'bjbfjk'} />
      </div>
        <div className='space-x-4'>
          <Link
            className='underline text-blue-600 hover:text-red-500 duration-300'
            href='/'
          >
            Homepage
          </Link>
          
        </div>
      </div>
    )
}

export default PageNotFound