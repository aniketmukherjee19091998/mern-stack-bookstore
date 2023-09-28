import React, { useState, useEffect } from 'react'
import BackButton from "../components/BackButton"
import Spinner from '../components/Spinner'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const UpdateBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((res) => {
                setTitle(res.data.title)
                setAuthor(res.data.author)
                setPublishYear(res.data.publishYear)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                alert("Error occurred, Please Check browser console")
                console.error(err)
            })
    }, [])

    const handleUpdateBook = () => {
        const data = {
            title, author, publishYear,
        }
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book details updated successfully!', { variant: 'success' })
                navigate('/')
            })
            .catch((err) => {
                setLoading(false)
                enqueueSnackbar('Error', { variant: 'error' })
                console.error(err)
            });

    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Update Book</h1>
            {
                loading ? (
                    <Spinner />
                ) : ''
            }
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label htmlFor="" className='text-xl mr-4 text-gray-500 '>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label htmlFor="" className='text-xl mr-4 text-gray-500 '>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label htmlFor="" className='text-xl mr-4 text-gray-500 '>PublishYear</label>
                    <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <button className='p-2 bg-sky-200 m-8' onClick={handleUpdateBook}>
                    Update
                </button>
            </div>
        </div>
    )
}

export default UpdateBook