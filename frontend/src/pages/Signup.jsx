import React, { Component } from 'react';
import '../sass/pages/Signup.scss'

// auth utils
import { axiosSignup, emailCheck, passwordCheck, nickNameCheck } from '../utils/AuthApis';

// redux
import { connect } from 'react-redux';
import { login } from '../modules/auth';

import Form from '../components/Form';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailValidation: false,
            password1: '',
            password2: '',
            passwordValidation: false,
            nickName: '',
            nickNameValidation: false,
            TOS: false,
        }
    }

    handleEmailChange = async (e) => {
        await this.setState({ email: e.target.value })
        const emailValidation = await emailCheck("email", this.state.email);
        this.setState({ emailValidation })
    }

    handlePassword1Change = async (e) => {
        await this.setState({ password1: e.target.value })
        const passwordValidation = await passwordCheck(this.state.password1, this.state.password2)
        this.setState({ passwordValidation })
    }

    handlePassword2Change = async (e) => {
        await this.setState({ password2: e.target.value })
        const passwordValidation = await passwordCheck(this.state.password1, this.state.password2)
        this.setState({ passwordValidation })
    }

    handleNickChange = async (e) => {
        await this.setState({ nickName: e.target.value })
        const nickNameValidation = await nickNameCheck("nickName", this.state.nickName);
        this.setState({ nickNameValidation });
    }

    handleTosChange = (e) => {
        this.setState({ TOS: !this.state.TOS })
    }

    requestSignup = async () => {
        const res = await axiosSignup(this.state);
        if (res) {
            this.props.history.push('/Login')
        } else {
            alert('회원가입실패')
        }
    }

    render() {
        return (
            <div className="signup container">
                <Form  // email form
                    label="Email"
                    className="emailForm"
                    value={this.state.email}
                    type="text"
                    handleChange={this.handleEmailChange}
                />
                <Form  // password1 form
                    label="Password"
                    className="passwordForm"
                    value={this.state.password1}
                    type="password"
                    handleChange={this.handlePassword1Change}
                />
                <Form  // password2 form
                    label="Password Again"
                    className="passwordForm"
                    value={this.state.password2}
                    type="password"
                    handleChange={this.handlePassword2Change}
                />
                <Form  // nickName form
                    label="Name"
                    className="nickNameForm"
                    value={this.state.nickName}
                    type="text"
                    handleChange={this.handleNickChange}
                />
                <Checkbox
                    className="CheckBox"
                    label="알뿌 서비스 약관에 동의"
                    handleChange={this.handleTosChange}
                />
                <Button  // OK button 
                    className="signupBtn"
                    f={this.requestSignup}
                    content="회원가입"
                />
            </div>)
    }
}

export default connect(
    null,
    dispatch => ({
        login: (user) => dispatch(login(user))
    })
)(Signup);