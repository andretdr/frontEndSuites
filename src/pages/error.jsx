import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
            <div>
                <p>ERROR 404</p>
                <Link to='/'>Home Page</Link>
            </div>      
    )
}

export default Error