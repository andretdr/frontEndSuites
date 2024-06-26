import React from 'react'
import './styles.css'

import { Link } from 'react-router-dom';

const Index = () => {
    return (
            <div>
                    <Link to='/randomquote'><button class='btn btn-primary mx-2'>Random Quote</button></Link>
                    <Link to='/markdownpreviewer'><button class='btn btn-primary mx-2'>Mark Down Previewer</button></Link>
            </div>      
    )
}

export default Index