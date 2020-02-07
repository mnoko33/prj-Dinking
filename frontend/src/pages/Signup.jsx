import React, { Component } from 'react';
import Checkbox from '../components/Checkbox';
import Form from '../components/Form';
import Button from '../components/Button';
// import { checkDuplicate } from '../apis/AuthApis';
import Msg from '../components/Msg';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailMsg: '',
            password1: '',
            password2: '',
            passwordMsg: '',
            nickName: '',
            nickNameMsg: '',
            TOS: false,
        }
    }


    emailRegex = function (email) {
        const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return re.test(email)
    }

    passwordRegex = function (password) {
        const re = /^[a-zA-Z0-9]{8,16}$/;
        return re.test(password)
    }

    handleEmailChange = async (e) => {
        await this.setState({
            ...this.state,
            email: e.target.value
        })
        if (!this.emailRegex(this.state.email)) {
            await this.setState({
                ...this.state,
                emailMsg: "올바른 이메일 형식이 아닙니다"
            })
        } else {
            // const isDuplicated = await checkDuplicate("email", this.state.email);
            const isDuplicated = true;
            if (isDuplicated) {
                this.setState({
                    ...this.state,
                    emailMsg: "중복된 이메일입니다"
                })
            } else {
                this.setState({
                    ...this.state,
                    emailMsg: "success"
                })
            }
        }
    }

    handlePassword1Change = async (e) => {
        await this.setState({
            ...this.state,
            password1: e.target.value
        })
        if (!this.passwordRegex(this.state.password)) {
            await this.setState({
                ...this.state,
                passwordMsg: '비밀번호는 영문과 숫자로 구성된 8-16'
            })
        }
    }

    tmp = (e) => {
        console.log('e')
    }

    render() {
        return (
            <div className="signup">
                <Form
                    value={this.state.email}
                    type="text"
                    placeholder="email"
                    handleChange={this.handleEmailChange}
                />
                <Button
                    className="emailDuplicate"
                    content="이메일 중복확인"
                    f={this.tmp}
                />
                <Msg
                    className="emailMsg"
                    condition={!!this.state.emailMsg}
                    msg={this.state.emailMsg}
                />
                <br />
                <Form
                    value={this.state.password1}
                    type="password"
                    placeholder="password"
                    handleChange={this.handlePassword1Change}
                />

                <br />
                <Form
                    value={this.state.password2}
                    type="password"
                    placeholder="password"
                    handleChange={this.tmp}
                />
                <br />
                <Msg
                    className="passwordMsg"
                    condition={!!this.state.passwordMsg}
                    msg={this.state.passwordMsg}
                />
                <br />
                <Form
                    value={this.state.nickName}
                    type="text"
                    placeholder="nickname"
                    handleChange={this.tmp}
                />
                <Button
                    className="nickNameDuplicate"
                    content="닉네임 중복확인"
                    f={this.tmp}
                />
                <br />
                <Checkbox
                    className="TOS"
                    label="aa"
                    f={this.tmp}
                />
                <br />
                <Button
                    className="signupBtn"
                    content="회원가입"
                    f={this.tmp}
                />
                <br />
                <Button
                    className="cancelBtn"
                    content="취소"
                    f={this.tmp}
                />
            </div>)
    }
}

export default Signup;