import React from 'react'
import './styles.css'

import { Link } from 'react-router-dom';

const Index = () => {
    return (
            <div>
                    <Link to='/randomquote'><button className='btn btn-primary mx-2'>Random Quote</button></Link>
                    <Link to='/markdownpreviewer'><button className='btn btn-primary mx-2'>Mark Down Previewer</button></Link>
                    <Link to='/drummachine'><button className='btn btn-primary mx-2'>Drum Machine</button></Link>
                    <Link to='/jscalculator'><button className='btn btn-primary mx-2'>Calculator</button></Link>
                    <Link to='/clock255'><button className='btn btn-primary mx-2'>25 5 Clock</button></Link>
            </div>      
    )
}

export default Index