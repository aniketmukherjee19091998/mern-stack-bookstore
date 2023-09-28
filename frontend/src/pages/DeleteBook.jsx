import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    const handleDeleteBook = () => {
        setLoading(true)
        axios
            .delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setLoading(false)
                enqueueSnackbar('Book Deleted Successfully!', { variant: 'success' })
                navigate('/')
            })
            .catch((error) => {
                setLoading(false)
                enqueueSnackbar('Error', { variant: 'error' })
                console.error(error)
            })
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1>Delete Book</h1>
            {loading ? (<Spinner />) : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 w-[600px] rounded-xl p-8 mx-auto'>
                <h3 className='text-2xl'>
                    Delete the book?
                </h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteBook