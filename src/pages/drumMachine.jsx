/** 
 * THIS PROJECT USES REACT, BOOTSTRAP and CSS
*/

import { Link } from 'react-router-dom';
import React, { useReducer } from 'react'
import { useState, useEffect } from 'react'

import { letterMapping, displayMapping, audioMapping } from '../data/drumMachineInit';
import { drumMachineWriteUp } from '../data/writeup.js'
import { drumMachineHistory } from '../data/drumMachineInit.js'

import drumSVG from '../assets/images/drum.png'
import drumMachine from '../assets/images/drumMachine.png'

import '../assets/css/drumMachine.css'
import 'bootstrap/dist/css/bootstrap.css';

import { VolumeUpFill, CaretDownFill } from 'react-bootstrap-icons'

import { indexWriteUp } from '../data/writeup'
import linkedin from '../assets/images/linkedin.png'
import github from '../assets/images/github.png'
import andre from '../assets/images/andre.png'


let audioArray = [];
function preloadAudio() {
    for (let item of letterMapping){
        audioArray[item.key] = new Audio(item.url);
        audioArray[item.key].addEventListener('canplaythrough', loadedAudio, false);
    }
    // once this file loads, it will call loadedAudio()
    // the file will be kept by the browser as cache
}
    
var loaded = 0;
function loadedAudio() {
    // this will be called every time an audio file is loaded
    // we keep track of the loaded files vs the requested files
    loaded++;
    if (loaded == 9){
    	// all have loaded
    console.log('loaded!');
    }
}


/** Info Section */
const WriteUp = () => {
    return (

        <div className='container-lg'>
            <p className='text-justify m-2 m-md-5 writeup-text'>{drumMachineWriteUp}</p>
            <p className='text-end m-2 m-md-5 writeup-text'>It is created by Andre Tong</p>
        </div> 

            )
}


/** Drum Machine Image */
const Image = () => {
    return  <img id='drum-machine-img' key='drum-machine' src={drumMachine} alt="Drum Machine"  className="d-inline-block"></img>
}


/** Drum Machine History */
const History = () => {
    return  (
        <div className='container-lg'>
            <h6 className='display-6 text-center m-2 m-md-5 history-label'>Drum Machine</h6>
            {drumMachineHistory.map((item, key)=>{
                return <p key={key} className='text-justify m-4 m-md-5 history-text'>{item}</p>
            })}
            
        </div> 
    )
}


/** Nav Bar */
const NavBar = () => {

    return (
        <nav className="navbar-light navbar-expand-lg bg-light py-2">
            <div className="container-fluid">

                <img src={drumSVG} alt="Logo" width="25" height="26" className="d-inline-block d-lg-none align-text-top"></img>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <small className='p-2 pe-1'>Links</small><CaretDownFill size={12}/>
                {/* <img src={drumSVG} alt="Logo" width="25" height="26" className="d-inline-block align-text-top"></img> */}
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <div className="navbar-brand mx-5 d-none d-lg-block" href="">
                    <img src={drumSVG} alt="Logo" width="40" height="41" className="d-inline-block align-text-top"></img>
                    </div>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item mx-2">
                        <Link to="/" className="nav-link" >Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                        <Link to="/randomquote" className="nav-link" >Random Quote Generator</Link>
                        </li>
                        <li className="nav-item mx-2">
                        <Link to="/markdownpreviewer" className="nav-link" >Mark Down Previewer</Link>
                        </li>
                        <li className="nav-item mx-2">
                        <div to="/drummachine" className="nav-link fs-5 pt-1" >Drum Machine</div>
                        </li>
                        <li className="nav-item mx-2">
                        <Link to="/jscalculator" className="nav-link" >JS Calculator</Link>
                        </li>
                        <li className="nav-item mx-2">
                        <Link to="/clock255" className="nav-link" >Interval Timer</Link>
                        </li>
                    </ul>

                <div className='mx-5'>
                    <Link to='/' className="nav-link text-dark d-none d-lg-block">Front End Suites</Link>
                </div>
                </div>

            </div>

        </nav>
    )
}


/* Key pad */
const KeyPad = (props) => {
    const letterArr = ['Q','W','E','A','S','D','Z','X','C'];

    const handlePlay = (item) =>{
        props.playsound(item.toLowerCase());
        props.dispatch({type: item.toLowerCase()});

    }

    return (<>
                <div className='grid'>
                    {letterArr.map(item=>
                    <div key={'grid'+item} id={'grid'+item} className='d-flex justify-content-center align-items-center'>
                        <button onClick={()=>handlePlay(item)} onContextMenu={(e)=> e.preventDefault()} 
                        className='btn btn-lg btn-secondary drum-pad' id={'sound'+item}>

                            {item.toUpperCase()}
                        </button>
                        <audio id={`audio${item.toLowerCase()}`}><source src={audioMapping[item.toLowerCase()]} type='audio/mpeg'></source></audio>
                    </div>)}
                </div>

            </>
            )
}


