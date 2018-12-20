import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux'
import './index.css';

const NOT_EQUALS = "NOT_EQUAL";
const EQUALS_INPUT = "EQUALS_INPUT";
const DOT_INPUT = "DOT_INPUT";
const NEW_OPERATOR_INPUT = "NEW_OPERATOR_INPUT";
const NEW_NUMBER_INPUT = "NEW_NUMBER_INPUT";
const CLEAR = "CLEAR";
const START_EQUATION = "";
const START_RESULT = "0";
const RESET_WARNING = "RESET_WARNING"
const ALLOWED_NUMBER_LENGTH = 15;

const defaultState = {
    equation: START_EQUATION,
    result: START_RESULT,
    warning: 0
};


const resetWarning = () =>{
    return {
        type: RESET_WARNING
    }
}

const equalsInput = () => {
    return {
        type: EQUALS_INPUT
    }
}

const dotInput = () => {
    return {
        type: DOT_INPUT
    }
}

const operatorInput = (newOperator) => {
    return {
        type: NEW_OPERATOR_INPUT,
        newOperator
    }
}

const clearEquation = () => {
    return {
        type: CLEAR
    }
}

const numberInput = (newNumber) => {
    return {
        type: NEW_NUMBER_INPUT,
        newNumber
    }
}

const reducer = (state = defaultState, action)=>{
    switch (action.type){
        case NEW_NUMBER_INPUT:
            //set default values for equation and result
            let equation = state.equation.concat(action.newNumber);
            let result = state.result.concat(action.newNumber);
            let warning = 0;
            //Start testing for conditions to override the default values
            if (/^0$/.test(state.result)){
                if (action.newNumber === "0"){
                    equation = state.equation;
                    result = state.result;
                } else if (/[*-/+]0$/.test(state.equation)){
                    equation = state.equation.replace(/0$/, action.newNumber);
                    result = action.newNumber;
                }
                else {
                    result = action.newNumber;
                    equation = action.newNumber;
                }
            }
            //If result holds operator character erase result and start over  
            else if(/[*/+-]$/.test(state.result)){
                result = action.newNumber;
            } else if(/=/.test(state.equation)){
                result = action.newNumber;
                equation = action.newNumber;
            } else if (result.length > ALLOWED_NUMBER_LENGTH){
                result = state.result;
                equation = state.equation;
                warning = 1;
            }
              
            return Object.assign(
                {},
                state,
                {result: result,
                equation: equation,
                warning: warning}

            );

        case NEW_OPERATOR_INPUT:   
            let oEquation = state.equation.concat(action.newOperator);
            let oResult = action.newOperator;
            let re = /[*/+-]$/;
            if (re.test(state.equation)){
                oEquation = state.equation.replace(re, action.newOperator);
            } else if (/=/.test(state.equation)){
                oEquation = state.result.concat(action.newOperator);
            } else if (state.equation===START_EQUATION && /[*/]/.test(action.newOperator)){
                oEquation = state.equation;
                oResult = state.result;
            }

            return Object.assign(
                {},
                state,
                {result: oResult,
                equation: oEquation}
            );
        case CLEAR:
            return Object.assign(
                {},
                state,
                {result: START_RESULT,
                equation: START_EQUATION}
            );
        case DOT_INPUT:
            let dResult;
            let dEquation;
            if (/\d$/.test(state.result)&&!(/\./.test(state.result))){
                dResult = state.result.concat(".");
                if (state.equation ===""){
                    dEquation = state.equation.concat("0.");
                } else {
                    dEquation = state.equation.concat(".");
                } 
            } else if (/[*/+-]$/.test(state.result)){
                dEquation = state.equation.concat("0.");
                dResult = "0.";
                
            } else {
                dResult = state.result;
                dEquation = state.equation;
            }
            return Object.assign(
                {},
                state,
                {result: dResult,
                equation: dEquation}
            )
        
        case EQUALS_INPUT:
            let eResult;
            let eEquation;
            if (!/=/.test(state.equation)){
                try{
                    eResult = eval(state.equation).toString();
                    eEquation = state.equation.concat("=", eResult);
                } catch(err){
                    eResult = state.result;
                    eEquation = state.equation;
                }
            } else {
                eResult = state.result;
                eEquation = state.equation;
            }
            return Object.assign(
                {},
                state,
                {result: eResult,
                equation: eEquation}
            );
        case RESET_WARNING:
            return Object.assign(
                {},
                state,
                {warning: 0}
            );
        default: 
            return state;
    }
}



