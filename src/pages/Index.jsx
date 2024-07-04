import React, { useEffect } from 'react'
import './styles.css'

import { useNavigate } from "react-router-dom";

/** Array of available links */
const links = [
        '/randomquote',
        '/markdownpreviewer',
        '/drummachine',
        '/jscalculator',
        '/clock255'
                ]

/** returns a random page in the collection */
const Index = () => {

        const navigate = useNavigate();

        useEffect(()=>{
                navigate(links[Math.floor(Math.random()*5)]);       
        },[])

    return (    <>
                </>
        //     <div>
        //         <Link to='/randomquote'><button className='btn btn-primary mx-2'>Random Quote</button></Link>
        //         <Link to='/markdownpreviewer'><button className='btn btn-primary mx-2'>Mark Down Previewer</button></Link>
        //         <Link to='/drummachine'><button className='btn btn-primary mx-2'>Drum Machine</button></Link>
        //         <Link to='/jscalculator'><button className='btn btn-primary mx-2'>Calculator</button></Link>
        //         <Link to='/clock255'><button className='btn btn-primary mx-2'>Interval Timer</button></Link>
        //     </div>      
    )
}

export default Index