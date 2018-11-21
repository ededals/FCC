import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {createStore} from 'redux';

const sounds ={
    "Heater kit": [
        {
            name : "Heater-1",
            shortcut : "Q",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
            name: "Heater-2",
            shortcut: "W",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        {
            name: "Heater-3",
            shortcut: "E",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
            name: "Heater-4",
            shortcut: "A",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
            name: "Clap",
            shortcut: "S",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
            name: "Open-HH",
            shortcut: "D",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",

        },
        {
            name: "Kick-n'-Hat",
            shortcut: "Z",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
            name: "Kick",
            shortcut: "X",
            link: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
            name: "Closed-HH",
            shortcut: "C",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        },
    ],
    "Smooth piano kit": [
        {
            name: "Chord-1",
            shortcut: "Q",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
        },
        {
            name: "Chord-2",
            shortcut: "W",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
        },
        {
            name: "Chord-3",
            shortcut: "E",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
        },
        {
            name: "Shaker",
            shortcut: "A",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
        },
        {
            name: "Open-HH",
            shortcut: "S",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
        },
        {
            name: "Closed-HH",
            shortcut: "D",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
        },
        {
            name: "Punchy-Kick",
            shortcut: "Z",
            link: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
        },
        {
            name: "Side-Stick",
            shortcut: "X",
            link: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
        },
        {
            name: "Snare",
            shortcut: "C",
            link: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
        },
    ]
}

const MODE_NAMES = {
    true: "Heater kit",
    false: "Smooth piano kit"
}
/*Button coloring definitions*/
const PRESSED_COLOR = "#B4C889";
const RELEASED_COLOR = "#DBF4A7";
const ON_COLOR = "#D2F898";
const OFF_COLOR = "#CC5F5F";
/*Redux state definitions */
const STATE_CHANGE = "STATE_CHANGE";
const MODE_CHANGE = "MODE_CHANGE";
const VOLUME_CHANGE = "VOLUME_CHANGE";
const POWER_STATE_CHANGE = "POWER_STATE_CHANGE";
const defaultState = {
    mode: false,
    displayState: "Heater kit",
    volume: 50,
    power: false
}

const pushAction = (displayState) => {
    return{
        type: STATE_CHANGE,
        displayState
    }
}

const modeChange = (newMode) => {
    return {
        type: MODE_CHANGE,
        newMode
    }
}

const volumeChange = (newVolume) => {
    return {
        type: VOLUME_CHANGE,
        newVolume
    }
}

const powerStateChange = (newPowerState) => {
    return {
        type: POWER_STATE_CHANGE,
        newPowerState
    }
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case STATE_CHANGE:
            return Object.assign(
                {},
                state,
                {displayState: action.displayState}
            );
        case MODE_CHANGE:
            return Object.assign(
                {},
                state,
                {mode: action.newMode}
            )
        case VOLUME_CHANGE:
            return Object.assign(
                {},
                state,
                {volume: action.newVolume}
            )
        case POWER_STATE_CHANGE:
            return Object.assign(
                {},
                state,
                {power: action.newPowerState}
            )
        default:
            return state;
    }
}

const mapStateToProps = (state)=>{
    return {
        display: state.displayState,
        mode: state.mode,
        buttonSounds: sounds[MODE_NAMES[state.mode]],
        volume: state.volume,
        power: state.power
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onButtonPushed: (displayState) => dispatch(pushAction(displayState)),
        onModeChange: (newMode) => dispatch(modeChange(newMode)),
        onVolumeChange: (newVolume) => dispatch(volumeChange(newVolume)),
        onPowerStateChange: (newPowerState) => dispatch(powerStateChange(newPowerState))
    };
}

let store = createStore(reducer);


class App extends React.Component{
    constructor(props){
        super(props)
        this.clickHandler = this.clickHandler.bind(this);
        this.keyPressHandler = this.keyPressHandler.bind(this);
        this.machineModeHandler = this.machineModeHandler.bind(this);
        this.volumeHandler = this.volumeHandler.bind(this);
        this.powerSwitchHandler = this.powerSwitchHandler.bind(this);
        this.displayHandler = this.displayHandler.bind(this);
        this.keyReleaseHandler = this.keyReleaseHandler.bind(this);
        this.filterPressedButton = this.filterPressedButton.bind(this);

    }

