import React, { Component } from 'react';

class PasswordForm extends Component {
    render() {
        const password = this.props.password
        const handlePasswordChange = this.props.handlePasswordChange;
        return (
            <form>
                <input
                    className="form"
                    type="password" 
                    placeholder="password" 
                    value={password}
                    onChange={handlePasswordChange}
                />
            </form>
        )
    }
}

export default PasswordForm;