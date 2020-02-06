import React, { Component } from 'react';
import EmailForm from '../components/EmailForm';
import PasswordForm from '../components/PasswordForm';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Error from '../components/Error';
import { login } from '../apis/AuthApis';


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
        const res = await login({
            email: this.state.email,
            password: this.state.password,
        });
        if (!res) {
            this.setState({
                ...this.state,
                isLoginFailed: true
            })
        }
    }

    render() {
        return (<div className="login">
            <div className="logo">
                <img src="https://cdn.pixabay.com/photo/2014/04/03/00/36/fist-308801_960_720.png" alt="logo" />
            </div>
            <h1 className="loginTitle">알고리즘 뿌시기</h1>
            <EmailForm
                email={this.email}
                handleEmailChange={this.handleEmailChange}
            />
            <PasswordForm
                password={this.password}
                handlePasswordChange={this.handlePasswordChange}
            />
            <Error
                className="loginError"
                isLoginFailed={this.state.isLoginFailed}
                msg="아이디 또는 비밀번호가 일치하지 않습니다"
            />
            <Checkbox
                className="isAutoSave"
                f={this.handleCheckChange}
                label={this.state.isAutoSave ? "이제 자동으로 로그인할 수 있어요!" : "아이디를 기억할까요?"}
            />
            <Button
                name="loginBtn"
                f={this.requestLogin}
                content="로그인"
            />
            <div className="link">
                {/* TODO: react router 로 변경 */}
                <div>
                    <a href="/password">비밀번호 찾기</a>
                </div>
                <div>
                    <a href="/signup">회원가입</a>
                </div>


            </div>
        </div>)
    }
}

export default Login;