const mapStateToProps = (state)=>{
    return{
        equation: state.equation,
        result: state.result,
        warning: state.warning
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onNewNumberInput: (newNumber) => dispatch(numberInput(newNumber)),
        onClear: () => dispatch(clearEquation()),
        onOperatorInput: (newOperator) => dispatch(operatorInput(newOperator)),
        onDotInput: () => dispatch(dotInput()),
        onEqualsInput: () => dispatch(equalsInput()),
        warningTimeout: () => dispatch(resetWarning()),
        
    }
}

let store = createStore(reducer);


class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.numberInputHandler = this.numberInputHandler.bind(this);
        this.clearHandler = this.clearHandler.bind(this);
        this.operatorInputHandler = this.operatorInputHandler.bind(this);
        this.dotInputHandler = this.dotInputHandler.bind(this);
        this.equalsInputHandler = this.equalsInputHandler.bind(this);
    }

    equalsInputHandler(){
        this.props.onEqualsInput();
    }

    dotInputHandler(){
        this.props.onDotInput();
    }

    operatorInputHandler(event){
        this.props.onOperatorInput(event.target.textContent)
    }

    numberInputHandler(event){
        this.props.onNewNumberInput(event.target.textContent);
    }

    clearHandler(){
        this.props.onClear();
    }

    componentDidUpdate(){
        console.log(this.props.warning);
        if (this.props.warning ===1){
            setTimeout(() => {this.props.warningTimeout()}, 1000);
        }
    }

    render(){
        let result;
        if (this.props.warning === 1){
            result = "Number contains too many digits";
        }else{
            
            result = this.props.result;
        }
        return(
            <div className = "machine">
                <Display equation = {this.props.equation}
                         result = {result}/>
                <ButtonPad 
                    numberHandler = {this.numberInputHandler}
                    clearHandler = {this.clearHandler}
                    operatorHandler = {this.operatorInputHandler}
                    dotHandler = {this.dotInputHandler}
                    equalsHandler={this.equalsInputHandler}/>
            </div>
        );
    }
}

function ButtonPad(props){
    let buttonIdArray = ["zero", "one", "two", "three", "four",
                         "five", "six", "seven", "eight", "nine"];
    const numberButtonArray = buttonIdArray.map((id, index) => {
        return <button onClick = {props.numberHandler} id = {id} className = "button">{index}</button>
    });
    return (
        <div id = "buttons">
            <button id = "equals" className = "button" onClick={props.equalsHandler}>=</button>
            <button id = "add" className = "button" onClick = {props.operatorHandler}>+</button>
            <button id = "subtract" className = "button" onClick = {props.operatorHandler}>-</button>
            <button id = "multiply" className = "button" onClick = {props.operatorHandler}>*</button>
            <button id = "divide" className = "button" onClick = {props.operatorHandler}>/</button>
            <button id = "decimal" className = "button" onClick = {props.dotHandler}>.</button>
            <button id = "clear" className = "button" onClick = {props.clearHandler}>AC</button>
            {numberButtonArray}
        </div>
    );


}

function Display(props){
    return (
        <div id="display-wrapper">
            <p id = "equation">{props.equation}</p>
            <p id = "display">{props.result}</p>
        </div>
    );
}

const Component = connect(mapStateToProps, mapDispatchToProps)(Calculator);





ReactDOM.render(
    <Provider store ={store}>
        <Component />
    </Provider>, 
    document.getElementById('root'));
