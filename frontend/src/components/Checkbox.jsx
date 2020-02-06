import React, { Component } from 'react';

class Checkbox extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <input type="checkbox" onChange={this.props.f} />
                <label>{this.props.label}</label>
            </div>
        )
    }
}

export default Checkbox;