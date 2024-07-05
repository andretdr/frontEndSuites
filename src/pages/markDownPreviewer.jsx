/** 
 * THIS PROJECT USES REACT, BOOTSTRAP, CSS
*/
import { Link } from 'react-router-dom';

import { indexWriteUp } from '../data/writeup'
import linkedin from '../assets/images/linkedin.png'
import github from '../assets/images/github.png'
import andre from '../assets/images/andre.png'
import React from 'react'
import { marked } from 'marked'
import { createContext, useContext, useEffect, useState } from 'react'
import defaultText from '../data/markDownText.js'
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/markDownPreviewer.css'
import { markDownWriteUp } from '../data/writeup.js'
import { CaretDownFill, MarkdownFill } from 'react-bootstrap-icons'

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
    <nav className="navbar navbar-dark bg-success bg-gradient">
    <div className="container-fluid">
        <Link to='/' className="navbar-brand text-white">Front End Suites</Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class=""><small className='mx-2'>Links</small><CaretDownFill size={10}/></span>
        </button>

        <div className="offcanvas offcanvas-end bg-success" data-bs-scroll="true" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header text-white">
            {/* <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Front End Suites</h5> */}
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div className="offcanvas-body bg-success ">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-light __nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/randomquote" className="nav-link text-light __nav-link">Random Quote Generator</Link>
                </li>
                <li className="nav-item">
                    <div to="/markdownpreviewer" className="nav-link text-light fs-5 __nav-link" aria-current="page">Mark Down Previewer</div>
                </li>
                <li className="nav-item">
                    <Link to="/drummachine" className="nav-link text-light __nav-link">Drum Machine</Link>
                </li>
                <li className="nav-item">
                    <Link to="/jscalculator" className="nav-link text-light __nav-link">JS Calculator</Link>
                </li>
                <li className="nav-item">
                    <Link to="/clock255" className="nav-link text-light __nav-link">Interval Timer</Link>
                </li>
            </ul>
        </div>
        <div className='row justify-content-center align-self-center pb-5 m-0 bg-success text-light'>
                <p className='py-4 col-10'>{markDownWriteUp[0]}</p>
                <p className='py-4 text-end col-10'>Created by Andre Tong</p>
            </div>
        </div>
    </div>
    </nav>
    )
}


const Intro = () => {
    return ( 
    <section id='markdown_intro' className='container-lg padding_y'>
        <h2 className='display-3 p-2 pb-1 text-center d-flex flex-row justify-content-center align-items-center'>
            
                <MarkdownFill size={80} className='me-4'/>
                <div className='d-flex flex-column align-items-start'>
                <p className='my-0'>Markdown</p>
                <p className='my-0'>Previewer</p>
                </div>
            </h2>
        <div className='mx-auto me-auto w-75 container-sm p-2 text-muted text-center'>
            <p className='d-block d-md-none text-start'>{markDownWriteUp[1]+markDownWriteUp[2]}</p>
            <p className='d-none d-md-block m-0'>{markDownWriteUp[1]+markDownWriteUp[2]}</p>
        </div>


    </section>
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
            <div className='card-header lead bg-success-subtle bg-gradient'>
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
                <div className='card-header lead bg-success-subtle bg-gradient'>
                    Preview
                </div>
                <div className='card-body'>
                    <div id='preview' dangerouslySetInnerHTML={{__html:marked.parse(inputState)}}/>
                </div>
            </div>
        </div>
    )
}


const Footer = () => {
	return (
	<section id='footer' className='bg-success bg-gradient text-white padding_top'>
		<div className='container-lg p-5 pb-2 d-flex flex-row justify-content-between align-items-center'>
			<div className='about_me d-flex flex-row justify-content-between align-items-center'>
				<img src={andre} height='50px' width='50px'/>
				<div className='mx-3'>
					<small className='about_me-text'>{indexWriteUp[3]}</small><br/>

					<small className='about_me-text'>{indexWriteUp[5]}</small><br/>
				</div>
			</div>	
			<div className='follow_me'>
				<a href='https://www.linkedin.com/in/andre-tong-51b9044/'><img src={linkedin} height='50px' width='50px' className='m-2'/></a>
				<a href='https://github.com/andretdr/frontEndSuites'><img src={github} height='50px' width='50px' className='m-2'/></a>
			</div>	
		</div>

		<div className='container-lg'>
			<hr className='w-75 ms-auto me-auto'/>
		</div>

		<div className='container-lg d-flex flex-row justify-content-start align-items-center'>
			<p className='ms-5 me-3 my-1 fw-bold'> Other projects </p>
			<div>
				<a className='mx-3 fw-bold text-white' href='https://financeplus-cfec3ff5d154.herokuapp.com/landing'>Finance +</a>
			</div>
		</div>
		<div>
			<p className='padding_footer m-0'></p>
		</div>
	</section>
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
                <Intro />
                <div className='row mb-5'>
                    <section className='col-12 col-md-6'>
                        <EditorComponent />
                    </section>
                    <section className='col-12 col-md-6'>
                        <PreviewComponent />
                    </section>
                </div>
                <Footer />
            </main>

        </HeightContext.Provider>
        </InputContext.Provider>
    )
}

export default MarkDownPreviewer
