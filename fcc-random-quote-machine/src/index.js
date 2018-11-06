import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Machine extends React.Component {
    render() {
      return (
        <div id = "machine">
            <QuoteBox />
        </div>
      );
    }
}

class QuoteBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
            item: 0
        }
    }
    generateNewId(){

    }
    render(){
        return(
            <div id = "quote-box">
                <Text quoteText={this.state.quotes[this.state.item].text} />
                <p id = "author">this is author</p>
                <button id = "new-quote">New Quote</button>
                <p><a id = "tweet-quote" href = "https://twitter.com/intent/tweet" target="_blank">tw</a></p>


            </div>
        );
    }
}

function Text(props){
    return <p id = "text">{props.quoteText}</p>
}
ReactDOM.render(<Machine />, document.getElementById('root'));