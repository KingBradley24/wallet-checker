import './App.css';
import { useState } from 'react';

function App() {
  const [failureShown, setFailureShown] = useState(false);
  const [incorrectShown, setIncorrectShown] = useState(false);
  const [inputValue, setInputValue] = useState("")
  const [footerNoteStart, setFooterNoteStart] = useState("Consider donating to ")
  const footerNoteAddress = useState("kingbradley.eth")
  const [footerNoteEnd, setFooterNoteEnd] = useState(" if you think this has saved your skin!")

  const handleChange = event => {
    setInputValue(event.target.value);
  }

  const handleSubmit = event => {
    var re = new RegExp("^0x[a-zA-Z0-9]{40}$");
    if (re.test(inputValue)) {
      setFailureShown(true);
      setFooterNoteStart("Yes, I really did spend over 10 hours doing this for a gag. Please consider donating to ")
      setFooterNoteEnd(" because I'm going to get fired now.")
      setIncorrectShown(false);
    }
    else {
      setIncorrectShown(true);
      setFooterNoteStart("Consider donating to ");
      setFooterNoteEnd(" if you think this has saved your skin!");
      setFailureShown(false);
    }
    event.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        Wallet Checker
      </header>
      <div className="App-body">
        Check if your private key has been hacked
        <form className="App-form" onSubmit={handleSubmit}>
          <input className="App-input" type="text" value={inputValue} onChange={handleChange} placeholder="0x.." />
          <input className= "App-button" type="submit" value="Check" />
        </form>
        {incorrectShown && <Incorrect />}
        {failureShown && <Oof />}
      </div>
      <footer className="App-footer">
        {footerNoteStart}
        <u>{footerNoteAddress}</u>
        {footerNoteEnd}
      </footer>
    </div>
  );
}

function Oof() {
  return (
    <div>
      <img src={require('./images/failfish.png')} alt="Facepalm" />
      <div>
        The fact that you think it works this way is cause for concern...
      </div>
    </div>
  )
}

function Incorrect() {
  return (
    <div>
      Enter wallet address in the correct format (no ENS)
    </div>
  )
}

export default App;