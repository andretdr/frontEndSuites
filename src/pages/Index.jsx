import React from 'react'
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
import colorList from '../assets/colors'
import { configureStore } from '@reduxjs/toolkit'
import './styles.css'
import RandomQuote from './randomQuote';

import { Link } from 'react-router-dom';

const Index = () => {
    return (
            <div>
                    <Link to='/randomquote'>Random Quote</Link>
            </div>      
    )
}

export default Index