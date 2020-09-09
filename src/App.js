import React from 'react';
import logo from './logo.svg';
import './App.css';

function TimeElement(props) {
    return(
        <div>
            <span> {props.hours} </span>:
            <span> {props.minutes} </span>:
            <span> {props.seconds} </span>
            <span> {props.AM_PM} </span>
        </div>
    );
}

function EditTimeElement(props) {
    return(
        <div>
            <span><input type="number" value={props.hours} /></span>:
            <span><input type="number" value= {props.minutes} /></span>:
            <span><input type="number" value= {props.seconds} /></span>
            <span> {props.AM_PM} </span>
        </div>
    );
}

function Clock(props){
    let h = props.hour;
    let m = props.minute;
    let s = props.second;
    let am_pm = "AM";
    if(h>=12){
        am_pm = "PM";
    }
    return (
        <TimeElement hours={h} minutes={m} seconds={s} AM_PM={am_pm}/>
    );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default Clock;
