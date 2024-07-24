import React from 'react'
import { toast } from 'react-toastify';

const AppNotification = (status , message) => {

    const errorMessage = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

     const successMessage = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

  return (
    <>
    {status ? successMessage(message) :errorMessage(message)}
    </>
  )
}

export default AppNotification;