/** Control component */
const ControlPad = (props) => {
    /* update power state */
    const handleChangePower = () => {props.power.set(!props.power.power)}
    /* update bank state */
    const handleChangeBank = () => {props.bank.set(!props.bank.bank)}
    /* update volume state */
    const handleChangeVolume = (event) => {props.volume.set(event.target.value)}

    return (
        <div className='card bg-light my-3 h-75 w-75 d-flex flex-column justify-content-start'>
            <div className='my-2 ms-auto mx-4'>
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
                    <input className="form-check-input checkbox-1x" onChange={handleChangePower} type="checkbox" 
                        role="switch" id="flexSwitchCheckChecked" defaultChecked />
                </div>
            </div>

            <div id='display' className='card p-2 mx-5 my-4 bg-light '>
                <h3 className='lead text-center'>
                    { (props.keyPress === '')
                        ? 'Press key to start'
                        : ((props.keyPress.search(/[qweasdzxc]/) != -1) && props.power.power) 
                        ? displayMapping[0][[props.keyPress]]
                        : ' ' }
                </h3>                
            </div>

            <div className='d-flex flex-row justify-content-start align-items-center mx-4 mb-5'>
                <VolumeUpFill />
                {props.power.power
                ? <input id='volume' onChange={handleChangeVolume} type='range' min='0' max='10' value={props.volume.volume} step='0.1'/>
                : <input id='volume' type='range' min='0' max='10' disabled/>}
            </div>

        </div>
    )
}


const Demo_NA = () => {

    return (
        <div className='d-flex flex-column flex-md-row justify-content-center'>
            <h6 className='display-6 text-center m-2 m-md-5 history-label'>Demo not available for mobile</h6>
        </div>
    )
}


const Footer = () => {
	return (
	<section id='footer' className='bg-secondary bg-gradient text-white padding_top'>
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


/* main parent component */
const DrumMachine = () => {
    // states
    const [power, setPower] = useState(true);
    const [bank, setBank] = useState(false);
    const [volume, setVolume] = useState('5');

    const playsound = (lowerCaseKey) =>{
        let sound = document.getElementById('audio'+lowerCaseKey)
        
        sound.pause();
        sound.currentTime = 0;
        sound.volume = volume/10;
        sound.play();
    }

    /** reducer for non simple action reducing */
    const reducer = (state, action) => {
        const pattern = /\b[qweasdzxc]\b/i;
        if (pattern.test(action.type))
            return ({key: action.type, toggle: !state.toggle});   
        else 
            return ({key:'', toggle: state.toggle});
    }

    // useReducer for this instead
    const[keyPress, dispatch] = useReducer(reducer, {key:'', toggle: false});

    /** updates keypress state */
    const handleKeyPress=(event)=>{ 
        playsound(event.key.toLowerCase());
        dispatch({type: (event.key).toLowerCase()});
     };
       

    /**  will do this on mount only 
     *   handle keydown logic and dispatch */
    useEffect(()=>{
        // listen for keydown
        document.addEventListener('keydown', handleKeyPress);
        preloadAudio();
        // cleanup function on dismount
        return ()=>{ document.removeEventListener('keydown', handleKeyPress);} 
    }, []);


    return (
        <>
            <section>
                <NavBar />
            </section>

            <section id='top' className='d-flex flex-row align-items-center justify-content-center'>
                <Image />
            </section>

            <section id='history' className='bg-light py-1 py-lg-5'>
                <History />
            </section>

            <section id='drum-machine' className='container-xl py-5 d-block'>
                <div className='d-flex flex-column flex-md-row justify-content-center'>
                    <div className='d-flex flex-row justify-content-center'>
                        <ControlPad keyPress={keyPress.key} power={{power:power, set:setPower}} 
                        bank={{bank:bank, set:setBank}} volume={{volume: volume, set:setVolume}}/>
                    </div>
                    <div className=''>
                        <KeyPad dispatch={dispatch} playsound={playsound}/>
                    </div>
                </div>
            </section>

            {/* <section className='demo-na container-xl py-5 d-block d-md-none bg-white'>
                <Demo_NA />
            </section> */}

            <section className='bg-light py-5'>
                <WriteUp />
            </section>

            <Footer/>

        </>
    )
}

export default DrumMachine