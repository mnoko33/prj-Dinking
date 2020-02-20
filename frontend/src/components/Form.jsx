import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <>
                <div className={`${this.props.className} label`}>{this.props.label}</div>
                <input
                    className={`${this.props.className} input`}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.handleChange}
                />
            </>

        )
    }
}

export default Form;