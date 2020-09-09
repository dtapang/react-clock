import React from 'react';

export class Clock extends React.Component{

    constructor(props) {
        super(props);
        this.handleSaveTimeEnter = this.handleSaveTimeEnter.bind(this);
        this.handlePauseClick = this.handlePauseClick.bind(this);
        this.handleKeyPressed = this.handleKeyPressed.bind(this);

        let dt = new Date();
        let h = dt.getHours();
        let m = dt.getMinutes();
        let s = dt.getSeconds();

        this.state = {
            isPaused: false,
            hour: h,
            minute: m,
            second: s,
            AM_PM: (h>=12)?"PM":"AM"
        };
    }

    setSeconds = (secondsVal) =>{
        this.setState({
            second:parseInt(secondsVal)
        })
    }
    setMinutes = (minutesVal) =>{
        this.setState({
            minute:parseInt(minutesVal)
        })
    }
    setHours = (hoursVal) =>{
        this.setState({
            hour:parseInt(hoursVal)
        })
    }
    setM = (mValue) => {
        this.setState({
            AM_PM: mValue
        });
    }

    tickSecond = () =>{
        this.setState((state)=>({
            second: parseInt(state.second) + 1
        }));
    }
    tickMinute = () =>{
        this.setState((state)=>({
            minute: parseInt(state.minute) + 1
        }));
    }
    tickHour = () =>{
        this.setState((state)=>({
            hour: parseInt(state.hour) + 1
        }));
    }

    tick = () => {
        if(!this.state.isPaused){
            this.tickSecond();
            //clock logic at each second
            if(parseInt(this.state.second)>59){
                this.setSeconds(0);
                this.tickMinute();
            }
            if(parseInt(this.state.minute)>59){
                this.setMinutes(0);
                this.tickHour();
            }
            if(parseInt(this.state.hour)>23){
                this.setHours(0);
            }
            if(parseInt(this.state.hour)>=12){
                this.setM("PM");
            }else{
                this.setM("AM");
            }
        }
    }

    componentDidMount() {
        this.timerId = setInterval(this.tick,1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    handleSaveTimeEnter = () => {
        this.setState({
            isPaused: false
        });

    }

    handlePauseClick = () => {
        console.log("handlePauseClick");
        this.setState({
            isPaused: true
        });
    }

    handleKeyPressed = (event) =>{
        if(event.key === "Enter"){
            let valInput = parseInt(event.target.value);
            switch (event.target.id) {
                case 'h':
                    this.setHours(valInput);
                    break;
                case 'm':
                    this.setMinutes(valInput);
                    break;
                case 's':
                    this.setSeconds(valInput);
                    break;
                default:
                    break;

            }

            this.setState({
                isPaused: false
            });
        }
    }

    TimeElement = (props) => {
        return(
            <div className="App timer">
                <p>
                <span onClick={this.handlePauseClick}> {props.hour} </span>:
                <span onClick={this.handlePauseClick}> {props.minute} </span>:
                <span onClick={this.handlePauseClick}> {props.second} </span>
                <span onClick={this.handlePauseClick}> {props.AM_PM} </span>
                </p>
            </div>
        );
    }

    EditTimeElement(props) {
        return(
            <div className="App timer">
                <p>
                <span><input type="number" id="h" onKeyPress={this.handleKeyPressed} defaultValue={props.hour} /></span>:
                <span><input type="number" id="m" onKeyPress={this.handleKeyPressed} defaultValue= {props.minute} /></span>:
                <span><input type="number" id="s" onKeyPress={this.handleKeyPressed} defaultValue= {props.second} /></span>
                <span> {props.AM_PM} </span>
                </p>
            </div>
        );
    }

    render() {
        if(this.state.isPaused){
            return this.EditTimeElement(this.state);
        }else{
            return this.TimeElement(this.state);
        }
    }
}
export default Clock
