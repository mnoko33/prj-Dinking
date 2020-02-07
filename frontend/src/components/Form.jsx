import React, { Component } from 'react';

class Form extends Component {
    render() {
        const type = this.props.type;
        const placeholder = this.props.placeholder;
        const value = this.props.value;
        const handleChange = this.props.handleChange;
        return (
            <input
                className="form"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        )
    }
}

export default Form;