/** This project is developed using React, Bootstrap and CSS. 
    It calculates the result in two steps, firstly by converting the input infix expression 
    into a postfix expression using a stack,
    and then evaluating the postfix expression again using a stack.
    
     convert infix expression to a postfix expression
     https://www.youtube.com/watch?v=kKSENzdu7bE
     https://www.youtube.com/watch?v=UKuIw8cKKsc
*/


import { useState, useReducer, useEffect } from 'react'
import buttons from '../data/jsCalculatorInit.js'
import '../assets/css/calculator.css'
import { List } from 'react-bootstrap-icons'
import { jsCalculatorWriteUp } from '../data/writeup.js'


/** NavBar */
const NavBar = () =>{
    return ( 

    <div className="container-xl bg-primary">
        <nav className="navbar navbar-expand-md navbar-dark">
            <div className="container-xl">
                <a className="navbar-brand me-auto" href="/">Front End Suites</a>
                <button className="navbar-toggler border-0 ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <List />
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item ms-auto me-auto">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item ms-auto me-auto">
                            <a className="nav-link" href="/randomquote">Random Quote</a>
                        </li>
                        <li className="nav-item ms-auto me-auto">
                            <a className="nav-link" href="/markdownpreviewer">Mark Down Previewer</a>
                        </li>
                        <li className="nav-item ms-auto me-auto">
                            <a className="nav-link" href="/drummachine">Drum Machine</a>
                        </li>
                        <li className="nav-item ms-auto me-auto">
                            <a className="nav-link" href="/jscalculator">Calculator</a>
                        </li>
                        <li className="nav-item ms-auto me-auto">
                            <a className="nav-link" href="/clock255">Interval Timer</a>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    </div>
    )
}


/** Header */
const Header = () =>{
    return (
        <section className=''>
            <h1 className='display-1'>Calculator</h1>
        </section>
    )
}


/** Display component */
const Display = (props) =>{
    useEffect(()=>{
    },[props.state.formulaArr])

    return (
        <section className='container-lg bg-light'>
            <div id='display' className='d-flex flex-column justify-content-center align-items-center'>
                <span className='lead mb-0 mb-md-5 me-auto mx-5' style={{height: '30px'}}>{props.state.formulaStr}</span>
                <h3 className='display-1'>{props.state.currStr}</h3>
            </div>
        </section>
    )
}


/** Buttons Component */
const Buttons = (props) =>{
    return (

        <section className='button-grid '>
                {buttons.map(item=>
                    <div key={item.id} id={item.id}>
                        {item.actionop === 'OPERAND'
                            ? <button className='btn btn-secondary btn-lg' onClick={()=>props.dispatch({type: item.actiontype, op: item.actionop})}>{item.label}</button>
                            : <button className='btn btn-primary btn-lg' onClick={()=>props.dispatch({type: item.actiontype, op: item.actionop})}>{item.label}</button>
                        }
                    </div>
                )}

        </section>
        )
}


/** WriteUp Component */
const WriteUp = () =>{
    return (
        <section className='w-50 d-none d-md-block'>
            <h1 className='mb-4'>JS Calculator</h1>
            <p className='text-justify'>{jsCalculatorWriteUp[0]}</p>
            <p className='text-justify'>{jsCalculatorWriteUp[1]}</p>
            <p className='text-justify'>{jsCalculatorWriteUp[2]}</p>
            <p className='text-start'>It is created by Andre Tong</p>
        </section>
    )}


/** Endbit Component */
const EndWriteUp = () =>{
    return (
        <section className='container-lg bg-light pb-5 d-block d-md-none'>
            <h1 className='pt-5 pb-3 text-center'>JS Calculator</h1>
            <p className='text-center text-wrap'>{jsCalculatorWriteUp[0]}</p>
            <p className='text-center text-wrap'>{jsCalculatorWriteUp[1]}</p>
            <p className='text-center text-wrap'>{jsCalculatorWriteUp[2]}</p>
            <p className='text-center'>It is created by Andre Tong</p>
        </section>
    )}


/** Calculator container for formatting */
const CalculatorContainer = (props) =>{
    return (<>
            
            <Display state={props.state}/>
            <div className='container-lg'>
                <div className='d-flex flex-column flex-md-row justify-content-evenly align-items-center align-items-md-start py-5'>
                    <Buttons dispatch={props.dispatch}/>
                    <WriteUp />
                </div>
            </div>
            </>
    )
}

