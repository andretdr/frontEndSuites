import React, { useEffect } from "react"
import {useState} from 'react'

import alertSound from '../assets/tracks/alert.wav'

const RESET = {break: 5, session: 25, current: {time: '25.00', session: true}, cont: false, play: false};

const BreakComponent = props =>{
    
    const handleBreak = amt =>{
        if (!(props.breaktime === 1 && amt === -1) &&
            !(props.breaktime === 60 && amt === +1)) {
            props.setBreak(props.breaktime + amt);
            props.currUpdate(props.breaktime + amt, false);
            }
        }

    return (
        <div id='break'>
            <h3 className="display-3">
                
            </h3>
            <button id="break-increment" onClick={()=>handleBreak(1)} className="btn btn-primary timer-btns">
                UP
            </button>
            <h5 id='break-label'>
                Break Length
            </h5>
            <div id="break-length">
                {props.breaktime}
            </div>
            <button id="break-decrement" onClick={()=>handleBreak(-1)} className="btn btn-primary timer-btns">
                DOWN
            </button>

        </div>
        )
}

const SessionComponent = props =>{

    const handleSession = amt =>{
        if (!(props.session === 1 && amt === -1) &&
            !(props.session === 60 && amt === +1)){
            props.setSession(props.session + amt);
            props.currUpdate(props.session + amt, true);
            }
        }

    return (
        <div id='session'>
            <h3 className="display-3">
                
            </h3>
            <button id="session-increment" onClick={()=>handleSession(1)} className="btn btn-primary timer-btns">
                UP
            </button>
            <h5 id="session-label">
                Session Length
            </h5>
            <div id="session-length">
                {props.session}
            </div>
            <button id="session-decrement" onClick={()=>handleSession(-1)} className="btn btn-primary timer-btns">
                DOWN
            </button>

        </div>
        )

}

const DisplayComponent = props =>{


    return (
        <div id='display'>
            <div>
                {props.current.session
                 ? <h6 id='timer-label'>Session</h6>
                 : <h6 id='timer-label'>Break</h6>
                }
                <div id='time-left'>
                    {props.current.time}
                </div>
            </div>
        </div>
    )
}

const ControlComponent = props =>{

    return (
        <div id='control'>
            {   props.play
                ? <button id='start_stop' onClick={props.handlePause} className="btn btn-primary">pause</button>
                : <button id='start_stop' onClick={props.handlePlay} className="btn btn-primary">play</button>
            }
            <button id='reset' onClick={props.handleReset} className="btn btn-primary">reset</button>
        </div>
    )

}

let intervalHandle;

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

    useEffect(()=>{
//        console.log(current);
    }, [current]);

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
            <section id='clock255'>
                <audio id='beep' src={alertSound}></audio>
                <BreakComponent breaktime={breaktime} setBreak={setBreak} currUpdate={currUpdate}/>
                <SessionComponent session={session} setSession={setSession} currUpdate={currUpdate}/>
                <DisplayComponent current={current} />
                <ControlComponent play={play} handlePlay={handlePlay} handlePause={handlePause} handleReset={handleReset}/>
            </section>
        )
    }

export default Clock255