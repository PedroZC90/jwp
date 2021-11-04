import React from "react";
import ModeController from "./mode-controller";
import SpeedController from "./speed-controller";

export default class AirConditioner extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            speed: 1,               // 1, 2 or 3
            mode: "cool"            // ventilar, refrigerar or aquecer
        };
    }

    componentDidMount = () => {
        setInterval(() => {
            const temperature = this.updateTemperature(this.state);
            this.props.on_update(temperature);
        }, 1000);
    }

    updateTemperature = (state) => {
        if (state.mode === "cool") {
            return this.cooling(state);
        } else if (state.mode === "warm") {
            return this.warming(state);
        }
        return this.ventilate(state);
    }

    cooling = (state) => {
        return -(state.speed * 0.1);
    }

    warming = (state) => {
        return (state.speed * 0.1);
    }

    ventilate = (state) => {
        return -(state.speed * 0.01);
    }
    
    onUpdateMode = (value) => {
        this.setState({ mode: value });
    }

    onUpdateSpeed = (value) => {
        this.setState({ speed: value });
    }

    render = () => {
        return (
            <div>
                <h2>Air Conditioner</h2>
                <h3>MODE: {this.state.mode}</h3>
                <h3>SPEED: {this.state.speed}</h3>
                <ModeController on_update={this.onUpdateMode}></ModeController>
                <SpeedController on_update={this.onUpdateSpeed} value={this.state.speed}></SpeedController>
            </div>
        );
    }

}
