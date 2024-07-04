/** 
 *  THIS PROJECT USES REACT, BOOTSTRAP and CSS

    https://www.pexels.com/photo/scenic-view-of-mountains-during-dawn-1261728/
*/


import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react"

import { ThreeDotsVertical } from 'react-bootstrap-icons'
import { CaretUpFill } from 'react-bootstrap-icons'
import { CaretDownFill } from 'react-bootstrap-icons'
import { PlayCircle } from 'react-bootstrap-icons'
import { PauseCircle } from 'react-bootstrap-icons'
import { ArrowRepeat } from 'react-bootstrap-icons'

import { clock255WriteUp } from '../data/writeup.js'

import '../assets/css/clock255.css'
import 'bootstrap/dist/css/bootstrap.css';

import alertSound from '../assets/tracks/alert.wav'

/** default reset values */
const RESET = {break: 5, session: 25, current: {time: '25.00', session: true}, cont: false, play: false};


const NavBar = () => {
    return (
        <nav className="container-xl py-3">
            <a className="text-dark" data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvasExample">
            <ThreeDotsVertical size={20} className='text-primary'/>
            </a>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasTimerLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasTimerLabel">Front End Suites</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div>
                    <small>
                    {clock255WriteUp}
                    </small>
                    <p className="text-end"><small>
                        It is created by Andre Tong
                    </small></p>
                </div>
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mt-5">
                    <li className="nav-item">
                        <Link to="/randomquote" className="nav-link text-primary" aria-current="page"><small>Random Quote Generator</small></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/markdownpreviewer" className="nav-link text-primary" aria-current="page"><small>Mark Down Previewer</small></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/drummachine" className="nav-link text-primary" aria-current="page"><small>Drum Machine</small></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/jscalculator" className="nav-link text-primary" aria-current="page"><small>JS Calculator</small></Link>
                    </li>
                    <li className="nav-item">
                        <div to="/clock255" className="nav-link text-primary lead" aria-current="page">Interval Timer</div>
                    </li>
                </ul>

            </div>
            </div>
        </nav>
    )
}



/** Break component */
const BreakComponent = props =>{
    
    const handleBreak = amt =>{
        if (!(props.breaktime === 1 && amt === -1) &&
            !(props.breaktime === 60 && amt === +1)) {
            props.setBreak(props.breaktime + amt);
            props.currUpdate(props.breaktime + amt, false);
            }
        }

    return (
        <div id='break' className='break'>
            <h3 className="display-3">
                
            </h3>
            <button id="break-increment" onClick={()=>handleBreak(1)} className="break-increment break__flex-center">
                <CaretUpFill size={25} className='text-primary'/>
            </button>
            <button id="break-decrement" onClick={()=>handleBreak(-1)} className="break-decrement break__flex-center">
                <CaretDownFill size={25} className='text-primary'/>
            </button>

            <small id='break-label' className="break-label break__flex-center text-center">
                Break Length
            </small>
            <div id="break-length" className="break-length break__flex-center display-6 text-center">
                {props.breaktime}
            </div>


        </div>
        )
}

/** Session component */
const SessionComponent = props =>{

    const handleSession = amt =>{
        if (!(props.session === 1 && amt === -1) &&
            !(props.session === 60 && amt === +1)){
            props.setSession(props.session + amt);
            props.currUpdate(props.session + amt, true);
            }
        }

    return (
        <div id='session' className="session">
            
            <button id="session-increment" onClick={()=>handleSession(1)} className="session-increment session__flex-center">
               <CaretUpFill size={25} className='text-primary'/>
            </button>
            <button id="session-decrement" onClick={()=>handleSession(-1)} className="session-decrement session__flex-center">
                <CaretDownFill size={25} className='text-primary'/>
            </button>

            <small id="session-label" className="session-label session__flex-center text-center">
                Session Length
            </small>

            <div id="session-length" className="session-length session__flex-center display-6 text-center">
                {props.session}
            </div>


        </div>
        )

}


/** Display component */
const DisplayComponent = props =>{
    return (
        <div className="display d-flex justify-content-center align-items-center">
            <div>
                {props.current.session
                 ? <h6 id='timer-label' className="display-6 text-center">Session</h6>
                 : <h6 id='timer-label' className="display-6 text-center">Break</h6>
                }
                <div id='time-left' className="display-1">
                    {props.current.time}
                </div>
            </div>
        </div>
    )
}


