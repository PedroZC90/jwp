import React from "react";

export default class ModeController extends React.Component {

    // ventilate = () => {
    //     this.props.on_update("VENTILATE")
    // }

    // cool = () => {
    //     this.props.on_update("COOL")
    // }

    // warm = () => {
    //     this.props.on_update("WARM")
    // }

    action = (event) => {
        const value = event.target.id;
        this.props.on_update(value);
    }

    render = () => {
        return (
            <div>
                <button id="ventilar" onClick={this.action}>Ventilate</button>
                <button id="cool" onClick={this.action}>Cool</button>
                <button id="warm" onClick={this.action}>Warm</button>
            </div>
        );
    }

}
