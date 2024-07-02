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
            <p className='text-center'>{drumMachineWriteUp}</p>
            <p className='text-end'>It is created by Andre Tong</p>
        </div> 

            )
}


/** Drum Machine Image */
const Image = () => {
    return  <img src={drumMachine} alt="Drum Machine" width="1400" height="800" class="d-inline-block"></img>
}


/** Drum Machine History */
const History = () => {
    return  (
        <div className='container-lg'>
            <h6 className='display-6 text-center m-5'>Drum Machine</h6>
            {drumMachineHistory.map((item)=>{
                return <p className='text-justify m-5'>{item}</p>
            })}
            
        </div> 
    )
}


/** Nav Bar */
const NavBar = () => {

    return (
        <nav class="navbar-light navbar-expand-lg bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand mx-5 d-none d-lg-block" href="#drum-machine">
                    <img src={drumSVG} alt="Logo" width="40" height="41" class="d-inline-block align-text-top"></img>
                   
                    </a>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/randomquote">Random Quote Generator</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/markdownpreviewer">Mark Down Previewer</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/jscalculator">JS Calculator</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="clock255">Break Timer</a>
                    </li>
                </ul>

                <div className='mx-5'>
                    <a class="nav-link text-dark  d-none d-lg-block" href="/">Front End Suites</a>
                    
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
                    <div id={'grid'+item}>
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
        <div className='card bg-light mt-5 h-75 w-75 d-flex flex-column justify-content-start'>
            <div className='my-2 ms-auto mx-4'>
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
                    <input className="form-check-input checkbox-1x" onChange={handleChangePower} type="checkbox" 
                        role="switch" id="flexSwitchCheckChecked" defaultChecked />
                </div>
            </div>

            <div id='display' className='card p-2 mx-5 my-4 bg-light '>
                <h3 className='lead text-center'>
                    { ((props.keyPress.search(/[qweasdzxc]/) != -1) && props.power.power) 
                        ? displayMapping[0][[props.keyPress]]
                        : ' ' }
                </h3>                
            </div>

            <div className='d-flex flex-row justify-content-start align-items-center mx-4'>
                <VolumeUpFill />
                {props.power.power
                ? <input id='volume' onChange={handleChangeVolume} type='range' min='0' max='10' value={props.volume.volume} step='0.1'/>
                : <input id='volume' type='range' min='0' max='10' disabled/>}
            </div>

            {/* <div className='col'>
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Bank</label>
                    {props.power.power
                    ? <input className="form-check-input" onChange={handleChangeBank} type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
                    : <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" disabled/>}
                </div>
            </div> */}

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

            <section id='history' className='bg-light py-5'>
                <History />
            </section>

            <section  id='drum-machine' className='container-xl py-5'>
                <div className='row'>
                    <div className='col-12 col-md-8 col-lg-6'>
                        <KeyPad dispatch={dispatch}/>
                    </div>
                    <div className='col-12 col-md-4 col-lg-6'>
                        <ControlPad keyPress={keyPress.key} power={{power:power, set:setPower}} 
                        bank={{bank:bank, set:setBank}} volume={{volume: volume, set:setVolume}}/>
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