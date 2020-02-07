import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <button
                className={this.props.className}
                onClick={this.props.f}>
                {this.props.content}
            </button>
        )
    }
}

export default Button;