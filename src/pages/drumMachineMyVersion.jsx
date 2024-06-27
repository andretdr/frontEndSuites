import React, { useReducer } from 'react'
import { useState, useEffect } from 'react'
import { displayMapping, audioMapping } from './drumMachineInit';


const KeyPad = (props) => {
    const letterArr = ['q','w','e','a','s','d','z','x','c'];
    const html = letterArr.map(item=>
        <div className='col-2'><button onClick={()=>props.dispatch({type:item})} className='btn btn-lg btn-secondary drum-pad'
            id={'sound'+'item'}>{item.toUpperCase()}</button></div>);
    return (
            <div className='col-6'>
                <div className='row g-2 justify-content-center align-items-center'>
                    {html[0]}
                    {html[1]}
                    {html[2]}
                </div>
                <div className='row g-2 justify-content-center align-items-center'>
                    {html[3]}
                    {html[4]}
                    {html[5]}
                </div>
                <div className='row g-2 justify-content-center align-items-center'>
                    {html[6]}
                    {html[7]}
                    {html[8]}
                </div>
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
                    { ((props.keyPress.search(/[qweasdzxc]/) != -1) && props.power.power) 
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