import React, { Component } from 'react';

class EmailForm extends Component {
    render() {
        const email = this.props.email
        const handleEmailChange = this.props.handleEmailChange;
        return (
            <input
                className="form"
                type="text"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
            />
        )
    }
}

export default EmailForm;