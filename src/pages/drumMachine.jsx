/** 
 * THIS PROJECT USES REACT, BOOTSTRAP and CSS
*/

import React, { useReducer } from 'react'
import { useState, useEffect } from 'react'
import { displayMapping, audioMapping } from '../data/drumMachineInit';
import '../assets/css/drumMachine.css'
import drumSVG from '../assets/images/drum.png'
import drumMachine from '../assets/images/drumMachine.png'
import { drumMachineWriteUp } from '../data/writeup.js'
import { drumMachineHistory } from '../data/drumMachineInit.js'
import { VolumeUpFill } from 'react-bootstrap-icons'


/** Info Section */
const WriteUp = () => {
    return (

        <div className='container-lg'>
            <p className='text-justify m-5'>{drumMachineWriteUp}</p>
            <p className='text-end m-5'>It is created by Andre Tong</p>
        </div> 

            )
}


/** Drum Machine Image */
const Image = () => {
    return  <img key='drum-machine' src={drumMachine} alt="Drum Machine" width="1400" height="800" className="d-inline-block"></img>
}


/** Drum Machine History */
const History = () => {
    return  (
        <div className='container-lg'>
            <h6 className='display-6 text-center m-5'>Drum Machine</h6>
            {drumMachineHistory.map((item, key)=>{
                return <p key={key} className='text-justify m-5'>{item}</p>
            })}
            
        </div> 
    )
}


/** Nav Bar */
const NavBar = () => {

    return (
        <nav className="navbar-light navbar-expand-lg bg-light py-2">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand mx-5 d-none d-lg-block" href="#drum-machine">
                    <img src={drumSVG} alt="Logo" width="40" height="41" className="d-inline-block align-text-top"></img>
                   
                    </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/randomquote">Random Quote Generator</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/markdownpreviewer">Mark Down Previewer</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/drummachine">Drum Machine</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/jscalculator">JS Calculator</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/clock255">Interval Timer</a>
                    </li>
                </ul>

                <div className='mx-5'>
                    <a className="nav-link text-dark  d-none d-lg-block" href="/">Front End Suites</a>
                    
                </div>

                </div>
            </div>
        </nav>
    )
}


/* Key pad */
const KeyPad = (props) => {
    const letterArr = ['q','w','e','a','s','d','z','x','c'];

    return (<>
                <div className='grid'>
                    {letterArr.map(item=>
                    <div key={'grid'+item} id={'grid'+item} className='d-flex justify-content-center align-items-center'>
                        <button onClick={()=>props.dispatch({type:item})} 
                        className='btn btn-lg btn-secondary drum-pad' id={'sound'+item}>
                            {item.toUpperCase()}
                        </button>
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


/* main parent component */
const DrumMachine = () => {
    // states
    const [power, setPower] = useState(true);
    const [bank, setBank] = useState(false);
    const [volume, setVolume] = useState('5');

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
    const handleKeyPress=(event)=>{ dispatch({type: (event.key).toLowerCase()});}

    /**  will do this on mount only 
     *   handle keydown logic and dispatch */
    useEffect(()=>{
        // listen for keydown
        document.addEventListener('keydown', handleKeyPress);
        // cleanup function on dismount
        return ()=>{ document.removeEventListener('keydown', handleKeyPress);} 
    }, []);

    /* listening to keypress state, if changes, play sound*/
    useEffect(()=>{
        if ((keyPress.key !='') && power) {
            let audio = new Audio(audioMapping[keyPress.key])
            audio.volume = volume/10;
            audio.play();
        }
    }, [keyPress])

    return (
        <>
            <section>
                <NavBar />
            </section>

            <section id='top' className='d-none d-lg-flex flex-column align-items-center justify-content-start'>
                <Image />
            </section>

            <section id='history' className='bg-light py-1 py-lg-5'>
                <History />
            </section>

            <section  id='drum-machine' className='container-xl py-5'>
                <div className='d-flex flex-column flex-md-row justify-content-center'>
                    <div className='d-flex flex-row justify-content-center'>
                        <ControlPad keyPress={keyPress.key} power={{power:power, set:setPower}} 
                        bank={{bank:bank, set:setBank}} volume={{volume: volume, set:setVolume}}/>
                    </div>
                    <div className=''>
                        <KeyPad dispatch={dispatch}/>
                    </div>
                </div>
            </section>

            <section className='bg-light py-5'>
                <WriteUp />
            </section>


        </>
    )
}

export default DrumMachine