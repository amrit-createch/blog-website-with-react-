import React from 'react'
import appwriteService from '../appwrite/configuration'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {featuredImage ? (
                        <img 
                            src={appwriteService.getFilePreview(featuredImage)} 
                            alt={title}
                            className='rounded-xl w-full h-48 object-cover'
                        />
                    ) : (
                        <div className='bg-gray-300 rounded-xl h-48 flex items-center justify-center'>
                            <span>No Image</span>
                        </div>
                    )}
                </div>
                <h2 className='text-xl font-bold'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard