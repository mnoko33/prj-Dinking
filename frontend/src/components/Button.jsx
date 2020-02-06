import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <button
                className={this.props.name}
                onClick={this.props.f}>
                {this.props.content}
            </button>
        )
    }
}

export default Button;