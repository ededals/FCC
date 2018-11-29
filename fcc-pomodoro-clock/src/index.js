import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import {connect, Provider} from 'react-redux'


const DEFAULT_TIMER_STATE = 0;
const SESSION_PHASE = "Session";
const BREAK_PHASE = "Break";
const DEFAULT_SESSION_LENGTH = 25;
const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SECONDS = 0;
const DEFAULT_MINUTES = DEFAULT_SESSION_LENGTH;
const DEFAULT_PHASE = SESSION_PHASE;
const INCREMENT_BREAK_LENGTH = "INCREMENT BREAK LENGTH";
const DECREMENT_BREAK_LENGTH = "DECREMENT BREAK LENGTH";
const INCREMENT_SESSION_LENGTH = "INCREMENT SESSION LENGTH";
const DECREMENT_SESSION_LENGTH = "DECREMENT SESSION LENGTH";
const TIMER_STATE_CHANGE = "TIMER_STATE_CHANGE";
const RESET = "RESET";
const TICK = "TICK";





const defaultState = {
    sessionLength: DEFAULT_SESSION_LENGTH,
    breakLength: DEFAULT_BREAK_LENGTH,
    seconds : DEFAULT_SECONDS,
    minutes : DEFAULT_MINUTES,
    phase : DEFAULT_PHASE,
    timerState : DEFAULT_TIMER_STATE
}

const tick = () =>{
    return{
        type:TICK
    }
}

const updateTimerState = (newTimerState) =>{
    return{
        type: TIMER_STATE_CHANGE,
        newTimerState
    }
}

const decrementSessionLength = () => {
    return {
        type: DECREMENT_SESSION_LENGTH,
    }
}

const incrementSessionLength = ()=>{
    return {
        type: INCREMENT_SESSION_LENGTH,
    }
}

const decrementBreakLength = () => {
    return {
        type: DECREMENT_BREAK_LENGTH,
    }
}

const incrementBreakLength = () => {
    return {
        type: INCREMENT_BREAK_LENGTH,
    }
}

const reset = () =>{
    return{
        type: RESET,
    }
}

const reducer = (state = defaultState, action) =>{
    let sessionLength;
    let timerMinutes;
    let breakLength;
    let seconds;
    let minutes;
    let phase;
    switch (action.type){

        case DECREMENT_SESSION_LENGTH:
            state.sessionLength > 1 ? 
                sessionLength = state.sessionLength - 1 : 
                sessionLength = state.sessionLength;
            state.phase === SESSION_PHASE ? 
                timerMinutes = sessionLength : 
                timerMinutes = state.minutes;
            return Object.assign(
                {},
                state,
                {sessionLength: sessionLength,
                minutes: timerMinutes}
            )

        case INCREMENT_SESSION_LENGTH:
            state.sessionLength < 60 ?
                sessionLength = state.sessionLength + 1:
                sessionLength = state.sessionLength;
            state.phase === SESSION_PHASE ?
                timerMinutes = sessionLength :
                timerMinutes = state.minutes;
            return Object.assign(
                {},
                state,
                {sessionLength: sessionLength,
                minutes: timerMinutes}
            )

        case DECREMENT_BREAK_LENGTH:
            state.breakLength > 1 ? 
                breakLength = state.breakLength - 1: 
                breakLength = state.breakLength;
            state.phase === BREAK_PHASE ?
                timerMinutes = breakLength:
                timerMinutes = state.minutes;
            return Object.assign(
                {},
                state,
                {breakLength: breakLength,
                minutes: timerMinutes}
            ) 

        case INCREMENT_BREAK_LENGTH:
            state.breakLength < 60 ? 
                breakLength = state.breakLength + 1: 
                breakLength = state.breakLength; 
            state.phase === BREAK_PHASE ?
                timerMinutes = breakLength:
                timerMinutes = state.minutes;           
            return Object.assign(
                {},
                state,
                {breakLength: breakLength,
                minutes: timerMinutes}
            )
        case TIMER_STATE_CHANGE:
            return Object.assign(
                {},
                state,
                {timerState: action.newTimerState}
            )
        case TICK:
            if (state.seconds > 0){
                seconds = state.seconds - 1;
                minutes = state.minutes;
                phase = state.phase;
            } else if(state.seconds === 0 && state.minutes === 0){
                seconds = state.seconds;
                if (state.phase == BREAK_PHASE){
                    phase = SESSION_PHASE;
                    minutes = state.sessionLength;
                } else{
                    phase = BREAK_PHASE;
                    minutes = state.breakLength;
                }
            } else if (state.seconds === 0){
                seconds = 59;
                phase = state.phase;
                minutes = state.minutes-1;

            }
           
            
            return Object.assign(
                {},
                state,
                {seconds: seconds,
                minutes: minutes,
                phase: phase}
            )
        case RESET:
            return defaultState;
        default: 
            return state;
    }
}

const mapStateToProps = (state) => {
    return {
        sessionLength: state.sessionLength,
        breakLength: state.breakLength,
        minutes: state.minutes,
        seconds: state.seconds,
        phase: state.phase,
        timerState: state.timerState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onResetClick: ()=>dispatch(reset()),
        onBreakIncrementClick: ()=>dispatch(incrementBreakLength()),
        onBreakDecrementClick: ()=>dispatch(decrementBreakLength()),
        onSessionIncrementClick: ()=>dispatch(incrementSessionLength()),
        onSessionDecrementClick: ()=>dispatch(decrementSessionLength()),
        onTimerStateChange: (newTimerState)=>dispatch(updateTimerState(newTimerState)),
        onTick: ()=> dispatch(tick()),
    }
}

