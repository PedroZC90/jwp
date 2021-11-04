import React from "react";

export default class SpeedController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    action = (event) => {
        const value = parseInt(event.target.value) || 1;
        this.setState({ value });
        this.props.on_update(value);
    }

    increase = () => {
        const value = this.state.value + 1;
        if (value < 1 || value > 3) return;
        this.setState({ value });
        this.props.on_update(value);
    }

    decrease = () => {
        const value = this.state.value - 1;
        if (value < 1 || value > 3) return;
        this.setState({ value });
        this.props.on_update(value);

    }

    render = () => {
        return (
            <div>
                <input id="speed-input" name="speed-input" type="number" max="3" min="0" onChange={this.action} value={this.props.value}></input>
                <button id="speed-increment" onClick={this.increase}>+</button>
                <button id="speed-decrement" onClick={this.decrease}>-</button>
            </div>
        );
    }

}
