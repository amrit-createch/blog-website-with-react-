import React from 'react'
import appwriteService from '../appwrite/configuration'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    // Add debugging logs
    console.log('PostCard props:', { $id, title, featuredImage });
    
    // Get the image URL and log it
    const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : null;
    console.log('Generated image URL:', imageUrl);
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {featuredImage ? (
                        <img 
                            src={imageUrl}
                            alt={title}
                            className='rounded-xl w-full h-48 object-cover'
                            onLoad={() => console.log('Image loaded successfully')}
                            onError={(e) => {
                                console.error('Image failed to load:', e.target.src);
                                console.error('Error details:', e);
                            }}
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