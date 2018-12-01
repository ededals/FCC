import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import marked from 'marked';

/*app*/


class App extends React.Component{
    constructor(props){
        super(props);
        this.handleInput=this.handleInput.bind(this);
    }

    handleInput(event){
        this.props.onInput(event.target.value);
    }
    render(){
        return(
            <div id="markup-editor">
                <Editor inputValue={this.props.inputValue}
                        handleInput = {this.handleInput}/>
                <Previewer inputValue={this.props.inputValue}/>
            </div>
        );
    }
}

class Editor extends React.Component{
    render(){
        return (
            <div id="editor-container">
                <p id = "editor-header">Editor</p>
                <textarea
                    id="editor"
                    value={this.props.inputValue} 
                    onChange={this.props.handleInput} >
                </textarea>

            </div>
        );
    }
}

class Previewer extends React.Component{
    render(){
        var renderer = new marked.Renderer();
        renderer.link= function(href, title, text){
            return `
                <a title="${title}" href="${href}" target="_blank">${text}</a>
            `
        }
        marked.setOptions({
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
        var markedInput = marked(this.props.inputValue, {sanitize: true});
        let obj = {
            __html: markedInput
        };
        return(
            <div id = "preview-container">
                <p id = "preview-header">Previewer</p>
                <div id ="preview" dangerouslySetInnerHTML={obj} ></div>
            </div>
        );
    }
}


/*State management */

const INPUT = 'INPUT';
const defaultState = {
    input: "# Welcome to my React Markdown Previewer!\n "
            .concat("## This is a\\r sub-heading...\n")
            .concat("### And here's some other cool stuff:\n")
            .concat("Heres some code, `<div></div>`, between 2 backticks.\n\n")
            .concat("```\n")
            .concat("//this is multi-line code:\n\n")
            .concat("function anotherExample(firstLine, lastLine) {\n")
            .concat("\tif (firstLine == '```' && lastLine == '```') {\n")
            .concat("\t\treturn multiLineCode;\n\t}\n}\n```\n\n")
            .concat("You can also make text **bold**... whoa!\n")
            .concat("Or _italic_.\n")
            .concat("Or... wait for it... **_both!_**\n")
            .concat("And feel free to go crazy ~~crossing stuff out~~.\n\n")
            .concat("There's also [links](https://www.freecodecamp.com), and\n")
            .concat("> Block Quotes!\n\n")
            .concat("And if you want to get really crazy, even tables:\n\n")
            .concat("Wild Header | Crazy Header | Another Header?\n")
            .concat("------------ | ------------- | ------------- \n")
            .concat("Your content can | be here, and it | can be here....\n")
            .concat("And here. | Okay. | I think we get it.\n\n")
            .concat("- And of course there are lists.\n")
            .concat("  - Some are bulleted.\n")
            .concat("     - With different indentation levels.\n")
            .concat("        - That look like this.\n\n\n")
            .concat("1. And there are numbererd lists too.\n")
            .concat("1. Use just 1s if you want! \n")
            .concat("1. But the list goes on...\n")
            .concat("- Even if you use dashes or asterisks.\n")
            .concat("* And last but not least, let's not forget embedded images:\n\n")
            .concat("![React Logo w/ Text](https://goo.gl/Umyytc)\n")
};

const changeInput = (userInput) =>{

     
    return {
        type: INPUT,
        userInput,
    };
}

const inputReducer = (state = defaultState, action) => {
    switch(action.type){
        case INPUT:
            return Object.assign(
                {},
                state,
                {input: action.userInput}
            );
        default:
            return state;     
    };
}

const mapStateToProps = (state)=>{
    return {
        inputValue: state.input
    };
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onInput: userInput => dispatch(changeInput(userInput)) 
    };
}

const Component = connect(mapStateToProps, mapDispatchToProps)(App)

const store = createStore(inputReducer);

/*conncetion*/
const rootElement = document.getElementById("root");


ReactDOM.render(
    <Provider store={store}>
        <Component />
    </Provider>,
    rootElement);