let store = createStore(reducer);


class Clock extends React.Component{
    constructor(props){
        super(props);
        this.resetHandler=this.resetHandler.bind(this);
        this.breakIncrementHandler = this.breakIncrementHandler.bind(this);
        this.breakDecrementHandler = this.breakDecrementHandler.bind(this);
        this.sessionIncrementHandler = this.sessionIncrementHandler.bind(this);
        this.sessionDecrementHandler = this.sessionDecrementHandler.bind(this);
        this.startStopHandler = this.startStopHandler.bind(this);
    }

    
    

    startStopHandler(){
        if(this.props.timerState === DEFAULT_TIMER_STATE){
            console.log(this.props.timerState);
            let newTimerState = setInterval(()=>{this.props.onTick()}, 1000);
            this.props.onTimerStateChange(newTimerState);
            console.log(`timer started with handler ${newTimerState}`)

        } else {
            console.log(`clearing timer with handler ${this.props.timerState}`);
            clearInterval(this.props.timerState);
            this.props.onTimerStateChange(DEFAULT_TIMER_STATE);
        }
    }

    sessionDecrementHandler(){
        this.props.onSessionDecrementClick();
    }

    sessionIncrementHandler(){
        this.props.onSessionIncrementClick();
    }

    breakDecrementHandler(){
        this.props.onBreakDecrementClick();
    }

    breakIncrementHandler(){
        this.props.onBreakIncrementClick();
    }

    resetHandler(){
        if (this.props.timerState !== DEFAULT_TIMER_STATE){
            this.startStopHandler();
        }
        let beeper = document.getElementById("beep");
        if (!beeper.paused){
            beeper.pause();
            beeper.currentTime = 0;
        }
        this.props.onResetClick();
    }
    render(){
        return(
            <div id = "machine">
                <h1>Pomodoro clock</h1>
                <SessionBreak 
                    breakLength = {this.props.breakLength}
                    breakIncrementHandler = {this.breakIncrementHandler}
                    breakDecrementHandler = {this.breakDecrementHandler}
                    sessionIncrementHandler = {this.sessionIncrementHandler}
                    sessionDecrementHandler = {this.sessionDecrementHandler}
                    sessionLength = {this.props.sessionLength}/>
                <Timer
                    phase = {this.props.phase}
                    seconds = {this.props.seconds}
                    minutes = {this.props.minutes} />
                <Controls 
                    resetHandler = {this.resetHandler}
                    startStopHandler = {this.startStopHandler}/>
            </div>
        );
    }
}

function SessionBreak(props){
    return (
        <div>
            <BreakControl 
                breakLength = {props.breakLength}
                breakIncrementHandler = {props.breakIncrementHandler}
                breakDecrementHandler = {props.breakDecrementHandler}/>
            <SessionControl
                sessionLength = {props.sessionLength}
                sessionIncrementHandler = {props.sessionIncrementHandler}
                sessionDecrementHandler = {props.sessionDecrementHandler}/>
        </div>
    
    );
}

function SessionControl(props){
    return(
        <div>
            <h2 id = "session-label">Session length</h2>
            <button 
                id = "session-decrement"
                onClick = {props.sessionDecrementHandler}><i class="fas fa-angle-double-down"></i></button>
            <p id="session-length">{props.sessionLength}</p>
            <button 
                id = "session-increment"
                onClick={props.sessionIncrementHandler}><i class="fas fa-angle-double-up"></i></button>
        </div>
    )

}

function BreakControl(props){
    return(
        <div>
            <h2 id = "break-label">Break length</h2>
            <button 
                id = "break-decrement"
                onClick = {props.breakDecrementHandler}><i class="fas fa-angle-double-down"></i></button>
            <p id = "break-length">{props.breakLength}</p>
            <button 
                id = "break-increment"
                onClick = {props.breakIncrementHandler}><i class="fas fa-angle-double-up"></i></button>
        </div>
    )
}

class Timer extends React.Component{
    timeToString(time){
        if (time < 10){
            return "0".concat(time.toString());
        } else {
            return time.toString();
        }
    }
    componentDidUpdate(){
        if(this.props.minutes === 0 && this.props.seconds === 0){
            document.getElementById('beep').play();
        }
    }


    render(){
        return (
            <div>
                <h2 id = "timer-label">{this.props.phase}</h2>
                <p id="time-left">{this.timeToString(this.props.minutes)}:{this.timeToString(this.props.seconds)}</p>
                <audio id = "beep" src = "https://goo.gl/65cBl1"></audio>
            </div>
        
        )
    }
}

function Controls(props){
    return (
        <div>
            <button 
                id = "start_stop"
                onClick= {props.startStopHandler}><i class="far fa-play-circle"></i><i class="far fa-pause-circle"></i></button>
            <button 
                id = "reset" 
                onClick = {props.resetHandler}><i class="fas fa-exchange-alt"></i></button>
        </div>

    )
}

const Component = connect(mapStateToProps, mapDispatchToProps)(Clock);

ReactDOM.render(
    <Provider store={store}>
        <Component />
    </Provider>, 
    document.getElementById('root'));

