import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {connect} from 'react-redux'

const GENERATE = "GENERATE";
//Creating action if new Id generated
const changeItem = (quoteItem, styleItem) =>{
    return{
        type: GENERATE,
        quoteItem,
        styleItem
    }
}

const defaultState = {
    quotes: [
        {text: "Imagination is more important than knowledge.",
        author: "Albert Einstein"},
        {text:"It does not matter how slowly you go as long as you do not stop.",
        author:"Confucius"},
        {text: "All our dreams can come true, if we have the courage to pursue them.",
        author: "Walt Disney"},
        {text: "I never dreamed about success, I worked for it.",
        author: "Estée Lauder"},
        {text: "Difficulties in your life do not come to destroy you but to help you realise your hidden potential and power. Let difficulties know that you too are difficult.",
        author: "Avul Pacir Zainulabidin Abdul Kalam"},
        {text: "There is nothing more powerful in the world than the idea that came in time.",
        author: "Victor Hugo"},
        {text: "When we close ourselves off, we're not just closing ourselves off to other people, we're closing ourselves off from ourselves and impeding ourselves. When you open up, you allow yourself to be who you are.",
        author: "Amy Cuddy"},
        {text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle"},
        {text: "Never bend your head. Always hold it high. Look the world straight in the eye.",
        author: "Helen Keller"},
        {text: "Begin to be now what you will be hereafter.",
        author: "William james"},
        {text: "Setting goals is the first step in turning the invisible into the visible.",
        author: "Tony Robbins"},
        {text: "You can’t give up! When you give up, you're like everybody else!",
        author: "Chris Evert"}
    ],
    styles:[
        "#D68FD6",
        "#0FF4C6",
        "#CEEC97",
        "#F4B393",
        "#00A8E8",
        "#9DC5BB"
    ],
    quoteItem :0,
    styleItem :0

}
/*React reducer is seting state to next style and quote array index*/
const itemReducer = (state = defaultState, action) => {
    switch (action.type){
        case GENERATE:
            return {
                quotes: state.quotes,
                styles: state.styles,
                quoteItem: action.quoteItem,
                styleItem: action.styleItem
            };
        default:
            return state
    }
}
/*creating react store to hold the state*/
const store = createStore(itemReducer);

/*Creating props that will be passed to react components*/
const mapStateToProps = (state) =>{
    return{
        currentQuote: state.quotes[state.quoteItem],
        currentStyle: state.styles[state.styleItem],
        quoteLength: state.quotes.length,
        styleLength: state.styles.length,
        qItem: state.quoteItem,
        sItem: state.styleItem
    }
};
/*Mapping dispatth. This way the react app will be able to call action creator function*/
const mapDispatchToProps = (dispatch) =>{
    return{
        getNewItem: (quoteItem, styleItem)=>{
            dispatch(changeItem(quoteItem, styleItem))
        }
    }
};



/*Machine is responsible for distributing the props as required to rest of components*/


class Machine extends React.Component {
    constructor(props){
        super(props);
        this.generateNewId = this.generateNewId.bind(this);
    }
    /*New array index generation, to pass the next items from Redux part*/
    generateNewId(){
        let maxQuote = this.props.quoteLength;
        let maxStyle = this.props.styleLength;
        let min = 0;
        let quoteItem;
        let styleItem;
        do {
            quoteItem = Math.floor(Math.random() * (maxQuote - min) + min);
        } while (quoteItem == this.props.qItem);
        do{
            styleItem = Math.floor(Math.random() * (maxStyle - min) + min);
        } while(styleItem == this.props.sItem)
        this.props.getNewItem(quoteItem, styleItem);
    }
    render() { 
        return (
            <div id = "machine" style={{background: this.props.currentStyle}}>
                <QuoteBox generator = {this.generateNewId}
                          currentQuote={this.props.currentQuote}
                          currentStyle = {this.props.currentStyle}/>
                <footer>ededals</footer>
            </div>
      );
    }
}

/*Quote box is abstracting quote generation field*/
class QuoteBox extends React.Component{
    constructor(props){
        super (props);
    }

    componentDidMount(){
        const height = document.getElementById("quote-box").clientHeight;
        document.getElementById("quote-box").style.height = height;

    }

    render(){
        
        return(
            <div id = "quote-box" style={{background: "white"}}>
                <Text quoteText={this.props.currentQuote.text}
                      style = {this.props.currentStyle} />
                <Author quoteAuthor={this.props.currentQuote.author}
                        style ={this.props.currentStyle}/>
                <Buttons currentStyle = {this.props.currentStyle}
                         generator = {this.props.generator}
                         text = {this.props.currentQuote}/>
                        


            </div>
        );
    }
}


/*Butto "New quote "and twitter button implementation */
function Buttons(props){
    
    
    let jsx = <div id="buttons">  
                <a  id = "tweet-quote" 
                    href = {"https://twitter.com/intent/tweet?hashtags=quote&text="
                            .concat(props.text.text)
                            .concat(" ")
                            .concat(props.text.author)} 
                    target="_blank"
                    role ="button"
                    class="btn btn-primary"
                    style={{background: props.currentStyle,
                        borderColor: props.currentStyle}}>
                    <i class="fab fa-twitter"></i>
                </a>

                <button id = "new-quote" 
                        class="btn btn-primary" 
                        onClick = {props.generator}
                        style={{background: props.currentStyle}} >New Quote</button>
                </div>
    return jsx;
    
}

/*Text field implementation*/

function Text(props){
    return <p id = "text" style={{color: props.style}}><i id="quotes" class="fas fa-quote-right"></i>{props.quoteText}</p>
}

/*Author field implementation*/
function Author(props){
    return <p id = "author" style ={{color: props.style}}>-{props.quoteAuthor}</p>
}

/*Connecting Machine element to Redux*/
const Container = connect(mapStateToProps, mapDispatchToProps)(Machine);

/*Providing Machine class with Redux store*/
class AppWrapper extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));