/** Contols Component */
const ControlComponent = props =>{
    return (
        <div id='control' className="controls d-flex flex-row justify-content-center align-items-end">
            {   props.play
                ? <button id='start_stop' onClick={props.handlePause} className="mx-2 text-center"><PauseCircle size={40} className='text-primary'/></button>
                : <button id='start_stop' onClick={props.handlePlay} className="mx-2 text-center"><PlayCircle size={40} className='text-primary'/></button>
            }
            <button id='reset' onClick={props.handleReset} className="mx-2"><ArrowRepeat className='text-primary' size={40}/></button>
        </div>
    )

}

let intervalHandle;


/* Main parent component, handles the logic */
const Clock255 = _ =>{

    const [breaktime, setBreak] = useState(RESET.break);
    const [session, setSession] = useState(RESET.session);
    const [current, setCurrent] = useState(RESET.current);
    const [play, setPlay] = useState(RESET.play);
    const [cont, setCont] = useState(RESET.cont);

    /** from number to string */
    const msToMinAndSec = (millis)=> {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);

        return (
            minutes < 10
                ? "0" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds
                : minutes + ":" + (seconds < 10 ? '0' : '') + seconds
        )
    }

    /** from string to number */
    const minAndSecToMs = (minSec)=> {
        let minutes = parseInt(minSec.slice(0, minSec.length-3));
        let seconds = parseInt(minSec.slice(minSec.length-2, minSec.length));
        let millis = minutes * 60000 + seconds * 1000;
        return millis;
      }

    const minIntToTimeStr = (minint)=> {
        let minute = minint.toString();
        return (
        minute.length == 1
            ? '0' + minute + ':00'
            : minute + ':00'
        )
    }

    const handlePlay = () =>{
        let collection = document.getElementsByClassName('timer-btns');
        for (let el of collection)
            el.classList.add("link__disable");
        setPlay(true)
    }

    const handlePause = () =>{
        setPlay(false)
        let collection = document.getElementsByClassName('timer-btns');
        for (let el of collection)
            el.classList.remove("link__disable");
    }

    const handleReset = () =>{
        setBreak(RESET.break);
        setSession(RESET.session);
        setCurrent(RESET.current);
        setCont(RESET.cont);
        setPlay(RESET.play);
        resetSound();
    }

    const playSound = () =>{
        let soundEl = document.getElementById('beep');
        soundEl.pause();
        soundEl.currentTime = 0;
        soundEl.play();
    }

    const resetSound = () =>{
        let soundEl = document.getElementById('beep');
        soundEl.pause();
        soundEl.currentTime = 0;
    }


    const currUpdate = (value, isSession) =>{
        // checks if its displaying and updating the right session/break
        if ((isSession && current.session) || (!isSession && !current.session)){

            setCurrent({time: minIntToTimeStr(value), session: current.session});
        }
    }

    /** on Mount, do */
    useEffect(()=>{
        let timeleft_ms = minAndSecToMs(current.time);
        let isSession = true;
        if (play){
            intervalHandle = setInterval(()=>{
                timeleft_ms -= 1000;
                setCurrent((current)=>({time: msToMinAndSec(timeleft_ms), session: current.session}));
                if (timeleft_ms === -1000){
                    playSound();
                    if (isSession){
                        isSession = false;
                        setCurrent({time: minIntToTimeStr(breaktime), session: false})
                        timeleft_ms = minAndSecToMs(minIntToTimeStr(breaktime));    
                    }
                    else {
                        isSession = true;
                        setCurrent({time: minIntToTimeStr(session), session: true})
                        timeleft_ms = minAndSecToMs(minIntToTimeStr(session));
                    }
                }
            }, 1000)
        }

        if (!play){
            clearInterval(intervalHandle);
        }

    },[play]);

        return (
            <main id='clock255' className="bg-light page-full">
                <div className="container-xl page-full clock-container">
                    <audio id='beep' src={alertSound}></audio>

                    <NavBar />
                    <BreakComponent breaktime={breaktime} setBreak={setBreak} currUpdate={currUpdate}/>
                    <SessionComponent session={session} setSession={setSession} currUpdate={currUpdate}/>
                    <DisplayComponent current={current} />
                    <ControlComponent play={play} handlePlay={handlePlay} handlePause={handlePause} handleReset={handleReset}/>
                </div>
            </main>
        )
    }

export default Clock255