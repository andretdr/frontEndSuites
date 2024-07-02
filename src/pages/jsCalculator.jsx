import { useState, useReducer, useEffect } from 'react'
import buttons from '../data/jsCalculatorInit.js'


const Display = (props) =>{
    useEffect(()=>{
        console.log(props.state.formulaArr);
    },[props.state.formulaArr])

    return (
        <div className='card w-50 h-25'>
            <h3 id='display' className='display-3'>{props.state.currStr}</h3>
            
            <h3 className='display-3'>formula</h3>
            {props.state.formulaStr}
        </div>
    )
}

const Buttons = (props) =>{

    return (
        <div>
            {buttons.map(item=>
                <div key={item.id}>
                    <button className='btn btn-secondary btn-lg' id={item.id} onClick={()=>props.dispatch({type: item.actiontype, op: item.actionop})}>
                        {item.label}
                    </button>
                </div>
            )}
        </div>
        )
}

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
        state.reset
        ? {currStr: operand, formulaArr: state.formulaArr, formulaStr: state.formulaStr.concat(operand), reset: false}
        : {currStr: state.currStr.concat(operand), formulaArr: state.formulaArr, formulaStr: state.formulaStr.concat(operand), reset: false})};

    const infixToPostFix = (state) => {
        const formstr = state.formulaStr;
        const formarr = state.formulaArr;
        let postfixstr = '';
        let stack = [];

        console.log(formarr);
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
        console.log('postfixstr:' + postfixstr)
        return postfixstr;
    }

    const evalFormula = (state) => {
        // convert infix expression to a postfix expression
        // https://www.youtube.com/watch?v=kKSENzdu7bE
        // https://www.youtube.com/watch?v=UKuIw8cKKsc

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
                console.log("item.seatch:"+item.search(/[-+*/]/));
                console.log('item is :'+item+' and is not an operator');
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
        <section>
            <Display state={state}/>
            <Buttons dispatch={dispatch}/>
        </section>
    )
}

export default JsCalculator