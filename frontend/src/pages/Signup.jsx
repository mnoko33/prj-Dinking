import React, { Component } from 'react';
// import Checkbox from '../components/Checkbox';
// import Form from '../components/Form';
// import Button from '../components/Button';
import { checkDuplicate } from '../apis/AuthApis';
// import Msg from '../components/Msg';
import { axiosSignup } from '../apis/AuthApis';
import { connect } from 'react-redux';
import { login } from '../modules/auth';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// material UI component
import { Button, TextField, Grid, Checkbox, FormControlLabel } from '@material-ui/core';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailMsg: '',
            emailValidation: false,
            password1: '',
            password2: '',
            passwordMsg: '',
            passwordValidation: false,
            nickName: '',
            nickNameMsg: '',
            nickNameValidation: false,
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
                emailValidation: false,
                emailMsg: "올바른 이메일 형식이 아닙니다"
            })
        } else {
            const isDuplicated = await checkDuplicate("email", this.state.email);
            // const isDuplicated = true;
            if (isDuplicated) {
                this.setState({
                    ...this.state,
                    emailValidation: false,
                    emailMsg: "중복된 이메일입니다"
                })
            } else {
                this.setState({
                    ...this.state,
                    emailValidation: true,
                    emailMsg: "사용 가능한 이메일입니다"
                })
            }
        }
    }

    handlePassword1Change = async (e) => {
        await this.setState({
            ...this.state,
            password1: e.target.value
        })
        if (!this.passwordRegex(this.state.password1)) {
            await this.setState({
                ...this.state,
                passwordMsg: '비밀번호는 영문과 숫자로 구성된 8-16',
                passwordValidation: false,
            })
        } else {
            await this.setState({
                ...this.state,
                passwordMsg: ''
            })
        }
    }

    handlePassword2Change = async (e) => {
        await this.setState({
            password2: e.target.value
        })
        if ((this.state.password1.length <= this.state.password2.length)
            && (this.state.password1 !== this.state.password2)) {
            await this.setState({
                ...this.state,
                passwordMsg: "비밀번호가 일치하지 않습니다",
                passwordValidation: false,
            })
        } else {
            await this.setState({
                ...this.state,
                passwordValidation: true,
                passwordMsg: ''
            })
        }
    }

    handleNickChange = async (e) => {
        await this.setState({
            ...this.state,
            nickName: e.target.value
        })
        if (!this.state.nickName) {
            await this.setState({
                ...this.state,
                nickNameValidation: false,
                nickNameMsg: ''
            })
        }
        const isDuplicated = await checkDuplicate("nickName", this.state.nickName);
        // const isDuplicated = true;
        if (isDuplicated) {
            this.setState({
                ...this.state,
                nickNameValidation: false,
                nickNameMsg: "중복된 닉네임입니다"
            })
        } else {
            this.setState({
                ...this.state,
                nickNameValidation: true,
                nickNameMsg: ""
            })
        }
    }

    handleTosChange = async (e) => {
        await this.setState({
            ...this.state,
            TOS: !this.state.TOS
        })
        console.log(this.state.TOS)
    }

    goBack = () => {
        this.props.history.goBack();
    }

    requestSignup = async () => {
        console.log(this.state)
        // if (this.state.emailValidation
        //     && this.state.passwordValidation
        //     && this.state.nickNameValidation
        //     && this.state.TOS) {
        //     const user = await axiosSignup({
        //         email: this.state.email,
        //         password: this.state.password1,
        //         nickName: this.state.nickName
        //     })
        //     this.props.history.push('/login')
        //     return user
        // }
        // if (!this.state.emailValidation) {
        //     this.setState({ emailMsg: "이메일은 필수입니다" })
        // }
        // if (!this.state.passwordValidation) {
        //     this.setState({ passwordMsg: "비밀번호는 필수입니다" })
        // }
        // if (!this.state.nickNameValidation) {
        //     this.setState({ nickNameMsg: "닉네임은 필수입니다" })
        // }
        // alert('TOS!!!')
    }

    render() {
        return (
            <div className="signup">
                <Grid container direction="column" justify="center" alignItems="stretch">
                    <TextField
                        label="Email"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <TextField
                        label="Password"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        type="password"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.password1}
                        onChange={this.handlePassword1Change}
                    />
                    <TextField
                        label="Password Again"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        type="password"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.password2}
                        onChange={this.handlePassword2Change}
                    />
                    <TextField
                        label="Name"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.nickName}
                        onChange={this.handleNickChange}
                    />
                </Grid>
                <Grid>
                    <FormControlLabel
                        label={this.state.TOS ? "이제부터 아이디가 저장됩니다!" : "아이디를 저장할까요?"}
                        labelPlacement="end"
                        control={<Checkbox color="primary" onClick={this.handleTosChange} />}
                    />
                </Grid>
                <Grid container direction="row" justify="flex-end">
                    <Button variant="text" onClick={this.goBack} style={{ width: 150 }} >취소</Button>
                    <Button variant="contained" color="primary" onClick={this.requestSignup} style={{ width: 150 }} >회원가입</Button>
                </Grid>
            </div>)
    }
}

export default connect(
    null,
    dispatch => ({
        login: (user) => dispatch(login(user))
    })
)(Signup);