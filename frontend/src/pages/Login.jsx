import React, { Component } from 'react';
// import EmailForm from '../components/EmailForm';
// import PasswordForm from '../components/PasswordForm';
import Form from '../components/Form';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Msg from '../components/Msg';
import { axiosLogin } from '../apis/AuthApis';
import { connect } from 'react-redux';
import { login } from '../modules/auth';
import { Link } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAutoSave: false,
            isLoginFailed: false
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            ...this.state,
            email: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            ...this.state,
            password: e.target.value
        })
    }

    handleCheckChange = () => {
        this.setState({
            ...this.state,
            isAutoSave: !this.state.isAutoSave
        })
    }

    requestLogin = async () => {
        const user = await axiosLogin({
            email: this.state.email,
            password: this.state.password,
        });
        if (!user) {
            this.setState({
                ...this.state,
                isLoginFailed: true
            })
        } else {
            this.props.login(user)
            // router 이동!
        }
    }

    render() {
        return (
            <div className="login">
                <div className="logo">
                    <img src="https://cdn.pixabay.com/photo/2014/04/03/00/36/fist-308801_960_720.png" alt="logo" />
                </div>
                <h1 className="loginTitle">알고리즘 뿌시기</h1>
                <Form  // email form
                    value={this.state.email}
                    type="text"
                    placeholder="email"
                    handleChange={this.handleEmailChange}
                />
                <Form  // password form
                    value={this.password}
                    type="password"
                    placeholder="password"
                    handleChange={this.state.handlePasswordChange}
                />
                <Msg
                    className="loginError"
                    condition={this.state.isLoginFailed}
                    msg="아이디 또는 비밀번호가 일치하지 않습니다"
                />
                <Checkbox
                    className="isAutoSave"
                    f={this.handleCheckChange}
                    label={this.state.isAutoSave ? "이제 자동으로 로그인할 수 있어요!" : "아이디를 기억할까요?"}
                />
                <Button
                    className="loginBtn"
                    f={this.requestLogin}
                    content="로그인"
                />
                <div className="link">
                    <div>
                        <Link to='/password'>비밀번호 찾기</Link>
                    </div>
                    <div>
                        <Link to='/signup'>회원가입</Link>
                    </div>
                </div>
            </div>)
    }
}

export default connect(
    null,
    dispatch => ({
        login: (user) => dispatch(login(user))
    })
)(Login);