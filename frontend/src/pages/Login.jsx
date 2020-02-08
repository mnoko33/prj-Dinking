import React, { Component } from 'react';
import EmailForm from '../components/EmailForm';
import PasswordForm from '../components/PasswordForm';
import {login} from '../apis/AuthApis';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    requestLogin = async () => {
        login({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (<div className="login">
            <h1 className="loginTitle">알고리즘 뿌시기</h1>
            <EmailForm 
                email={this.email} 
                handleEmailChange={this.handleEmailChange} 
            />
            <br/>
            <PasswordForm 
                password={this.password} 
                handlePasswordChange={this.handlePasswordChange} 
            />
            <br/>
            <br/>
            <button
                className="loginBtn"
                onClick={(e) => this.requestLogin(e)}>
                로그인
            </button>
        </div>)
    }
}

export default Login;