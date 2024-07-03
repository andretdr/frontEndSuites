/** 
 * THIS PROJECT USES REACT, BOOTSTRAP, CSS
*/

import React from 'react'
import { marked } from 'marked'
import { createContext, useContext, useEffect, useState } from 'react'
import defaultText from '../data/markDownText.js'
import '../assets/css/markDownPreviewer.css'
import { markDownWriteUp } from '../data/writeup.js'

/* Set options for marked parser */
marked.use({
    breaks: true,
    gfm: true
})

// global input state using useContext
const InputContext = createContext();
const HeightContext = createContext();

// REACT COMPONENTS

const NavBar = () => {

    return (
    <nav className="navbar navbar-dark bg-secondary">
    <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">Front End Suites</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Mark Down Previewer</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/randomquote">Random Quote Generator</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" aria-current="page" href="/markdownpreviewer">Mark Down Previewer</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/drummachine">Drum Machine</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/jscalculator">JS Calculator</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/clock255">Interval Timer</a>
                </li>
            </ul>



        </div>

        <div className='row justify-content-center align-self-center mb-5'>
                <p className='my-4 col-10'>{markDownWriteUp}</p>
                <p className='my-4 text-end col-10'>Created by Andre Tong</p>
            </div>



        </div>
    </div>
    </nav>
    )
}


/** for editing markup */
const EditorComponent = () => {
    // global input state using useContext
    const { inputState, setInputState } = useContext(InputContext);
    const { heightState } = useContext(HeightContext);

    const handleChange = (event) => {
        setInputState(event.target.value);
    }
    return (
        <div className='card editor-component'>
            <div className='card-header lead'>
                Editor
            </div>
            <div className='card-body'>
                <textarea id='editor' onChange={(e)=>handleChange(e)} className="form-control text-body" 
                aria-label="With textarea" value={inputState} style={{height: heightState-80}}>
                    
                </textarea>
            </div>
        </div>
    );
}

/** for previewing markup */
const PreviewComponent = () => {
    // global input state using useContext
    const { inputState } = useContext(InputContext);
    // global height state using useContext to dynamically change editor height
    const { setHeightState } = useContext(HeightContext);

    useEffect(()=>{
        const el = document.getElementById('preview-component');
        setHeightState(el.offsetHeight);

    },[inputState])

    return (
        
        <div>
            <div id='preview-component' className='card preview-component'>
                <div className='card-header lead'>
                    Preview
                </div>
                <div className='card-body'>
                    <div id='preview' dangerouslySetInnerHTML={{__html:marked.parse(inputState)}}/>
                </div>
            </div>
        </div>
    )
}

/** main page */
const MarkDownPreviewer = () => {
    const [inputState, setInputState] = useState(defaultText);
    const [heightState, setHeightState] = useState(0);
    return (
        <InputContext.Provider value={{inputState, setInputState}}>
        <HeightContext.Provider value={{heightState, setHeightState}}>
            <main className='container-xxl' id='markdown-previewer'>
                <div className='col-12 mb-2'>
                    <NavBar />
                </div>
                <div className='row mb-5'>
                    <section className='col col-md-6'>
                        <EditorComponent />
                    </section>
                    <section className='col col-md-6'>
                        <PreviewComponent />
                    </section>
                </div>
            </main>
        </HeightContext.Provider>
        </InputContext.Provider>
    )
}

export default MarkDownPreviewer
