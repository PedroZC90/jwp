import React from "react";
import AirConditioner from "./air-conditioner";

export default class ArCondicionado extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            temperature: 25
        };
    }

    onUpdateTemperature = (value) => {
        const temperature = parseFloat((this.state.temperature + value).toFixed(2));
        console.log(temperature, parseFloat(temperature.toFixed(2)))
        this.setState({ temperature });
    }

    render = () => {
        return (
            <div style={{"border": "1px solic #red"}}>
                <h1 style={{"fontSize": "72px"}}>{this.state.temperature}</h1>
                <AirConditioner on_update={this.onUpdateTemperature}></AirConditioner>
            </div>
        );
    }

}