    componentDidMount(){
        document.addEventListener('keydown', this.keyPressHandler );
        document.addEventListener('keyup', this.keyReleaseHandler );
        

    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.keyPressHandler);
        document.removeEventListener('keyup', this.keyReleaseHandler);

    }



    displayHandler(){
        if (this.props.power === true){
            return this.props.display;
        } else {
            return "";
        }
        
    }

    powerSwitchHandler(){
        this.props.onPowerStateChange(!this.props.power);
        if(!this.props.power === false){
            document.getElementsByClassName("mode-slider")[0].style = `background: ${OFF_COLOR}`;
        } else {
            document.getElementsByClassName("mode-slider")[0].style = `background: ${ON_COLOR}`;

        }
    }

    machineModeHandler(){
        console.log()
        if (this.props.power === true){
            this.props.onModeChange(!this.props.mode);
            this.props.onButtonPushed(MODE_NAMES[!this.props.mode]);
        }

    }

    volumeHandler(event){
        if(this.props.power === true){
            this.props.onButtonPushed(`Volume: ${event.target.value}`);
            this.props.onVolumeChange(event.target.value);
        }
        
    }

    clickHandler(event, shortcut){
        if(this.props.power === true){
            this.play(this.props.volume, shortcut);
            this.props.onButtonPushed(event.target.id);
        }

    }

    filterPressedButton(key){
        let filtered = this.props.buttonSounds.filter((obj)=>{
            let toLower = obj.shortcut;
            if (toLower === key){
                return true;
            }
            else{
                return false;
            }
        });
        return filtered[0];
    }

    keyPressHandler(event){
        if(this.props.power === true){

            let pressedButton = this.filterPressedButton(event.key);
            if (pressedButton !== undefined){
                document.getElementById(pressedButton.name).style = `background:  ${PRESSED_COLOR}`;
                document.getElementById(pressedButton.name).click();
            }
        }
    }

    keyReleaseHandler(event){
        if (this.props.power === true){
            let pressedButton = this.filterPressedButton(event.key);
            if (pressedButton !== undefined){
                document.getElementById(pressedButton.name).style = `background: ${RELEASED_COLOR}`;
            }
            
        }
    }

    play(volume, id){
        let audio = document.getElementById(id);
        audio.volume = volume/100;
        audio.play();
    }
    render(){
        return(
            <div id = "drum-machine">
                <div id="pad">
                    
                    <DrumPad 
                        buttons = {this.props.buttonSounds} 
                        clickHandler={this.clickHandler}
                        mode = {this.props.mode}/>
                </div>
                <div id="controls">

                    <Display display={this.displayHandler}/>
                    <VolumeControl 
                        volumeHandler = {this.volumeHandler}
                        volume = {this.props.volume} />
                    <div id = "switches">
                        <PowerSwitch 
                            powerSwitchHandler = {this.powerSwitchHandler}
                            powerState = {this.props.power}/>

                        <ModeSwitch
                            currentMode = {this.props.mode} 
                            machineModeHandler = {this.machineModeHandler}/>
                        </div>
                    </div>
            </div>
        );
    };
};



class VolumeControl extends React.Component{
    render(){
        return (
            <div class="slider-control">
                <p>Volume</p>
                <input
                    id= "range-input" 
                    type="range" 
                    min = "1" 
                    max="100" 
                    value = {this.props.volume} 
                    onInput= {this.props.volumeHandler} />
            </div>
        );
    }
}


class PowerSwitch extends React.Component{
    render(){
        return (
            <div id="power-switch">
                <p>Power</p>
                <label class = "switch">
                    <input
                        class = "power-input"
                        type = "checkbox"
                        onChange = {this.props.powerSwitchHandler}
                        checked = {this.props.powerState} />
                    <span class = "slider round power-slider"></span>
                </label>
            </div>
        );

        
    }
}
class ModeSwitch extends React.Component{
    render(){
        return(
            <div id = "mode-switch">
                <p>Mode</p>
                <label  class = "switch">
                    <input 
                        type = "checkbox" 
                        onClick = {this.props.machineModeHandler}
                        checked = {this.props.currentMode}
                         />
                    <span class="slider round mode-slider"></span>
                </label>
            </div>
        );
    }
}

class Display extends React.Component{
    render(){
        console.log('Render display');
        return <h1 id = "display">{this.props.display()}</h1>
    }
}

class DrumPad extends React.Component{
    shouldComponentUpdate(nextProps){
        if (this.props.mode === nextProps.mode){
            return false;
        } else {
            return true;
        }
    }
    
    render(){
        console.log('Render drumpad');
        let buttons = this.props.buttons.map( (obj) =>{
            return(
                <div id={obj.name}
                     class="drum-pad"
                     onClick={(e)=>this.props.clickHandler(e, obj.shortcut)}>
                    {obj.shortcut}
                    <audio
                        class="clip" 
                        id = {obj.shortcut}
                        src={obj.link}/>
                </div>
            );
        });
        return(
            <div id = "button-wrapper">
                {buttons}
            </div>
        );
    }
}

const Component = connect(mapStateToProps, mapDispatchToProps)(App);




ReactDOM.render(
    <Provider store={store}>
        <Component />
    </Provider>,
     document.getElementById('root'));