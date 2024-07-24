import React, { useEffect, useState } from 'react'
import NoInternetImage from '/public/images/no_internet.png'

function NoInternateConnection({ children }) {
   const [isonline, setIsOnline] = useState(false);
   useEffect(() => {
      setIsOnline(navigator.onLine);
   }, []);

   // event listeners to update the state
   if ( typeof window !== 'undefined') {
      typeof window !== 'undefined' && window.addEventListener('online', () => {
         // console.log('Enter name')
         setIsOnline(true);
      });
   }
   if (typeof window !== 'undefined') {
      typeof window !== 'undefined' && window.addEventListener('offline', () => {
         setIsOnline(false);
      })
   }
   // if user is online  , return  the child component else return a custom component

   if (isonline) {
        return  (
         <div>
         {children}
         </div>
        )
   } else {
      return (
         <div className='text-center nointernet-background-image'>
            {/*<img src='images/no_internet.png' alt='no internet' width={100} height={100} />*/}
            <h1>No Internet Connection !!</h1>
            <div>Please try again later</div>
         </div>
      )
   }

}

export default NoInternateConnection