/** Main parent component */
const JsCalculator = () =>{

    const[repeatDec, setRepeatDec] = useState(false);

    const operatorReturn = (operator, state) =>{
        // if prev entry was operator
        if (state.formulaStr[state.formulaStr.length-1].search(/[+*/-]/) > -1)
            if (operator !== '-') // if current entry is not '-'
                return {currStr: state.currStr, formulaArr: [...state.formulaArr.slice(0, state.formulaArr.length-1), operator], formulaStr: state.formulaStr.slice(0, state.formulaStr.length-1).concat(operator), reset: true }
            else { // if its negative
                return {currStr: '-', formulaArr: state.formulaArr, formulaStr: state.formulaStr.concat(operator), reset: false }
            }   
        return (
        {currStr: state.currStr, formulaArr: [...state.formulaArr, state.currStr, operator], formulaStr: state.formulaStr.concat(operator), reset: true })
    
    };

    const operandReturn = (operand, state) =>{

        // reset repeatDec
        if (state.reset)
            setRepeatDec(false);
        // if leading 0s
        if (operand === '0' && state.currStr === '0')
            return {currStr: '0', formulaArr: [], formulaStr: '0', reset: true }

        if (operand === '.')
            if (!repeatDec)
                setRepeatDec(true);
            else
                return {currStr: state.currStr, formulaArr: state.formulaArr, formulaStr: state.formulaStr, reset: false};

        return (
        !state.reset
        ? {currStr: state.currStr.concat(operand), formulaArr: state.formulaArr, formulaStr: state.formulaStr.concat(operand), reset: false}
        : (state.formulaStr.length === 0)
        ? {currStr: operand, formulaArr: state.formulaArr, formulaStr: state.formulaStr.concat(operand), reset: false}
        : {currStr: operand, formulaArr: state.formulaArr, formulaStr: operand, reset: false}

        )};
        

    /** Does the infix to postfix operation */
    const infixToPostFix = (state) => {
        const formstr = state.formulaStr;
        const formarr = state.formulaArr;
        let postfixstr = '';
        let stack = [];

        /** checks if the topstack is greater or equal in precedence to operand */
        const shouldPopStack =(operand)=>{

            // if stack is empty, return false
            if (stack.length == 0) 
                return false;

            // ASSIGNING PRECEDENCE
            // assign current operand's precedence
            let currentPrecedence, topStackPrecedence;
            (operand.search(/[*/]/) != -1)
            ? currentPrecedence=2
            : currentPrecedence=1
            // assign topstack operand's precedence
            const topStackOperand = stack[stack.length-1];
            (topStackOperand.search(/[*/]/) != -1)
            ? topStackPrecedence=2
            : topStackPrecedence=1

            return (
                (topStackPrecedence >= currentPrecedence)
                ? true
                : false
            )
        }

        // SCANNING ARR
        for (let item of formarr) {
            // if its a digit or dec
            if (item.search(/[0-9.]/) > -1)
                postfixstr += item;
            // elseif its an operator
            else if (item.search(/[-+*=/]/) > -1){
                postfixstr += ",";
                while (shouldPopStack(item)) {
                    // pop operand from stack, append to postfixstr
                    postfixstr += stack.pop() + ",";
                }
                stack.push(item)
            }
        }
        while (stack.length != 0)
            postfixstr += "," + stack.pop();
        return postfixstr;
    }

    /** Does the infix to postfix operation */
    const evalFormula = (state) => {

        let newState = {currStr: state.currStr, formulaArr: [...state.formulaArr, state.currStr], formulaStr: state.formulaStr, reset: false }

        const postfix = infixToPostFix(newState);
        const postfixArr = postfix.split(',');
        let stack = [];

        const calculate = (op1, op2, operator) =>{
            switch (operator){
                case '+' : return parseFloat(op1) + parseFloat(op2)
                case '-' : return parseFloat(op1) - parseFloat(op2)
                case '*' : return parseFloat(op1) * parseFloat(op2)
                case '/' : return parseFloat(op1) / parseFloat(op2)
            }
        }

        // Scan postfixArr
        for (let item of postfixArr){
            // if item is an operand
            if (item.search(/[0-9]/) != -1) {
                stack.push(item)

            }
            else { // if its an operator
                let op2 = stack.pop(); // the order matters
                let op1 = stack.pop();
                let result = calculate(op1,op2,item);
                stack.push(result)
            }
        }
        let answer = stack.pop();
        return {currStr: answer.toString(), formulaArr:[], formulaStr: answer.toString(), reset: true};
    }

    const reducer = (state, action) => {
        switch (action.op) {
            case 'AC': 
                return {currStr: '0', formulaArr:[], formulaStr: '', reset: true};
            case 'OPERATOR': 
                return operatorReturn(action.type, state);
            case 'OPERAND':
                return operandReturn(action.type, state);
            case 'EVAL':
                return evalFormula(state); 
        }
    }

    const [state, dispatch] = useReducer(reducer, {currStr:'0', formulaArr:[], formulaStr:'', reset: true});

    return (
        <main>
            <NavBar />
            {/* <Header /> */}
            <CalculatorContainer state={state} dispatch={dispatch}/>
            <EndWriteUp />

        </main>
    )
}

export default JsCalculator