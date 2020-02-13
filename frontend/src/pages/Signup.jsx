import React, { Component } from 'react';

// auth utils
import { axiosSignup, emailCheck, passwordCheck, nickNameCheck } from '../utils/AuthApis';

// redux
import { connect } from 'react-redux';
import { login } from '../modules/auth';

// material UI component
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Checkbox, FormControlLabel } from '@material-ui/core';

const styles = theme => ({
    signupBtn: {
        marginTop: theme.spacing(3)
    },
    TOS: {
        fontSize: 3
    }
})

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
        this.setState({passwordValidation})
    }

    handlePassword2Change = async (e) => {
        await this.setState({ password2: e.target.value })
        const passwordValidation = await passwordCheck(this.state.password1, this.state.password2)
        this.setState({passwordValidation})
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
        const {classes} = this.props;
        return (
            <div className="signup">
                <Grid container direction="column" justify="center" alignItems="stretch">
                    <TextField
                        label="Email"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <TextField
                        label="Password"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        type="password"
                        InputLabelProps={{ shrink: true }}
                        value={this.state.password1}
                        onChange={this.handlePassword1Change}
                    />
                    <TextField
                        label="Password Again"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        type="password"
                        InputLabelProps={{ shrink: true }}
                        value={this.state.password2}
                        onChange={this.handlePassword2Change}
                    />
                    <TextField
                        label="Name"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={this.state.nickName}
                        onChange={this.handleNickChange}
                    />
                </Grid>
                <Grid>
                    <FormControlLabel 
                        label="알뿌 서비스 약관에 동의"
                        labelPlacement="end"
                        control={<Checkbox color="primary" onClick={this.handleTosChange} />}
                    />
                </Grid>
                <Grid container direction="column" alignItems="stretch">
                    <Button 
                        className={classes.signupBtn} 
                        variant="contained" 
                        color="primary" 
                        onClick={this.requestSignup}>
                        회원가입
                    </Button>
                </Grid>
            </div>)
    }
}

export default connect(
    null,
    dispatch => ({
        login: (user) => dispatch(login(user))
    })
)(withStyles(styles)(Signup));