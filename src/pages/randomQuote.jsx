/** 
 * THIS PROJECT USES REACT, REDUX, BOOTSTRAP, CSS
*/

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import colorList from '../data/colors'
import { configureStore } from '@reduxjs/toolkit'
import '../assets/css/randomQuote.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ArrowRightSquare, CaretDownFill } from 'react-bootstrap-icons'
import { randomQuoteWriteUp } from '../data/writeup'

//  CONSTANTS //

/** returns random index for BG color */
const colorIndex = () => {
  let index = Math.floor(Math.random() * colorList.length);
  return index;
}


// REACT //

/**  Main page layout Component */
const Page = () => {
    // useSelector
    const prevcolor = useSelector((reduxState) => reduxState.prevcolor)
    const color= useSelector((reduxState) => reduxState.color)

    /** trigger reflow for animation reset */
    useEffect(()=>{

        let element = document.getElementById('bg-fade');
        element.classList.remove('bg-fade');
        void element.offsetWidth;
        element.classList.add('bg-fade');
    
    },[color])


return <>
                <style>
                { `
                .bg-fade{
                    background-color: ${prevcolor};
                    animation: transition 1s;
                    animation-fill-mode: forwards;
                }

                @keyframes transition {
                    from {background-color: ${prevcolor};}
                    to {background-color: ${color};}
                }
    
                `}
                </style>

                <main id='bg-fade' className='container-fluid page-full d-flex align-items-center bg-fade'>
                    <NavBar />
                    <div className='container-fluid'>
                        <QuoteBox />
                    </div>
                </main>
            </>  
}

const NavBar =() => {
    const prevcolor = useSelector((reduxState) => reduxState.prevcolor)
    const color= useSelector((reduxState) => reduxState.color)

    /** trigger reflow for animation reset */
    useEffect(()=>{
        let collection = document.getElementsByClassName('bg-fade');
        for (let element of collection){
            element.classList.remove('bg-fade');
            void element.offsetWidth;
            element.classList.add('bg-fade');
        }
    },[color])

    return (<>
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">

            <Link to='/' className="navbar-brand mx-2 mx-md-5">Front End Suites</Link>

            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class=""><small className='mx-2'>Links</small><CaretDownFill size={10}/></span>
            </button>
            <div className="collapse navbar-collapse bg-fade" id="navbarNavDropdown">
                <ul className="navbar-nav ms-auto">
                    <li><Link to="/" className="nav-link dropdown-item  __cancel-hover">Home</Link></li>
                    <li><div to="/randomquote" className="nav-link fs-5 pt-1 dropdown-item __cancel-hover" >Random Quote Generator</div></li>
                    <li><Link to="/markdownpreviewer" className="nav-link dropdown-item  __cancel-hover">Markdown Previewer</Link></li>
                    <li><Link to="/drummachine" className="nav-link dropdown-item  __cancel-hover">Drum Machine</Link></li>                  
                    <li><Link to="/jscalculator" className="nav-link dropdown-item  __cancel-hover">JS Calculator</Link></li>
                    <li><Link to="/clock255" className="nav-link dropdown-item  __cancel-hover">Interval Timer</Link></li>
                    <li><div className="nav-link dropdown-item d-block d-lg-none" href="#" data-bs-toggle="modal" data-bs-target="#infoModal">Info</div></li>

                    <button className="info-button ms-auto col-1 mx-5 d-none d-lg-block">
                        <div className="nav-link dropdown-item text-fade" href="#" role="button" data-bs-toggle="modal" data-bs-target="#infoModal">
                        Info
                        </div>
                    </button>
                </ul>
            </div>
        </div>
    </nav>


    <div className="modal fade" id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <h3 className="modal-header display-6">
                    Random Quote Generator
                </h3>
                <div className="modal-body pt-5 pb-5">
                    <p className="mb-5 mx-2">{randomQuoteWriteUp}</p>
                    <p className="text-end mt-4 mx-2">Created by Andre Tong</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}


/**  Quote Box Component */
const QuoteBox = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const prevcolor = useSelector((reduxState) => reduxState.prevcolor)
    const color= useSelector((reduxState) => reduxState.color)
    // const bgColor = useSelector((reduxState)=>reduxState.color);
    const flip = useSelector((reduxState)=>reduxState.flip);
    const dispatch = useDispatch();

    /** update the quote on each flip change of reduxState */
    useEffect(() => {
        updateQuote()}, [flip]);//updateQuote()}, [reduxState.flip]);

    /** trigger reflow for animation reset */
    useEffect(()=>{

        // trigger reflow
        let collection = document.getElementsByClassName('text-fade');
        for (let element of collection){
            element.classList.remove('text-fade');
            void element.offsetWidth;
            element.classList.add('text-fade');
        }
    
    },[color])

    /** update local state quote from API */
    async function updateQuote(){
        let url = "https://type.fit/api/quotes";

        let response;
        let responseText;
        let responseObj;

        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {  
                    'Content-Type': 'application/json'}
                });

            responseText = await response.text();
            responseObj = JSON.parse(responseText);
        }
        catch {
            setQuote('API Error');
            setAuthor('');
        }

        const index = Math.floor(Math.random() * responseObj.length);

        setQuote(responseObj[index]['text']);
        const authortmp = responseObj[index]['author'].split(',');

        setAuthor(authortmp[0]);
    }

    return(
        <>
            <style>
            { `
            .text-fade{
                color: ${prevcolor};
                animation: transitiontext 1s;
                animation-fill-mode: forwards;
            }

            @keyframes transitiontext {
                from {color: ${prevcolor};}
                to {color: ${color};}
            }

            `}
            </style>

            <section className='container-sm p-4 rounded d-flex justify-content-center' style={{ backgroundColor: 'white'}}>
                <div className='col-sm-12 col-md-11 col-lg-10'>
                    <div id="text" className='col display-2 fw-bold my-5 text-fade' >{quote}</div>
                    <div className='lead fw-bold text-end my-5 text-fade' id="author" >{author}</div>
                    <footer className='d-flex justify-content-end'>
                        <button id="new-quote" className='quote-button d-flex align-items-center justify-content-center' 
                            style={{ backgroundColor: 'white'}} onClick={()=>dispatch({ type: NEXT })}>
                            <ArrowRightSquare className='p-0 text-fade' size={40} style={{ backgroundColor: 'white'}}/>
                        </button>
                    </footer>
                </div>
            </section>
        </>
    )
}


// REDUX //

/** declare action type */
const NEXT='NEXT';

/** reducers */
const nextReducer = (state={prevcolor:'white', color: colorList[colorIndex()], flip:true}, action) => {
  if (action.type === NEXT){
      return {prevcolor:state.color, color: colorList[colorIndex()], flip:!state.flip};
  }
  else {
      return state
  }
};

/* create store */
const store = configureStore({
  reducer: nextReducer
})

/* wrapper for Provider, Provider imported */
const RandomQuote = () => {
    return (
        <Provider store={store}>
            <Page />
        </Provider>
    )
}

export default RandomQuote