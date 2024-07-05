import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { indexWriteUp } from '../data/writeup'
import '../assets/css/index.css'
import viteImg from '../assets/images/vite.png'
import reactImg from '../assets/images/react.png'
import reduxImg from '../assets/images/redux.png'
import bootstrapImg from '../assets/images/bootstrap.png'
import drumSVG from '../assets/images/drum.png'
import linkedin from '../assets/images/linkedin.png'
import github from '../assets/images/github.png'
import andre from '../assets/images/andre.png'
import { Quote, MarkdownFill, CalculatorFill, StopwatchFill } from 'react-bootstrap-icons'

import { HashRouter as Router, useNavigate } from "react-router-dom";

/** Array of available links */
const links = [
        '/randomquote',
        '/markdownpreviewer',
        '/drummachine',
        '/jscalculator',
        '/clock255'
                ]

const NavBar = () => {
	return (
			<nav class="navbar text-primary bg-body-tertiary">
				<div class="container">
					<div class="navbar-brand">
						<div className='lead'>Front End Suites</div>
					</div>
				</div>
			</nav>
			)
}
        
const Intro = () => {
	return (
		<section id='intro' className='bg-body'>
			<div className='container-sm'>
				<p className='display-4 p-5 pb-1 text-center'>{indexWriteUp[0]}</p>
				<p className='lead text-muted m-0 text-center'>{indexWriteUp[1]}</p>
				<p className='lead text-muted pb-5 text-center'>{indexWriteUp[2]}</p>
			</div>
			<div className='d-flex flex-row justify-content-center align-items-center pb-5'>
				<img className='img_logo' src={viteImg} width='160px' height='160px'/>
				<img className='img_logo' src={reactImg} width='180px' height='180px'/>
				<img className='img_logo' src={reduxImg} width='160px' height='150px'/>
				<img className='img_logo' src={bootstrapImg} width='180px' height='144px'/>
			</div>


		</section>
	)
}

const Links = () => {
	return (
		<section className='bg-body-tertiary padding_bottom'>
			<div className='container-lg'>
			
				<div>
					<p className='display-6 p-5 pb-1 text-center'>Links</p>
				</div>


				<div class="list-group py-1 pb-5">
					<Link to='/randomquote' class="list-group-item list-group-item-action" aria-current="true">
						<Quote size={50}/>
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">Random Quote Generator</h5>
						</div>
						<p class="mb-1 "><small className='text-body-secondary'>The page displays a random quote using an API call.</small></p>
					</Link>
					<Link to='/markdownpreviewer' class="list-group-item list-group-item-action" aria-current="true">
						<MarkdownFill size={50}/>
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">Markdown Previewer</h5>
						</div>
						<p class="mb-1 "><small className='text-body-secondary'>This page lets you type and preview in Markdown format in realtime.</small></p>
					</Link>
					<Link to='/drummachine' class="list-group-item list-group-item-action" aria-current="true">
					<img src={drumSVG} alt="Logo" width="45" height="46" className="d-inline-block align-text-top"></img>
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">Drum Machine</h5>
						</div>
						<p class="mb-1 "><small className='text-body-secondary'>This page is designed around ComputeRhythm, an early drum machine. It also gives a demo with live drum pads.</small></p>
					</Link>
					<Link to='/jscalculator' class="list-group-item list-group-item-action" aria-current="true">
					<CalculatorFill size={50}/>
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">JS Calculator</h5>
						</div>
						<p class="mb-1 "><small className='text-body-secondary'>The page features a calulator implemented using JS. It implements a infix to postfix function and evaluates the expression using a stack. </small></p>
					</Link>
					<Link to='/clock255' class="list-group-item list-group-item-action" aria-current="true">
					<StopwatchFill size={45}/>
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">Interval Timer</h5>
						</div>
						<p class="mb-1 "><small className='text-body-secondary'>This page features an interval timer.</small></p>
					</Link>
				</div>
			</div>

		</section>
	)
}

const Footer = () => {
	return (
	<section id='footer' className='bg-body padding_top'>
		<div className='container-lg p-5 pb-2 d-flex flex-row justify-content-between align-items-center'>
			<div className='about_me d-flex flex-row justify-content-between align-items-center'>
				<img src={andre} height='50px' width='50px'/>
				<div className='mx-3'>
					<small className='about_me-text'>{indexWriteUp[3]}</small><br/>

					<small className='about_me-text'>{indexWriteUp[5]}</small><br/>
				</div>
			</div>	
			<div className='follow_me'>
				<img src={linkedin} height='50px' width='50px' className='mx-2'/>
				<img src={github} height='50px' width='50px' className='mx-2'/>
			</div>	
		</div>

		<div className='container-lg'>
			<hr className='w-75 ms-auto me-auto'/>
		</div>

		<div className='container-lg d-flex flex-row justify-content-start align-items-center'>
			<p className='ms-5 me-3 my-1 fw-bold'> Other projects </p>
			<div>
				<a className='mx-3 fw-bold' href='https://financeplus-cfec3ff5d154.herokuapp.com/landing'>Finance +</a>
			</div>
		</div>
		<div>
			<p className='padding_footer'></p>
		</div>
	</section>
	)
}


const Index = () => {

        // const navigate = useNavigate();

        // useEffect(()=>{
        //         navigate(links[Math.floor(Math.random()*5)]);       
        // },[])


    return (    <>

            <div>
				<NavBar />
				<Intro />
				<Links />
				<Footer />
            </div>
            </>
    )
}

export default Index