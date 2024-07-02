import React, { useReducer } from 'react'
import { useState, useEffect } from 'react'

import soundq from '../assets/tracks/Heater-1.mp3'
import soundw from '../assets/tracks/Heater-2.mp3'
import sounde from '../assets/tracks/Heater-3.mp3'
import sounda from '../assets/tracks/Heater-4.mp3'
import sounds from '../assets/tracks/Clap.mp3'
import soundd from '../assets/tracks/Open-HH.mp3'
import soundz from '../assets/tracks/Kick_n_Hat.mp3'
import soundx from '../assets/tracks/Kick.mp3'
import soundc from '../assets/tracks/Closed-HH.mp3'

const displayMapping = [{
    'Q': 'Heater 1',
    'W': 'Heater 2',
    'E': 'Heater 3',
    'A': 'Heater 4',
    'S': 'Clap',
    'D': 'Open HH',
    'Z': 'Kick n Hat',
    'X': 'Kick',
    'C': 'Closed HH'
}]


function playsound(id){
    document.getElementById(id)
    .play()

}

const KeyPad = (props) => {
    const letterArr = ['Q','W','E','A','S','D','Z','X','C'];
    const letterMapping = {
        'Q': soundq,
        'W': soundw,
        'E': sounde,
        'A': sounda,
        'S': sounds,
        'D': soundd,
        'Z': soundz,
        'X': soundx,
        'C': soundc
        };

    const handleClick = (item) => {
        props.dispatch({type:item})
        playsound(item.toUpperCase())
    }

    
    return (
            <div className='col-6'>
                {letterArr.map(item=> 
                    <div className='col-2' key={item+'key'}>
                        <button onClick={()=>handleClick(item)} 
                            className='btn btn-lg btn-secondary drum-pad' 
                            id={'sound'+'item'}>
                            
                            <audio src={letterMapping[item.toUpperCase()]} 
                                className='clip' 
                                id={item}>
                            </audio>
                            {item.toUpperCase()}
                        </button></div>)}
            </div>
)}







const ControlPad = (props) => {
    /* update power state */
    const handleChangePower = () => {props.power.set(!props.power.power)}
    /* update bank state */
    const handleChangeBank = () => {props.bank.set(!props.bank.bank)}
    /* update volume state */
    const handleChangeVolume = (event) => {props.volume.set(event.target.value)}

    return (
        <div className='col-6'>
            <div className='col'>
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Power</label>
                    <input className="form-check-input" onChange={handleChangePower} type="checkbox" 
                        role="switch" id="flexSwitchCheckChecked" defaultChecked />
                </div>
            </div>

            <div className='col h-25'>
                <h3 id='display' className='display-2a'>
                    { ((props.keyPress.search(/\b[QWEASDZXC]\b/) != -1) && props.power.power) 
                        ? displayMapping[0][[props.keyPress]]
                        : ' ' }
                </h3>                
            </div>

            <div className='col'>
                <h1 className="display-2">Volume</h1>
                {props.power.power
                ? <input onChange={handleChangeVolume} type='range' min='0' max='10' value={props.volume.volume} step='0.1'/>
                : <input type='range' min='0' max='10' disabled/>}
            </div>

            <div className='col'>
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Bank</label>
                    {props.power.power
                    ? <input className="form-check-input" onChange={handleChangeBank} type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
                    : <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" disabled/>}
                </div>
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
        const pattern = /\b[QWEASDZXC]\b/i;
        if (pattern.test(action.type))
            return ({key: action.type, toggle: !state.toggle});   
        else 
            return ({key:'', toggle: state.toggle});
    }
    
    // useReducer for this instead
    const[keyPress, dispatch] = useReducer(reducer, {key:'', toggle: false});

    /** updates keypress state */
    const handleKeyPress=(event)=>{ 
        
        dispatch({type: (event.key.toUpperCase())});
        playsound(event.key.toUpperCase());
    }

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

            playsound(keyPress.key.toUpperCase());
            
        }
    }, [keyPress])

    return (
        <section id='drum-machine'>
            <div className='row'>
                <KeyPad dispatch={dispatch}/>
                <ControlPad keyPress={keyPress.key} power={{power:power, set:setPower}} 
                    bank={{bank:bank, set:setBank}} volume={{volume: volume, set:setVolume}}/>
            </div>
        </section>
    )
}

export default DrumMachine